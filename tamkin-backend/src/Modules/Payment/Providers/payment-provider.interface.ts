import { Payment } from '../../../DataBase/Payment/payment.model';

export interface CheckoutSessionResult {
  sessionId: string;
  checkoutUrl: string;
  merchantRefNumber?: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  eventPayload?: any;
  providerPaymentId?: string;
  paymentUuid?: string;
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
    headers: Record<string, string | string[] | undefined>,
    payload: any,
  ): Promise<WebhookVerificationResult>;

  /**
   * Optional hooks for provider-specific success/failure logic
   */
  handleSuccess?(payment: Payment, eventPayload: any): Promise<void>;
  handleFailure?(payment: Payment, eventPayload: any): Promise<void>;
}
