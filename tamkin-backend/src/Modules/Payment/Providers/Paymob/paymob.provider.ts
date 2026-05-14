import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';
import {
  IPaymentProvider,
  CheckoutSessionResult,
  WebhookVerificationResult,
} from '../payment-provider.interface';
import { Payment } from '../../../../DataBase/Payment/payment.model';

/**
 * Paymob Payment Provider
 *
 * Implements the full 4-step Paymob flow:
 *   Step 1 – Authentication   → obtain auth token
 *   Step 2 – Create Order     → register order with Paymob
 *   Step 3 – Payment Key      → generate a single-use payment token
 *   Step 4 – Payment Link     → construct iframe / redirect URL
 *
 * MOCK MODE is activated automatically when any of the required env vars are
 * absent:  PAYMOB_API_KEY | PAYMOB_INTEGRATION_ID | PAYMOB_IFRAME_ID
 *
 * In mock mode the provider:
 *   - Skips all HTTP calls to Paymob
 *   - Returns deterministic, locally-generated values
 *   - Still stores providerPaymentId, orderId, paymentKey in the DB
 *   - Accepts fake webhook payloads for success/failure testing
 */

const PAYMOB_BASE_URL = 'https://accept.paymob.com/api';

@Injectable()
export class PaymobProvider implements IPaymentProvider {
  private readonly logger = new Logger(PaymobProvider.name);

  /** Whether this instance is running without real Paymob credentials. */
  readonly isMockMode: boolean;

  private readonly apiKey: string | undefined;
  private readonly integrationId: string | undefined;
  private readonly iframeId: string | undefined;
  /** Optional HMAC secret used for webhook signature verification. */
  private readonly hmacSecret: string | undefined;

  constructor() {
    this.apiKey = process.env.PAYMOB_API_KEY;
    this.integrationId = process.env.PAYMOB_INTEGRATION_ID;
    this.iframeId = process.env.PAYMOB_IFRAME_ID;
    this.hmacSecret = process.env.PAYMOB_HMAC_SECRET;

    const hasAllCredentials = !!(
      this.apiKey &&
      this.integrationId &&
      this.iframeId
    );

    this.isMockMode = !hasAllCredentials;

    if (this.isMockMode) {
      this.logger.warn(
        'PAYMOB_API_KEY, PAYMOB_INTEGRATION_ID, or PAYMOB_IFRAME_ID is missing. ' +
          'PaymobProvider initialized in MOCK mode.',
      );
    } else {
      this.logger.log('PaymobProvider initialized in LIVE mode.');
    }
  }

  // ─────────────────────────────────────────────────────────────────
  //  PUBLIC INTERFACE — createCheckoutSession
  // ─────────────────────────────────────────────────────────────────

  async createCheckoutSession(payment: Payment): Promise<CheckoutSessionResult> {
    // Paymob requires amounts in the smallest currency unit (piasters for EGP).
    // We store amounts in the major unit (e.g. 50.00 EGP) → multiply by 100.
    const amountCents = Math.round(payment.amount * 100);
    const currency = payment.currency?.toUpperCase() || 'EGP';

    // Merchant reference: unique per donation, embeds the payment UUID so we
    // can recover it during webhook processing without a DB lookup by orderId.
    const merchantRefNumber = `PMB_${payment.uuid}_${Date.now()}`;

    if (this.isMockMode) {
      return this.buildMockCheckoutSession(payment, merchantRefNumber, amountCents, currency);
    }

    try {
      // ── Step 1: Authenticate ──────────────────────────────────────
      const authToken = await this.authenticate();

      // ── Step 2: Create Order ──────────────────────────────────────
      const paymobOrderId = await this.createOrder(
        authToken,
        amountCents,
        currency,
        merchantRefNumber,
        payment,
      );

      // ── Step 3: Generate Payment Key ──────────────────────────────
      const paymentKey = await this.generatePaymentKey(
        authToken,
        paymobOrderId,
        amountCents,
        currency,
        payment,
      );

      // ── Step 4: Build Iframe / Redirect URL ───────────────────────
      const checkoutUrl = this.buildPaymentUrl(paymentKey);

      this.logger.log(
        `Paymob checkout session created | paymentUuid=${payment.uuid} | orderId=${paymobOrderId}`,
      );

      return {
        // Use the Paymob order ID as the canonical "session / provider reference"
        sessionId: String(paymobOrderId),
        checkoutUrl,
        merchantRefNumber,
        // Extra Paymob-specific data stored on the entity (see payment.model.ts)
        paymobOrderId: String(paymobOrderId),
        paymentKey,
      } as CheckoutSessionResult & { paymobOrderId: string; paymentKey: string };
    } catch (error: any) {
      this.logger.error(`Paymob checkout session failed: ${error.message}`, error.stack);
      throw new Error('Payment provider session creation failed');
    }
  }

