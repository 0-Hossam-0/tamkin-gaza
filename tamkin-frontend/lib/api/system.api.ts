import axiosInstance from "./axiosInstance";
import type { IResponse } from "@/@types/IResponse";

export interface SystemHealthData {
  hero: { title: string; slogan: string; cta_text: string };
  about: { title: string; description: string };
  why_tamkin: {
    title: string;
    before: string[];
    gaza_reality: { amputees_count: number; issues: string[] };
    summary: string;
  };
  mission: { title: string; items: string[]; statement: string };
  features: { title: string; items: string[]; statement: string };
  stories: {
    title: string;
    founders: Array<{
      name: string;
      role: string;
      location: string;
      image: string;
      story: string;
    }>;
  };
  partnership: { title: string; items: string[]; statement: string };
  closing: { text: string };
}

export const systemApi = {
  getHealth: async () => {
    const res = await axiosInstance.get<IResponse<SystemHealthData>>("/");
    return res.data.data!;
  },
};
