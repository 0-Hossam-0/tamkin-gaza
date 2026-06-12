import axiosInstance from "./axiosInstance";
import type { TReels } from "@/@types/TReels";
import type { IResponse } from "@/@types/IResponse";

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface SearchReelsParams extends PaginationParams {
  title?: string;
  content?: string;
  uploadedBy?: string;
}

interface BackendPaginatedData<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function mapPaginated<T>(raw: BackendPaginatedData<T>): PaginatedResult<T> {
  return {
    items: raw.data,
    total: raw.meta.totalItems,
    page: raw.meta.currentPage,
    limit: raw.meta.itemCount,
    totalPages: raw.meta.totalPages,
  };
}

export const reelsApi = {
  getAll: async (params?: PaginationParams) => {
    const res = await axiosInstance.get<IResponse<BackendPaginatedData<TReels>>>("/reels", { params });
    return mapPaginated(res.data.data!);
  },

  search: async (params?: SearchReelsParams) => {
    const res = await axiosInstance.get<IResponse<BackendPaginatedData<TReels>>>("/reels/search", { params });
    return mapPaginated(res.data.data!);
  },

  getById: async (id: string) => {
    const res = await axiosInstance.get<IResponse<TReels>>(`/reels/${id}`);
    return res.data.data!;
  },

  getByUserId: async (userId: string, params?: PaginationParams) => {
    const res = await axiosInstance.get<IResponse<BackendPaginatedData<TReels>>>(`/reels/user/${userId}`, { params });
    return mapPaginated(res.data.data!);
  },

  upload: async (formData: FormData) => {
    const res = await axiosInstance.post<IResponse<TReels>>("/reels/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data!;
  },

  update: async (id: string, data: { title?: string; content?: string }) => {
    const res = await axiosInstance.put<IResponse<TReels>>(`/reels/update/${id}`, data);
    return res.data.data!;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/reels/${id}`);
  },
};