  // ─────────────────────────────────────────────────────────────────
  //  PUBLIC INTERFACE — verifyWebhook
  // ─────────────────────────────────────────────────────────────────

  async verifyWebhook(
    headers: Record<string, string | string[] | undefined>,
    payload: any,
  ): Promise<WebhookVerificationResult> {
    try {
      // Normalise the body — it can arrive as raw Buffer, JSON string or parsed object.
      const data: Record<string, any> =
        typeof payload === 'string' || Buffer.isBuffer(payload)
          ? JSON.parse(payload.toString())
          : payload;

      // ── MOCK MODE ────────────────────────────────────────────────
      if (this.isMockMode) {
        return this.handleMockWebhook(data);
      }

      // ── LIVE MODE – Signature Verification ───────────────────────
      if (this.hmacSecret) {
        const isValidSig = this.verifyHmacSignature(data, headers);
        if (!isValidSig) {
          this.logger.error('Paymob HMAC signature verification failed');
          return { isValid: false };
        }
      } else {
        // If no HMAC secret is configured, log a warning but continue.
        // Teams should set PAYMOB_HMAC_SECRET in production.
        this.logger.warn(
          'PAYMOB_HMAC_SECRET is not set. Skipping webhook signature verification. ' +
            'Set this env var in production!',
        );
      }

      return this.extractWebhookResult(data);
    } catch (err: any) {
      this.logger.error(`Paymob webhook processing failed: ${err.message}`, err.stack);
      return { isValid: false };
    }
  }

  // ─────────────────────────────────────────────────────────────────
  //  PUBLIC INTERFACE — optional hooks
  // ─────────────────────────────────────────────────────────────────

  async handleSuccess(payment: Payment, eventPayload: any): Promise<void> {
    this.logger.log(
      `Paymob payment SUCCEEDED | paymentUuid=${payment.uuid} | ` +
        `providerPaymentId=${payment.providerPaymentId} | ` +
        `orderId=${eventPayload?.obj?.order?.id ?? 'N/A'}`,
    );
    // Extend here: send confirmation email, fire domain events, etc.
  }

  async handleFailure(payment: Payment, eventPayload: any): Promise<void> {
    this.logger.warn(
      `Paymob payment FAILED | paymentUuid=${payment.uuid} | ` +
        `reason=${eventPayload?.obj?.data?.message ?? 'N/A'}`,
    );
    // Extend here: notify user, log analytics, etc.
  }

  // ─────────────────────────────────────────────────────────────────
  //  PRIVATE – Paymob API Steps
  // ─────────────────────────────────────────────────────────────────

  /**
   * Step 1 – Authenticate with Paymob and return the auth token.
   */
  private async authenticate(): Promise<string> {
    const response = await axios.post(`${PAYMOB_BASE_URL}/auth/tokens`, {
      api_key: this.apiKey,
    });

    const token: string | undefined = response.data?.token;
    if (!token) {
      throw new Error('Paymob authentication failed: no token returned');
    }
    this.logger.debug('Paymob auth token obtained');
    return token;
  }

  /**
   * Step 2 – Register the order with Paymob and return the Paymob order ID.
   */
  private async createOrder(
    authToken: string,
    amountCents: number,
    currency: string,
    merchantOrderId: string,
    payment: Payment,
  ): Promise<number> {
    const body = {
      auth_token: authToken,
      delivery_needed: false,
      amount_cents: amountCents,
      currency,
      merchant_order_id: merchantOrderId,
      items: [
        {
          name: `Donation – Campaign ${payment.campaignUuid}`,
          amount_cents: amountCents,
          description: `Campaign donation by ${payment.userUuid || 'guest'}`,
          quantity: 1,
        },
      ],
    };

    const response = await axios.post(`${PAYMOB_BASE_URL}/ecommerce/orders`, body);

    const orderId: number | undefined = response.data?.id;
    if (!orderId) {
      throw new Error('Paymob order creation failed: no order ID returned');
    }
    this.logger.debug(`Paymob order created: orderId=${orderId}`);
    return orderId;
  }

