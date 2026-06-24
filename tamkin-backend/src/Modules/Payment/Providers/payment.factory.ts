import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from './payment-provider.interface';
import { StripeProvider } from './Stripe/stripe.provider';
import { FawryProvider } from './Fawry/fawry.provider';
import { PaymobProvider } from './Paymob/paymob.provider';
import { IyzicoProvider } from './Iyzico/iyzipay.provider';
import { PaymentProviderEnum } from '../Enums/payment-provider.enum';

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly stripeProvider: StripeProvider,
    private readonly fawryProvider: FawryProvider,
    private readonly paymobProvider: PaymobProvider,
    private readonly iyzicoProvider: IyzicoProvider,
  ) {}

  /**
   * Returns the provider instance for the given name.
   * Throws a plain Error (not a NestJS exception) so the calling service can
   * catch it and respond via ResponseService with a localised message.
   */
  getProvider(providerName: string | PaymentProviderEnum): IPaymentProvider {
    const normalizedName = providerName.toUpperCase();
    switch (normalizedName) {
      // case PaymentProviderEnum.STRIPE:
      //   return this.stripeProvider as unknown as IPaymentProvider;
      // case PaymentProviderEnum.PAYMOB:
      //   return this.paymobProvider as unknown as IPaymentProvider;
      // case PaymentProviderEnum.FAWRY:
      //   return this.fawryProvider as unknown as IPaymentProvider;
      case PaymentProviderEnum.IYZICO:
        return this.iyzicoProvider as unknown as IPaymentProvider;
      default:
        throw new Error(`UNSUPPORTED_PROVIDER:${providerName}`);
    }
  }
}
