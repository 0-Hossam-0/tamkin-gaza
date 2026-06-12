import axiosInstance from "./axiosInstance";
import type { TCampaign } from "@/@types/TCampaign";
import type { IResponse } from "@/@types/IResponse";

const baseUrl = "/campaign";

export const campaignApi = {
  getAll: async () => {
    const res = await axiosInstance.get<IResponse<TCampaign[]>>(baseUrl);
    return res.data.data!;
  },

  getById: async (id: string) => {
    const res = await axiosInstance.get<IResponse<TCampaign>>(`${baseUrl}/${id}`);
    return res.data.data!;
  },

  create: async (formData: FormData) => {
    const res = await axiosInstance.post<IResponse<TCampaign>>(baseUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data!;
  },

  update: async (id: string, formData: FormData) => {
    const res = await axiosInstance.put<IResponse<TCampaign>>(`${baseUrl}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data!;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`${baseUrl}/${id}`);
  },

  restore: async (id: string) => {
    const res = await axiosInstance.patch<IResponse<TCampaign>>(`${baseUrl}/restore/${id}`);
    return res.data.data!;
  },

  approve: async (id: string) => {
    const res = await axiosInstance.patch<IResponse<TCampaign>>(`${baseUrl}/approve/${id}`);
    return res.data.data!;
  },
};
