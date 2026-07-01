import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaymentModel } from '../../DataBase/Payment/payment.model';
import { CreatePaymentDto } from './Dtos/create-payment.dto';
import { PaymentFactory } from './Providers/payment.factory';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { PaymentStatusEnum } from './Enums/payment-status.enum';
import { IPaymentProvider } from './Providers/payment-provider.interface';
import { UserService } from 'src/Modules/User/user.service';
import { PaymentTargetTypeEnum } from './Enums/payment-target-type.enum';
import { CampaignService } from '../Campaign/campaign.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(PaymentModel)
    private readonly paymentRepository: Repository<PaymentModel>,
    private readonly userService: UserService,
    private readonly paymentFactory: PaymentFactory,
    private readonly responseService: ResponseService,
    private readonly dataSource: DataSource,
    private readonly campaignService: CampaignService,
  ) {}

  // ─────────────────────────────────────────────────────────────────
  //  POST /payments/create
  // ─────────────────────────────────────────────────────────────────

  /**
   * Create a payment for any arbitrary target entity.
   * The caller is responsible for validating the target and attaching any
   * target-model context needed by the provider.
   *
   * @param dto Payment creation data (uuid, targetUuid, targetType, amount, provider)
   * @param userUuid UUID of the user making the payment
   * @param idempotencyKey Unique key for idempotent payment creation
   * @param targetModel Optional: The loaded target entity for provider context
   * @param requestIp Optional: client IP
   * @returns Checkout session result from provider
   */
  async createPayment(
    dto: CreatePaymentDto,
    userUuid: string,
    idempotencyKey: string,
    targetModel?: any,
    requestIp?: string,
  ) {
    // 1. Resolve provider first — fail fast before touching the DB
    const provider = this.resolveProvider(dto.provider);

    // 2. Determine target type from DTO
    const targetType = dto.targetType;

    // 2.5 Idempotency: if client provided an idempotency key, try to return
    // the existing payment instead of creating a duplicate.
    const existing = await this.paymentRepository.findOne({
      where: {
        idempotencyKey,
        targetUuid: dto.uuid,
        targetType,
        amount: dto.amount,
        provider: dto.provider,
      },
    });

    if (existing) {
      // Attach target model for provider usage if provided
      if (targetModel) (existing as any)[targetType] = targetModel;

      return {
        idempotencyHit: true,
        paymentUuid: existing.uuid,
        status: existing.status,
        provider: existing.provider,
        merchantRefNumber: existing.merchantRefNumber,
        orderId: existing.orderId,
        paymentKey: existing.paymentKey,
      };
    }

    // 3. Persist a PENDING payment record
    const user = await this.userService.findByUuid(userUuid);
    const payment = this.paymentRepository.create({
      targetType,
      targetUuid: dto.uuid,
      amount: dto.amount,
      currency: 'USD',
      provider: dto.provider,
      status: PaymentStatusEnum.PENDING,
      userUuid,
      user: user!,
      idempotencyKey,
    });

    const savedPayment = await this.paymentRepository.save(payment);
    // Attach target model for provider use if provided
    if (targetModel) (savedPayment as any)[targetType] = targetModel;

    // 4. Call the provider to create a checkout session
    try {
      const sessionResult = await provider.createCheckoutSession(savedPayment, requestIp);

      // Persist provider-specific fields returned from the session.
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
      this.logger.error(
        `Checkout session creation failed | paymentUuid=${savedPayment.uuid} | ${error.message}`,
      );
      savedPayment.status = PaymentStatusEnum.FAILED;
      await this.paymentRepository.save(savedPayment);
      this.responseService.badRequest({ message: 'payment.errors.session_creation_failed' });
    }
  }

  /**
   * Loads the target entity for the given target type and UUID, and validates
   * that the requested payment amount does not push the target past its limit.
   *
   * @param targetType The type of target entity (e.g. CAMPAIGN)
   * @param targetUuid The UUID of the target entity
   * @param amount The payment amount being attempted
   * @returns The loaded target entity
   */
  async loadTargetModel(
    targetType: PaymentTargetTypeEnum,
    targetUuid: string,
    amount: number,
  ) {
    switch (targetType) {
      case PaymentTargetTypeEnum.CAMPAIGN:
        const campaign = await this.campaignService.findByUuid(targetUuid);
        if (!campaign) {
          this.responseService.notFound({
            message: 'campaign.errors.campaign_not_found',
          });
        }
        // Reject if the campaign is already fully funded
        const current = Number(campaign!.current_amount);
        const target = Number(campaign!.target_amount);
        if (current >= target) {
          this.responseService.badRequest({
            message: 'payment.errors.campaign_target_reached',
          });
        }
        // Reject if this payment would push the campaign past its target
        if (current + amount > target) {
          this.responseService.badRequest({
            message: 'payment.errors.campaign_would_exceed_target',
          });
        }
        return campaign;
      default:
        this.responseService.badRequest({
          message: 'payment.errors.invalid_target_type',
        });
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

    // ── Atomic transaction: update payment status ───────────────────
    return await this.dataSource.transaction(async (manager) => {
      const payment = await manager.findOne(PaymentModel, {
        where: { uuid: paymentUuid },
        lock: { mode: 'pessimistic_write' },
      });

      if (!payment) {
        this.logger.error(`Payment not found | uuid=${paymentUuid}`);
        this.responseService.notFound({ message: 'payment.errors.payment_not_found' });
      }

      // ── Idempotency guard ──────────────────────────────────────────
      if (payment!.status !== PaymentStatusEnum.PENDING) {
        this.logger.log(
          `Webhook ignored (idempotency) | uuid=${paymentUuid} | status=${payment!.status}`,
        );
        return { received: true, idempotencyHit: true };
      }

      // ── Update status ──────────────────────────────────────────────
      payment!.status =
        verification.status === 'SUCCEEDED'
          ? PaymentStatusEnum.SUCCEEDED
          : PaymentStatusEnum.FAILED;
      payment!.providerPaymentId = verification.providerPaymentId;
      await manager.save(payment);

      // ── Update target entity when payment succeeds ─────────────────
      if (payment!.status === PaymentStatusEnum.SUCCEEDED) {
        await this.updateTargetOnSuccess(payment!);
      }

      // Delegate to provider hooks for custom success/failure logic
      if (payment!.status === PaymentStatusEnum.SUCCEEDED) {
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

  async findOne(uuid: string): Promise<PaymentModel> {
    const payment = await this.paymentRepository.findOne({ where: { uuid } });
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

  /**
   * Updates the target entity when a payment succeeds.
   * Currently supports CAMPAIGN targets — increments campaign.current_amount.
   *
   * NOTE: This method runs INSIDE the pessimistic_write transaction of
   * handleWebhook, ensuring the target update is atomic with the payment
   * status change. However, it calls campaignService which uses its own
   * repository instance (not the transactional manager). This is intentional
   * because campaignService.incrementRaisedAmount uses TypeORM's
   * Repository.increment(), which issues an atomic UPDATE ... SET
   * current_amount = current_amount + :amount query, making it safe even
   * outside of the transaction.
   */
  private async updateTargetOnSuccess(payment: PaymentModel): Promise<void> {
    switch (payment.targetType) {
      case PaymentTargetTypeEnum.CAMPAIGN:
        if (!payment.targetUuid) {
          this.logger.error(
            `Payment succeeded but targetUuid is null | paymentUuid=${payment.uuid}`,
          );
          return;
        }
        this.logger.log(
          `Updating campaign raised amount | campaignUuid=${payment.targetUuid} | amount=${payment.amount}`,
        );
        await this.campaignService.incrementRaisedAmount(payment.targetUuid, payment.amount);
        break;
      default:
        this.logger.warn(
          `Unhandled targetType in updateTargetOnSuccess | targetType=${payment.targetType} | paymentUuid=${payment.uuid}`,
        );
    }
  }
}