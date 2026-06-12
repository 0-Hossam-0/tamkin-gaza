import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import type { TUser } from "@/@types/IUser";

export function useLogin() {
  const { setUser } = useAuth();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user as TUser);
    },
  });
}

export function useRegister() {
  const { setUser } = useAuth();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user as TUser);
    },
  });
}

export function useLoginWithGoogle() {
  const { setUser } = useAuth();
  return useMutation({
    mutationFn: authApi.loginWithGoogle,
    onSuccess: (data) => {
      setUser(data.user as TUser);
    },
  });
}

export function useLogout() {
  const { setUser } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setUser(null);
      qc.clear();
    },
  });
}

export function useConfirmEmail() {
  return useMutation({
    mutationFn: (code: string) => authApi.confirmEmail(code),
  });
}

export function useRequestConfirmEmail() {
  return useMutation({
    mutationFn: authApi.requestConfirmEmail,
  });
}
