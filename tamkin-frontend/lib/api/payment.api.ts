import asyncWrapper from "../wrappers/asyncWrapper";
import axiosInstance from "./axiosInstance";

const paymentBaseUrl = "/payments";

const getAllPayments = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${paymentBaseUrl}/`);
  return res.data;
});

const getByIdPayments = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${paymentBaseUrl}/${data.id}`);
  return res.data;
});

const createPayments = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.post(`${paymentBaseUrl}/`, data);
  return res.data;
});

const updatePayments = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.put(`${paymentBaseUrl}/${data.id}`, data);
  return res.data;
});

const deletePayments = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.delete(`${paymentBaseUrl}/${data.id}`, data);
  return res.data;
});

export default {
  getAllPayments,
  getByIdPayments,
  createPayments,
  updatePayments,
  deletePayments,
};
