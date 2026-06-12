import { useQuery, useMutation } from "@tanstack/react-query";
import { paymentApi } from "@/lib/api";
import type { TPaymentProvider } from "@/@types/TPayments";

export function usePayment(id: string) {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => paymentApi.getById(id),
    enabled: !!id,
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: (dto: {
      campaignUuid: string;
      amount: number;
      currency?: string;
      provider: TPaymentProvider;
    }) => paymentApi.create(dto),
  });
}
