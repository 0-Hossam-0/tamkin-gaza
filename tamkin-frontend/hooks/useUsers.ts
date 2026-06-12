import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";

const USERS_KEY = "users";

export function useUsers() {
  return useQuery({
    queryKey: [USERS_KEY],
    queryFn: usersApi.getAll,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: [USERS_KEY, id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Record<string, unknown>> }) =>
      usersApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [USERS_KEY] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [USERS_KEY] }),
  });
}
