import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  IPaymentProvider,
  CheckoutSessionResult,
  WebhookVerificationResult,
} from '../payment-provider.interface';
import { PaymentModel } from '../../../../DataBase/Payment/payment.model';

@Injectable()
export class FawryProvider implements IPaymentProvider {
  private readonly logger = new Logger(FawryProvider.name);
  private readonly isMockMode: boolean;
  private readonly merchantCode: string | undefined;
  private readonly secureKey: string | undefined;

  constructor() {
    this.merchantCode = process.env.FAWRY_MERCHANT_CODE;
    this.secureKey = process.env.FAWRY_SECRET;

    if (this.merchantCode && this.secureKey) {
      this.isMockMode = false;
      this.logger.log('FawryProvider initialized in LIVE mode');
    } else {
      this.isMockMode = true;
      this.logger.warn(
        'FAWRY_MERCHANT_CODE or FAWRY_SECRET is missing. FawryProvider initialized in MOCK mode.',
      );
    }
  }
  createCheckoutSession(payment: PaymentModel): Promise<CheckoutSessionResult> {
    throw new Error('Method not implemented.');
  }

  // async createCheckoutSession(payment: PaymentModel): Promise<CheckoutSessionResult> {
  //   // Generate a unique merchant reference.
  //   // Use underscores to easily split the UUID back out later, since UUIDs contain hyphens.
  //   const merchantRefNumber = `FAW_${payment.uuid}_${Date.now()}`;

  //   if (this.isMockMode) {
  //     return {
  //       sessionId: `mock_fawry_session_${Date.now()}`,
  //       checkoutUrl: `https://mock-fawry-checkout.com/pay/${merchantRefNumber}`,
  //       merchantRefNumber,
  //     };
  //   }

  //   try {
  //     // Real Fawry Implementation logic placeholder
  //     const fawryUrl =
  //       process.env.FAWRY_URL || 'https://atfawry.com/fawrypay-api/api/payments/init';

  //     const signaturePayload = `${this.merchantCode}${merchantRefNumber}${payment.userUuid || 'guest'}${fawryUrl}${this.secureKey}`;
  //     const signature = crypto.createHash('sha256').update(signaturePayload).digest('hex');

  //     const checkoutUrl = `${fawryUrl}?merchantCode=${this.merchantCode}&merchantRefNum=${merchantRefNumber}&signature=${signature}`;

  //     return {
  //       sessionId: merchantRefNumber,
  //       checkoutUrl,
  //       merchantRefNumber,
  //     };
  //   } catch (error) {
  //     this.logger.error('Failed to create Fawry checkout session', error);
  //     throw new Error('Payment provider session creation failed');
  //   }
  // }

  async verifyWebhook(
    headers: Record<string, string | string[] | undefined>,
    payload: any,
  ): Promise<WebhookVerificationResult> {
    try {
      // Payload can be raw Buffer or parsed JSON depending on the body parser.
      const data =
        typeof payload === 'string' || Buffer.isBuffer(payload)
          ? JSON.parse(payload.toString())
          : payload;

      if (this.isMockMode) {
        // For mock mode, try to extract UUID
        let mockUuid: string | undefined = undefined;
        if (data.merchantRefNumber && typeof data.merchantRefNumber === 'string') {
          const parts = data.merchantRefNumber.split('_');
          if (parts.length >= 2 && parts[0] === 'FAW') {
            mockUuid = parts[1];
          } else {
            mockUuid = data.merchantRefNumber; // fallback
          }
        }

        return {
          isValid: true,
          eventPayload: data,
          providerPaymentId: data.fawryRefNumber || `mock_fawry_ref_${Date.now()}`,
          paymentUuid: mockUuid,
          status: data.orderStatus === 'PAID' ? 'SUCCEEDED' : 'FAILED',
        };
      }

      const {
        fawryRefNumber,
        merchantRefNumber,
        paymentAmount,
        orderAmount,
        orderStatus,
        paymentMethod,
        paymentRefrenceNumber,
        messageSignature,
      } = data;

      if (!fawryRefNumber || !merchantRefNumber || !orderStatus || !messageSignature) {
        this.logger.warn('Fawry webhook missing required signature fields');
        return { isValid: false };
      }

      // Standard Fawry hash generation approximation
      const amountStr = (paymentAmount || orderAmount || 0).toFixed(2);
      const hashString = `${fawryRefNumber}${merchantRefNumber}${amountStr}${orderStatus}${paymentMethod || ''}${paymentRefrenceNumber || ''}${this.secureKey}`;

      const expectedSignature = crypto.createHash('sha256').update(hashString).digest('hex');

      if (expectedSignature.toLowerCase() !== messageSignature.toLowerCase()) {
        this.logger.error('Fawry webhook signature mismatch');
        return { isValid: false };
      }

      // Extract original UUID from merchantRefNumber
      let paymentUuid = merchantRefNumber;
      if (typeof merchantRefNumber === 'string') {
        const parts = merchantRefNumber.split('_');
        if (parts.length >= 2 && parts[0] === 'FAW') {
          paymentUuid = parts[1];
        }
      }

      return {
        isValid: true,
        eventPayload: data,
        providerPaymentId: fawryRefNumber,
        paymentUuid: paymentUuid,
        status: orderStatus === 'PAID' ? 'SUCCEEDED' : 'FAILED',
      };
    } catch (err: any) {
      this.logger.error(`Fawry webhook processing failed: ${err.message}`);
      return { isValid: false };
    }
  }
}
