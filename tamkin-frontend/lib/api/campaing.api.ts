import asyncWrapper from "../wrappers/asyncWrapper";
import axiosInstance from "./axiosInstance";

const campaignsBaseUrl = "/campaigns";

const getAllCampaigns = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${campaignsBaseUrl}/`);
  return res.data;
});

const getByIdCampaigns = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${campaignsBaseUrl}/${data.id}`);
  return res.data;
});

const createCampaigns = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.post(`${campaignsBaseUrl}/`, data);
  return res.data;
});

const updateCampaigns = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.put(`${campaignsBaseUrl}/${data.id}`, data);
  return res.data;
});

const deleteCampaigns = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.delete(
    `${campaignsBaseUrl}/${data.id}`,
    data,
  );
  return res.data;
});

export default {
  getAllCampaigns,
  getByIdCampaigns,
  createCampaigns,
  updateCampaigns,
  deleteCampaigns,
};
