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

  async createPayment(createPaymentDto: CreatePaymentDto, userUuid?: string) {
    // 1. Verify campaign exists
    const campaign = await this.campaignService.findByUuid(createPaymentDto.campaignUuid);
    if (!campaign) {
      throw this.responseService.notFound({ message: 'campaign.errors.campaign_not_found' });
    }

    // 2. Create pending payment record in DB
    const payment = this.paymentRepository.create({
      campaignUuid: campaign.uuid,
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency || 'USD',
      provider: createPaymentDto.provider,
      status: PaymentStatusEnum.PENDING,
      userUuid: userUuid,
    });

    const savedPayment = await this.paymentRepository.save(payment);
    savedPayment.campaign = campaign; // attach campaign for the provider

    // 3. Resolve provider and create checkout session
    const provider = this.paymentFactory.getProvider(createPaymentDto.provider);
    
    try {
      const sessionResult = await provider.createCheckoutSession(savedPayment);
      
      // Save provider-specific merchant reference if provided
      if (sessionResult.merchantRefNumber) {
        savedPayment.merchantRefNumber = sessionResult.merchantRefNumber;
        await this.paymentRepository.save(savedPayment);
      }
      
      return sessionResult;
    } catch (error: any) {
      this.logger.error(`Failed to create checkout session: ${error.message}`);
      savedPayment.status = PaymentStatusEnum.FAILED;
      await this.paymentRepository.save(savedPayment);
      throw this.responseService.badRequest({ message: 'payment.errors.session_creation_failed' });
    }
  }

  async handleWebhook(providerName: string, headers: Record<string, string | string[] | undefined>, payload: Buffer | string) {
    const provider = this.paymentFactory.getProvider(providerName);
    const verification = await provider.verifyWebhook(headers, payload);

    if (!verification.isValid) {
      this.logger.error(`Invalid webhook signature for provider: ${providerName}`);
      throw this.responseService.badRequest({ message: 'payment.errors.invalid_signature' });
    }

    if (!verification.providerPaymentId && !verification.paymentUuid) {
      return { received: true, ignored: true };
    }

    const paymentUuid = verification.paymentUuid;

    if (!paymentUuid) {
      this.logger.error(`Could not find paymentUuid in webhook payload for provider ${providerName}`);
      throw this.responseService.badRequest({ message: 'payment.errors.payment_uuid_missing' });
    }

    // Execute everything in a transaction to ensure atomicity
    return await this.dataSource.transaction(async (manager) => {
      const payment = await manager.findOne(Payment, {
        where: { uuid: paymentUuid },
        lock: { mode: 'pessimistic_write' }, // Lock the payment record to avoid races
      });

      if (!payment) {
        this.logger.error(`Payment not found: ${paymentUuid}`);
        throw this.responseService.notFound({ message: 'payment.errors.payment_not_found' });
      }

      if (payment.status !== PaymentStatusEnum.PENDING) {
        this.logger.log(`Payment ${paymentUuid} already processed with status ${payment.status}`);
        return { received: true, idempotencyHit: true };
      }

      // Update payment status
      payment.status = verification.status === 'SUCCEEDED' ? PaymentStatusEnum.SUCCEEDED : PaymentStatusEnum.FAILED;
      payment.providerPaymentId = verification.providerPaymentId;
      await manager.save(payment);

      if (payment.status === PaymentStatusEnum.SUCCEEDED) {
        // Atomic update of the campaign amount
        await manager.increment(
          Campaign,
          { uuid: payment.campaignUuid },
          'current_amount',
          payment.amount,
        );

        if (provider.handleSuccess) {
          await provider.handleSuccess(payment, verification.eventPayload);
        }
      } else if (payment.status === PaymentStatusEnum.FAILED) {
        if (provider.handleFailure) {
          await provider.handleFailure(payment, verification.eventPayload);
        }
      }

      return { received: true };
    });
  }

  async findOne(uuid: string) {
    const payment = await this.paymentRepository.findOne({
      where: { uuid },
      relations: ['campaign'],
    });
    if (!payment) {
      throw this.responseService.notFound({ message: 'payment.errors.payment_not_found' });
    }
    return payment;
  }
}
