import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentProvider } from './payment-provider.interface';
import { StripeProvider } from './Stripe/stripe.provider';
import { FawryProvider } from './Fawry/fawry.provider';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly stripeProvider: StripeProvider,
    private readonly fawryProvider: FawryProvider,
  ) {}

  getProvider(providerName: string | PaymentProviderEnum): IPaymentProvider {
    const normalizedName = providerName.toUpperCase();
    switch (normalizedName) {
      case PaymentProviderEnum.STRIPE:
        return this.stripeProvider;
      case PaymentProviderEnum.PAYMOB:
        // return this.paymobProvider;
        throw new NotFoundException(`Provider ${providerName} is not implemented yet.`);
      case PaymentProviderEnum.FAWRY:
        return this.fawryProvider;
      default:
        throw new NotFoundException(`Provider ${providerName} not found`);
    }
  }
}
