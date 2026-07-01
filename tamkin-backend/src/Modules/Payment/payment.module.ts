import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentFactory } from './Providers/payment.factory';
import { StripeProvider } from './Providers/Stripe/stripe.provider';
import { FawryProvider } from './Providers/Fawry/fawry.provider';
import { PaymobProvider } from './Providers/Paymob/paymob.provider';
import { IyzicoProvider } from './Providers/Iyzico/iyzipay.provider';
import { PaymentModel } from 'src/DataBase/Payment/payment.model';
import { CommonModule } from 'src/Common/common.module';
import { CampaignModule } from 'src/Modules/Campaign/campaign.module';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentModel]),
    CommonModule, // For ResponseService
    CampaignModule,
    UserModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentFactory,
    StripeProvider,
    FawryProvider,
    PaymobProvider,
    IyzicoProvider,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}