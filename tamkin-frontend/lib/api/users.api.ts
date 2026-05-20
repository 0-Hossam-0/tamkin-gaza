import asyncWrapper from "../wrappers/asyncWrapper";
import axiosInstance from "./axiosInstance";

const userBaseUrl = "/users";
const getAllUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${userBaseUrl}/`);
  return res.data;
});

const getByIdUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${userBaseUrl}/${data.id}`);
  return res.data;
});

const createUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.post(`${userBaseUrl}/`, data);
  return res.data;
});

const updateUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.put(`${userBaseUrl}/${data.id}`, data);
  return res.data;
});

const deleteUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.delete(`${userBaseUrl}/${data.id}`, data);
  return res.data;
});

export default {
  getAllUsers,
  getByIdUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
