import { Payment } from '../../../DataBase/Payment/payment.model';

export interface CheckoutSessionResult {
  sessionId: string;
  checkoutUrl: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  eventPayload?: any;
  providerPaymentId?: string;
  status?: 'SUCCEEDED' | 'FAILED';
}

export interface IPaymentProvider {
  /**
   * Creates a checkout session with the payment provider
   */
  createCheckoutSession(payment: Payment): Promise<CheckoutSessionResult>;

  /**
   * Verifies the webhook signature and extracts event data
   */
  verifyWebhook(
    signature: string,
    payload: Buffer | string,
  ): Promise<WebhookVerificationResult>;

  /**
   * Optional hooks for provider-specific success/failure logic
   */
  handleSuccess?(payment: Payment, eventPayload: any): Promise<void>;
  handleFailure?(payment: Payment, eventPayload: any): Promise<void>;
}
