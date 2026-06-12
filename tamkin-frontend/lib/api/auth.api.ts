import axiosInstance from "./axiosInstance";
import type { TUser } from "@/@types/IUser";
import type { IResponse } from "@/@types/IResponse";

interface GoogleLoginDto {
  id_token: string;
}

interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  nationality: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResult {
  user: TUser;
  status?: string;
}

export const authApi = {
  loginWithGoogle: async (dto: GoogleLoginDto) => {
    const res = await axiosInstance.post<IResponse<AuthResult>>("/auth/google", dto);
    return res.data.data!;
  },

  register: async (dto: RegisterDto) => {
    const res = await axiosInstance.post<IResponse<AuthResult>>("/auth/register", dto);
    return res.data.data!;
  },

  login: async (dto: LoginDto) => {
    const res = await axiosInstance.post<IResponse<AuthResult>>("/auth/login", dto);
    return res.data.data!;
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
  },

  requestConfirmEmail: async () => {
    await axiosInstance.post("/auth/request-confirm-email");
  },

  confirmEmail: async (code: string) => {
    await axiosInstance.post("/auth/confirm-email", { code });
  },
};
