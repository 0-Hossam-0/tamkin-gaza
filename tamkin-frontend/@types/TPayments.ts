export type TPaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED";
export type TPaymentProvider = "STRIPE" | "PAYMOB" | "FAWRY";

export type TPayments = {
  uuid: string;
  campaignUuid: string;
  userUuid?: string;
  amount: number;
  currency: string;
  status: TPaymentStatus;
  provider: TPaymentProvider;
  providerPaymentId?: string;
  merchantRefNumber?: string;
  orderId?: string;
  paymentKey?: string;
  createdAt: string;
  updatedAt: string;
};
