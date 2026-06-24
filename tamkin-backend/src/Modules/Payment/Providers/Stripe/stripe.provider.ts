import { Injectable, Logger } from '@nestjs/common';
import {
  IPaymentProvider,
  CheckoutSessionResult,
  WebhookVerificationResult,
} from '../payment-provider.interface';
import { PaymentModel } from '../../../../DataBase/Payment/payment.model';
// Using dynamic import or try/catch for stripe to ensure the app doesn't crash if SDK is missing
let Stripe: any;
try {
  Stripe = require('stripe').default || require('stripe');
} catch (e) {
  // Stripe not installed
}

@Injectable()
export class StripeProvider implements IPaymentProvider {
  private readonly logger = new Logger(StripeProvider.name);
  private stripe: any;
  private readonly isMockMode: boolean;

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (apiKey && Stripe) {
      this.stripe = new Stripe(apiKey);
      this.isMockMode = false;
      this.logger.log('StripeProvider initialized in LIVE mode');
    } else {
      this.isMockMode = true;
      this.logger.warn(
        'Stripe secret key or stripe SDK is missing. StripeProvider initialized in MOCK mode.',
      );
    }
  }

  async createCheckoutSession(payment: PaymentModel): Promise<CheckoutSessionResult> {
    // Mock mode — same field names as real mode
    if (this.isMockMode) {
      const sessionId = `mock_session_${Date.now()}_${payment.uuid}`;
      return {
        merchantRefNumber: sessionId,
        paymentKey: `https://mock-stripe-checkout.com/pay/${sessionId}`,
      };
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: payment.currency.toLowerCase(),
              product_data: {
                name: this.resolveProductName(payment),
              },
              unit_amount: Math.round(payment.amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        client_reference_id: payment.uuid,
        metadata: {
          paymentUuid: payment.uuid,
          targetUuid: payment.targetUuid, // ✅ correct field name
          targetType: payment.targetType, // ✅ correct field name
          userUuid: payment.userUuid ?? 'anonymous',
        },
      });

      // ✅ Now matches exactly what createPayment() service checks for
      return {
        merchantRefNumber: session.id, // cs_test_abc... → saved to DB
        paymentKey: session.url, // https://checkout.stripe.com/... → returned to frontend
      };
    } catch (error) {
      this.logger.error('Failed to create Stripe checkout session', error);
      throw new Error('Payment provider session creation failed');
    }
  }

  private resolveProductName(payment: PaymentModel): string {
    // Use the attached target model if available, fall back to targetType
    const target = (payment as any)[payment.targetType];
    return target?.title?.en ?? `Donation (${payment.targetType})`;
  }

  async verifyWebhook(
    headers: Record<string, string | string[] | undefined>,
    payload: Buffer | string,
  ): Promise<WebhookVerificationResult> {
    const signature = headers['stripe-signature'] as string;
    if (this.isMockMode) {
      // For mock mode, parse the payload directly assuming it's JSON
      try {
        const data =
          typeof payload === 'string' ? JSON.parse(payload) : JSON.parse(payload.toString());
        return {
          isValid: true,
          eventPayload: data,
          providerPaymentId: data.id || `mock_pi_${Date.now()}`,
          paymentUuid: data.metadata?.paymentUuid || data.client_reference_id,
          status: data.type === 'checkout.session.completed' ? 'SUCCEEDED' : 'FAILED',
        };
      } catch (err) {
        return { isValid: false };
      }
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      this.logger.error('STRIPE_WEBHOOK_SECRET is not configured');
      return { isValid: false };
    }

    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);

      let status: 'SUCCEEDED' | 'FAILED' | undefined;
      let providerPaymentId: string | undefined;
      let paymentUuid: string | undefined;

      switch (event.type) {
        case 'checkout.session.completed':
          status = 'SUCCEEDED';
          providerPaymentId = event.data.object.payment_intent;
          paymentUuid =
            event.data.object.metadata?.paymentUuid || event.data.object.client_reference_id;
          break;
        case 'checkout.session.expired':
        case 'checkout.session.async_payment_failed':
          status = 'FAILED';
          providerPaymentId = event.data.object.payment_intent;
          paymentUuid =
            event.data.object.metadata?.paymentUuid || event.data.object.client_reference_id;
          break;
        default:
          // We only care about specific events
          break;
      }

      return {
        isValid: true,
        eventPayload: event,
        providerPaymentId,
        paymentUuid,
        status,
      };
    } catch (err: any) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      return { isValid: false };
    }
  }
}
