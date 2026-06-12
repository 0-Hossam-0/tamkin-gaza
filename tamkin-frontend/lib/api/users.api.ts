import axiosInstance from "./axiosInstance";
import type { TUser } from "@/@types/IUser";
import type { IResponse } from "@/@types/IResponse";

export const usersApi = {
  getAll: async () => {
    const res = await axiosInstance.get<IResponse<TUser[]>>("/users");
    return res.data.data!;
  },

  getById: async (id: string) => {
    const res = await axiosInstance.get<IResponse<TUser>>(`/users/${id}`);
    return res.data.data!;
  },

  update: async (id: string, data: Partial<TUser>) => {
    const res = await axiosInstance.put<IResponse<TUser>>(`/users/${id}`, data);
    return res.data.data!;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/users/${id}`);
  },
};
