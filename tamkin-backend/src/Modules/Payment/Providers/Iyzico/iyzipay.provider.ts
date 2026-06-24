import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPaymentProvider } from '../payment-provider.interface';
import { PaymentModel } from 'src/DataBase/Payment/payment.model';
import Iyzipay = require('iyzipay');
import geoip from 'geoip-lite'; // npm install geoip-lite
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json'; // npm install i18n-iso-countries

@Injectable()
export class IyzicoProvider implements IPaymentProvider {
  private readonly logger = new Logger(IyzicoProvider.name);
  private iyzipay: Iyzipay;
  private readonly callbackUrl: string;

  constructor(private readonly configService: ConfigService) {
    // 2. Switched to getOrThrow to guarantee strings and fail-fast if .env is missing
    this.iyzipay = new Iyzipay({
      apiKey: this.configService.getOrThrow<string>('IYZICO_API_KEY'),
      secretKey: this.configService.getOrThrow<string>('IYZICO_SECRET_KEY'),
      uri: this.configService.getOrThrow<string>('IYZICO_BASE_URL'),
    });

    this.callbackUrl = this.configService.getOrThrow<string>('IYZICO_CALLBACK_URL');
  }
  /**
   * Helper: Wrap iyzico's callback-based checkout form creation in a Promise
   */
  private initializeCheckoutForm(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay.checkoutFormInitialize.create(request, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  /**
   * Helper: Wrap iyzico's callback-based checkout retrieval in a Promise
   */
  private retrieveCheckoutForm(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay.checkoutForm.retrieve(request, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
private resolveLocation(requestIp: string) {
  const geo = geoip.lookup(requestIp); // null for localhost/private IPs, common in dev
  const countryName = geo?.country ? countries.getName(geo.country, 'en') : undefined;

  return {
    city: geo?.city || 'Istanbul',
    country: countryName || 'Turkey',
    raw: geo,
  };
}

private formatIyzicoDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' '); // "2026-06-21 08:22:24"
}

private buildIyzicoPaymentRequest(payment: PaymentModel, requestIp: string) {
  const location = this.resolveLocation(requestIp);

  const buyer = {
    id: payment.user.uuid,
    name: payment.user.firstName,
    surname: payment.user.lastName,
    email: payment.user.email,
    // TODO: UserModel has no phone field yet. gsmNumber is required by iyzico.
    // Either add phone collection to the donation flow, or confirm with iyzico
    // whether a clearly-marked placeholder is acceptable for guest donations.
    gsmNumber: '+900000000000',
    identityNumber: '11111111111', // TODO: confirm iyzico's stance for non-Turkish donors
    registrationDate: this.formatIyzicoDate(payment.user.createdAt),
    registrationAddress: `${location.city}, ${location.country}`,
    ip: requestIp,
    city: location.city,
    country: location.country,
  };

  const billingAddress = {
    contactName: `${payment.user.firstName} ${payment.user.lastName}`,
    address: `${location.city}, ${location.country}`,
    city: location.city,
    country: location.country,
  };

  return {
    locale: Iyzipay.LOCALE.EN,
    conversationId: payment.uuid,
    price: payment.amount.toString(),
    paidPrice: payment.amount.toString(),
    currency: payment.currency || Iyzipay.CURRENCY.TRY,
    basketId: payment.uuid,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: this.callbackUrl,
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer,
    billingAddress,
    basketItems: [
      {
        id: payment.uuid,
        name: payment.targetType,
        category1: 'General',
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: payment.amount.toString(),
      },
    ],
  };
}
  /**
   * Creates an iyzico checkout session URL
   */
  async createCheckoutSession(payment: PaymentModel, requestIp: string): Promise<any> {
    const request = this.buildIyzicoPaymentRequest(payment, requestIp);
    const result = await this.initializeCheckoutForm(request);
    if (result.status !== 'success') {
      this.logger.error('Iyzico Checkout Form failed:', result.errorMessage);
      throw new Error(`Iyzico initialization failed: ${result.errorMessage}`);
    }

    this.logger.log(`Initiated Iyzico session for paymentUuid: ${payment.uuid}`);

    return {
      checkoutUrl: result.paymentPageUrl, // Send user to Iyzico Hosted Page
      merchantRefNumber: payment.uuid,
      orderId: result.token,
    };
  }

  /**
   * Unlike traditional webhooks, Iyzico redirects the user via POST to your
   * callbackUrl with a 'token'. We use that token to ask Iyzico for the real status.
   */
  async verifyWebhook(
    headers: Record<string, string | string[] | undefined>,
    payload: any,
  ): Promise<{
    isValid: boolean;
    providerPaymentId?: string;
    paymentUuid?: string;
    status: 'SUCCEEDED' | 'FAILED';
    eventPayload: any;
  }> {
    try {
      let token: string | null = null;

      // 2. Your existing logic
      if (typeof payload === 'object' && payload?.token) {
        token = payload.token;
      } else if (Buffer.isBuffer(payload)) {
        const bodyString = payload.toString('utf8');
        token = new URLSearchParams(bodyString).get('token');
      } else if (typeof payload === 'string') {
        token = new URLSearchParams(payload).get('token');
      }

      // 3. This check now safely handles both null and empty string cases
      if (!token) {
        this.logger.error('No token found in Iyzico callback payload');
        return { isValid: false, status: 'FAILED', eventPayload: payload };
      }

      // Ask Iyzico to verify the token
      const request = {
        locale: Iyzipay.LOCALE.EN,
        token: token,
      };

      const result = await this.retrieveCheckoutForm(request);

      // Status 'success' means the API call worked.
      // paymentStatus 'SUCCESS' means the actual credit card charge cleared.
      const isPaid = result.status === 'success' && result.paymentStatus === 'SUCCESS';

      return {
        isValid: true, // The callback token was legitimate
        paymentUuid: result.basketId, // This is the UUID we passed during initialization
        providerPaymentId: result.paymentId, // Iyzico's internal tracking ID
        status: isPaid ? 'SUCCEEDED' : 'FAILED',
        eventPayload: result,
      };
    } catch (error: any) {
      this.logger.error('Error verifying Iyzico token', error.stack);
      return { isValid: false, status: 'FAILED', eventPayload: payload };
    }
  }
}
