import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from './payment-provider.interface';
import { StripeProvider } from './Stripe/stripe.provider';
import { FawryProvider } from './Fawry/fawry.provider';
import { PaymobProvider } from './Paymob/paymob.provider';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly stripeProvider: StripeProvider,
    private readonly fawryProvider: FawryProvider,
    private readonly paymobProvider: PaymobProvider,
  ) {}

  /**
   * Returns the provider instance for the given name.
   * Throws a plain Error (not a NestJS exception) so the calling service can
   * catch it and respond via ResponseService with a localised message.
   */
  getProvider(providerName: string | PaymentProviderEnum): IPaymentProvider {
    const normalizedName = providerName.toUpperCase();
    switch (normalizedName) {
      case PaymentProviderEnum.STRIPE:
        return this.stripeProvider;
      case PaymentProviderEnum.PAYMOB:
        return this.paymobProvider;
      case PaymentProviderEnum.FAWRY:
        return this.fawryProvider;
      default:
        throw new Error(`UNSUPPORTED_PROVIDER:${providerName}`);
    }
  }
}