  /**
   * Step 3 – Generate a single-use payment key (token).
   *
   * Billing data uses safe placeholder values; in a real implementation these
   * should be populated from the User entity or the frontend payload.
   */
  private async generatePaymentKey(
    authToken: string,
    paymobOrderId: number,
    amountCents: number,
    currency: string,
    payment: Payment,
  ): Promise<string> {
    const body = {
      auth_token: authToken,
      amount_cents: amountCents,
      expiration: 3600, // token valid for 1 hour
      order_id: paymobOrderId,
      billing_data: {
        apartment: 'NA',
        email: payment.user?.email || 'guest@tamkin.app',
        floor: 'NA',
        first_name: payment.user?.firstName || 'Guest',
        street: 'NA',
        building: 'NA',
        // UserModel does not expose a phone field; use a safe placeholder.
        // When you add phone to UserModel, replace this with: payment.user?.phone
        phone_number: '+20000000000',
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'NA',
        country: 'EG',
        last_name: payment.user?.lastName || 'User',
        state: 'NA',
      },
      currency,
      integration_id: Number(this.integrationId),
      // lock_order_when_paid: used to prevent double payments on the same order
      lock_order_when_paid: 'false',
    };

    const response = await axios.post(`${PAYMOB_BASE_URL}/acceptance/payment_keys`, body);

    const paymentKey: string | undefined = response.data?.token;
    if (!paymentKey) {
      throw new Error('Paymob payment key generation failed: no token returned');
    }
    this.logger.debug('Paymob payment key generated');
    return paymentKey;
  }

  /**
   * Step 4 – Build the hosted-payment iframe / redirect URL.
   */
  private buildPaymentUrl(paymentKey: string): string {
    return `${PAYMOB_BASE_URL}/acceptance/iframes/${this.iframeId}?payment_token=${paymentKey}`;
  }

  // ─────────────────────────────────────────────────────────────────
  //  PRIVATE – Webhook Helpers
  // ─────────────────────────────────────────────────────────────────

  /**
   * Verify the Paymob HMAC-SHA512 webhook signature.
   *
   * Paymob sends the HMAC either as a query-param (?hmac=...) or in a custom
   * header.  The concatenation string is built from specific transaction fields
   * in a strict order defined by Paymob's documentation.
   *
   * See: https://docs.paymob.com/docs/transaction-webhooks
   */
  private verifyHmacSignature(
    data: Record<string, any>,
    headers: Record<string, string | string[] | undefined>,
  ): boolean {
    try {
      // The HMAC is typically passed as a query string param (hmac) attached to
      // the webhook URL, but Paymob also documents sending it inline.
      const receivedHmac =
        (headers['hmac'] as string) ||
        (data.hmac as string);

      if (!receivedHmac) {
        this.logger.warn('No HMAC found in Paymob webhook headers or payload');
        return false;
      }

      const obj = data.obj ?? data;

      // Exact concatenation order per Paymob documentation
      const concatenated = [
        obj.amount_cents,
        obj.created_at,
        obj.currency,
        obj.error_occured,
        obj.has_parent_transaction,
        obj.id,
        obj.integration_id,
        obj.is_3d_secure,
        obj.is_auth,
        obj.is_capture,
        obj.is_refunded,
        obj.is_standalone_payment,
        obj.is_voided,
        obj.order?.id,
        obj.owner,
        obj.pending,
        obj.source_data?.pan,
        obj.source_data?.sub_type,
        obj.source_data?.type,
        obj.success,
      ]
        .map((v) => (v === undefined || v === null ? '' : String(v)))
        .join('');

      const expectedHmac = crypto
        .createHmac('sha512', this.hmacSecret!)
        .update(concatenated)
        .digest('hex');

      return expectedHmac.toLowerCase() === receivedHmac.toLowerCase();
    } catch (err: any) {
      this.logger.error(`HMAC verification threw: ${err.message}`);
      return false;
    }
  }

