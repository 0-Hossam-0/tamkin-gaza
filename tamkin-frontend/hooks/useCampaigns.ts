import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignApi } from "@/lib/api";

const CAMPAIGNS_KEY = "campaigns";

const MOCK_CAMPAIGNS = [
  {
    uuid: "mock-1",
    title: { en: "Help Gaza Families", ar: "مساعدة عائلات غزة" },
    image: ["https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"],
    status: "ACTIVE",
    current_amount: 5000,
    target_amount: 10000,
  },
  {
    uuid: "mock-2",
    title: { en: "Medical Supplies for Hospitals", ar: "إمدادات طبية للمستشفيات" },
    image: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"],
    status: "ACTIVE",
    current_amount: 12000,
    target_amount: 15000,
  },
  {
    uuid: "mock-3",
    title: { en: "Winter Clothes for Children", ar: "ملابس شتوية للأطفال" },
    image: ["https://images.unsplash.com/photo-1469571486292-b53601020f1b?q=80&w=2070&auto=format&fit=crop"],
    status: "COMPLETED",
    current_amount: 20000,
    target_amount: 20000,
  }
];

export function useCampaigns() {
  return useQuery({
    queryKey: [CAMPAIGNS_KEY],
    queryFn: async () => {
      if (process.env.NEXT_PUBLIC_IS_MOCK === "true") {
        return MOCK_CAMPAIGNS;
      }
      return campaignApi.getAll();
    },
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: [CAMPAIGNS_KEY, id],
    queryFn: () => campaignApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => campaignApi.create(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
}

export function useUpdateCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      campaignApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
}

export function useDeleteCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campaignApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
}

export function useRestoreCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campaignApi.restore(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
}

export function useApproveCampaign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campaignApi.approve(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CAMPAIGNS_KEY] }),
  });
}

export function useCampaignSearch(params?: { q?: string; status?: string }) {
  return useQuery({
    queryKey: [CAMPAIGNS_KEY, "search", params],
    queryFn: () => campaignApi.search(params),
    enabled: !!params?.q || !!params?.status,
  });
}
