import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reelsApi } from "@/lib/api";

const REELS_KEY = "reels";

export function useReels(page = 1, limit = 10) {
  return useQuery({
    queryKey: [REELS_KEY, page, limit],
    queryFn: () => reelsApi.getAll({ page, limit }),
  });
}

export function useReel(id: string) {
  return useQuery({
    queryKey: [REELS_KEY, id],
    queryFn: () => reelsApi.getById(id),
    enabled: !!id,
  });
}

export function useUploadReel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => reelsApi.upload(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [REELS_KEY] }),
  });
}

export function useUpdateReel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; content?: string } }) =>
      reelsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [REELS_KEY] }),
  });
}

export function useDeleteReel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reelsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [REELS_KEY] }),
  });
}
