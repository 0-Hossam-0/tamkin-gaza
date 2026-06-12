import axiosInstance from "./axiosInstance";
import type { TPayments, TPaymentProvider } from "@/@types/TPayments";
import type { IResponse } from "@/@types/IResponse";

interface CreatePaymentDto {
  campaignUuid: string;
  amount: number;
  currency?: string;
  provider: TPaymentProvider;
}

interface PaymentSession {
  sessionId?: string;
  checkoutUrl?: string;
  merchantRefNumber?: string;
  paymentKey?: string;
  orderId?: string;
}

export const paymentApi = {
  create: async (dto: CreatePaymentDto) => {
    const res = await axiosInstance.post<IResponse<PaymentSession>>("/payments/create", dto);
    return res.data.data!;
  },

  getById: async (id: string) => {
    const res = await axiosInstance.get<IResponse<TPayments>>(`/payments/${id}`);
    return res.data.data!;
  },
};
