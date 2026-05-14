import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './Providers/payment.factory';
import { StripeProvider } from './Providers/Stripe/stripe.provider';
import { FawryProvider } from './Providers/Fawry/fawry.provider';
import { Payment } from 'src/DataBase/Payment/payment.model';
import { CampaignModule } from '../Campaign/campaign.module';
import { CommonModule } from 'src/Common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    CampaignModule,
    CommonModule, // For ResponseService
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentFactory,
    StripeProvider,
    FawryProvider,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
