import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignApi } from "@/lib/api";

const CAMPAIGNS_KEY = "campaigns";

export function useCampaigns() {
  return useQuery({
    queryKey: [CAMPAIGNS_KEY],
    queryFn: campaignApi.getAll,
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
