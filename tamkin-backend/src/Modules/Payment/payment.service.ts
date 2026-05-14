import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Payment } from '../../DataBase/Payment/payment.model';
import { CreatePaymentDto } from './Dtos/create-payment.dto';
import { PaymentFactory } from './Providers/payment.factory';
import { CampaignService } from '../Campaign/campaign.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { PaymentStatusEnum } from './Enums/payment-status.enum';
import { Campaign } from '../../DataBase/Campaign/campaign.model';
import { IPaymentProvider } from './Providers/payment-provider.interface';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly paymentFactory: PaymentFactory,
    private readonly campaignService: CampaignService,
    private readonly responseService: ResponseService,
    private readonly dataSource: DataSource,
  ) {}

  // ─────────────────────────────────────────────────────────────────
  //  POST /payments/create
  // ─────────────────────────────────────────────────────────────────

  async createPayment(dto: CreatePaymentDto, userUuid?: string) {
    // 1. Resolve provider first — fail fast before touching the DB
    const provider = this.resolveProvider(dto.provider);

    // 2. Verify campaign exists
    const campaign = await this.campaignService.findByUuid(dto.campaignUuid);
    if (!campaign) {
      this.responseService.notFound({ message: 'campaign.errors.campaign_not_found' });
    }

    // 3. Persist a PENDING payment record
    const payment = this.paymentRepository.create({
      campaignUuid: campaign!.uuid,
      amount: dto.amount,
      currency: dto.currency || 'EGP',
      provider: dto.provider,
      status: PaymentStatusEnum.PENDING,
      userUuid,
    });

    const savedPayment = await this.paymentRepository.save(payment);
    savedPayment.campaign = campaign!; // attach for provider use (campaign title, etc.)

    // 4. Call the provider to create a checkout session
    try {
      const sessionResult = await provider.createCheckoutSession(savedPayment);

      // Persist provider-specific fields returned from the session.
      // Extra Paymob fields (paymobOrderId, paymentKey) are accessed defensively
      // so Stripe and Fawry are completely unaffected.
      const extra = sessionResult as any;
      let needsSave = false;

      if (sessionResult.merchantRefNumber) {
        savedPayment.merchantRefNumber = sessionResult.merchantRefNumber;
        needsSave = true;
      }
      if (extra.paymobOrderId) {
        savedPayment.orderId = extra.paymobOrderId;
        needsSave = true;
      }
      if (extra.paymentKey) {
        savedPayment.paymentKey = extra.paymentKey;
        needsSave = true;
      }

      if (needsSave) {
        await this.paymentRepository.save(savedPayment);
      }

      return sessionResult;
    } catch (error: any) {
      // Mark the record as failed so it can be retried or investigated
      this.logger.error(
        `Checkout session creation failed | paymentUuid=${savedPayment.uuid} | ${error.message}`,
      );
      savedPayment.status = PaymentStatusEnum.FAILED;
      await this.paymentRepository.save(savedPayment);
      this.responseService.badRequest({ message: 'payment.errors.session_creation_failed' });
    }
  }

  // ─────────────────────────────────────────────────────────────────
  //  POST /payments/webhook/:provider
  // ─────────────────────────────────────────────────────────────────

  async handleWebhook(
    providerName: string,
    headers: Record<string, string | string[] | undefined>,
    payload: Buffer | string | any,
  ) {
    const provider = this.resolveProvider(providerName);
    const verification = await provider.verifyWebhook(headers, payload);

    if (!verification.isValid) {
      this.logger.warn(`Invalid webhook signature | provider=${providerName}`);
      this.responseService.badRequest({ message: 'payment.errors.invalid_signature' });
    }

    // Ignore events that carry no actionable payment reference
    if (!verification.providerPaymentId && !verification.paymentUuid) {
      this.logger.log(`Webhook ignored (no payment reference) | provider=${providerName}`);
      return { received: true, ignored: true };
    }

    const paymentUuid = verification.paymentUuid;
    if (!paymentUuid) {
      this.logger.error(`paymentUuid missing in webhook | provider=${providerName}`);
      this.responseService.badRequest({ message: 'payment.errors.payment_uuid_missing' });
    }

    // ── Atomic transaction: update payment + increment campaign amount ─────────
    return await this.dataSource.transaction(async (manager) => {
      const payment = await manager.findOne(Payment, {
        where: { uuid: paymentUuid },
        lock: { mode: 'pessimistic_write' }, // prevent concurrent webhook race
      });

      if (!payment) {
        this.logger.error(`Payment not found | uuid=${paymentUuid}`);
        this.responseService.notFound({ message: 'payment.errors.payment_not_found' });
      }

      // ── Idempotency guard ──────────────────────────────────────────────────
      if (payment!.status !== PaymentStatusEnum.PENDING) {
        this.logger.log(
          `Webhook ignored (idempotency) | uuid=${paymentUuid} | status=${payment!.status}`,
        );
        return { received: true, idempotencyHit: true };
      }

      // ── Update status ──────────────────────────────────────────────────────
      payment!.status =
        verification.status === 'SUCCEEDED'
          ? PaymentStatusEnum.SUCCEEDED
          : PaymentStatusEnum.FAILED;
      payment!.providerPaymentId = verification.providerPaymentId;
      await manager.save(payment);

      if (payment!.status === PaymentStatusEnum.SUCCEEDED) {
        // Atomic campaign fundraising total increment
        await manager.increment(
          Campaign,
          { uuid: payment!.campaignUuid },
          'current_amount',
          payment!.amount,
        );

        if (provider.handleSuccess) {
          await provider.handleSuccess(payment!, verification.eventPayload);
        }
      } else if (payment!.status === PaymentStatusEnum.FAILED) {
        if (provider.handleFailure) {
          await provider.handleFailure(payment!, verification.eventPayload);
        }
      }

      return { received: true };
    });
  }

  // ─────────────────────────────────────────────────────────────────
  //  GET /payments/:id
  // ─────────────────────────────────────────────────────────────────

  async findOne(uuid: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { uuid },
      relations: ['campaign'],
    });
    if (!payment) {
      this.responseService.notFound({ message: 'payment.errors.payment_not_found' });
    }
    return payment!;
  }

  // ─────────────────────────────────────────────────────────────────
  //  PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────────

  /**
   * Resolves a provider from the factory and converts any unsupported-provider
   * error into a translated 404 response via ResponseService.
   */
  private resolveProvider(providerName: string): IPaymentProvider {
    try {
      return this.paymentFactory.getProvider(providerName);
    } catch {
      this.responseService.notFound({ message: 'payment.errors.provider_not_found' });
      // ResponseService.notFound() always throws; this line is unreachable
      // but TypeScript needs it to satisfy the return type.
      throw new Error('unreachable');
    }
  }
}