  /**
   * Extract the canonical WebhookVerificationResult from a verified live payload.
   */
  private extractWebhookResult(data: Record<string, any>): WebhookVerificationResult {
    // Paymob wraps the transaction in data.obj for "Transaction Processed" events
    const obj = data.obj ?? data;

    const isSuccess: boolean = obj.success === true || obj.success === 'true';
    const isPending: boolean = obj.pending === true || obj.pending === 'true';

    // We only treat fully successful, non-pending transactions as SUCCEEDED
    const status: 'SUCCEEDED' | 'FAILED' = isSuccess && !isPending ? 'SUCCEEDED' : 'FAILED';

    // Extract payment UUID from the merchant_order_id we set during order creation.
    // Format: PMB_{paymentUuid}_{timestamp}
    const merchantOrderId: string | undefined = obj.order?.merchant_order_id;
    let paymentUuid: string | undefined;
    if (merchantOrderId) {
      const parts = merchantOrderId.split('_');
      if (parts.length >= 3 && parts[0] === 'PMB') {
        // parts[1] is the UUID, parts[2] is the timestamp
        paymentUuid = parts.slice(1, parts.length - 1).join('-');
        // Re-assemble UUID: PMB_{uuid-part1}-{uuid-part2}-...-{uuid-partN}_{ts}
        // The UUID itself may contain hyphens, so we take everything between
        // index 1 and the last segment.
        const withoutPrefix = merchantOrderId.slice('PMB_'.length);
        const lastUnderscore = withoutPrefix.lastIndexOf('_');
        paymentUuid = withoutPrefix.slice(0, lastUnderscore);
      } else {
        paymentUuid = merchantOrderId;
      }
    }

    return {
      isValid: true,
      eventPayload: data,
      providerPaymentId: String(obj.id ?? `paymob_${Date.now()}`),
      paymentUuid,
      status,
    };
  }

  // ─────────────────────────────────────────────────────────────────
  //  PRIVATE – Mock Mode Helpers
  // ─────────────────────────────────────────────────────────────────

  private buildMockCheckoutSession(
    payment: Payment,
    merchantRefNumber: string,
    amountCents: number,
    currency: string,
  ): CheckoutSessionResult {
    const mockOrderId = `mock_pmb_order_${Date.now()}`;
    const mockPaymentKey = `mock_pmb_key_${payment.uuid}_${Date.now()}`;
    const checkoutUrl = `https://mock-paymob-checkout.com/iframe/${this.iframeId ?? 'MOCK_IFRAME'}?payment_token=${mockPaymentKey}`;

    this.logger.debug(
      `[MOCK] Paymob checkout session | paymentUuid=${payment.uuid} | ` +
        `amount=${amountCents} ${currency} | url=${checkoutUrl}`,
    );

    return {
      sessionId: mockOrderId,
      checkoutUrl,
      merchantRefNumber,
      // Extra Paymob-specific fields
      paymobOrderId: mockOrderId,
      paymentKey: mockPaymentKey,
    } as CheckoutSessionResult & { paymobOrderId: string; paymentKey: string };
  }

  private handleMockWebhook(data: Record<string, any>): WebhookVerificationResult {
    // Extract payment UUID from merchant_order_id (PMB_{uuid}_{timestamp})
    const merchantOrderId: string | undefined =
      data.merchantRefNumber ?? data.obj?.order?.merchant_order_id;

    let paymentUuid: string | undefined;
    if (merchantOrderId && merchantOrderId.startsWith('PMB_')) {
      const withoutPrefix = merchantOrderId.slice('PMB_'.length);
      const lastUnderscore = withoutPrefix.lastIndexOf('_');
      paymentUuid = lastUnderscore !== -1
        ? withoutPrefix.slice(0, lastUnderscore)
        : withoutPrefix;
    }

    const isSuccess = data.success === true || data.orderStatus === 'PAID';

    return {
      isValid: true,
      eventPayload: data,
      providerPaymentId: data.transactionId || `mock_pmb_txn_${Date.now()}`,
      paymentUuid,
      status: isSuccess ? 'SUCCEEDED' : 'FAILED',
    };
  }
}
