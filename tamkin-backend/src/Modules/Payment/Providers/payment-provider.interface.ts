import { PaymentModel } from '../../../DataBase/Payment/payment.model';

export interface CheckoutSessionResult {
  merchantRefNumber: string;   // provider's session/transaction ID
  paymentKey:        string;   // URL or token frontend needs
  orderId?:          string;   // optional, used by Paymob
  paymobOrderId?:    string;   // optional, Paymob-specific
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
  createCheckoutSession(payment: PaymentModel, requestIp?: string): Promise<CheckoutSessionResult>;

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
  handleSuccess?(payment: PaymentModel, eventPayload: any): Promise<void>;
  handleFailure?(payment: PaymentModel, eventPayload: any): Promise<void>;
}
