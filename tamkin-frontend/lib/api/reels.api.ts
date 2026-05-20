import asyncWrapper from "../wrappers/asyncWrapper";
import axiosInstance from "./axiosInstance";

const usersBaseUrl = "/users";
const getAllUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${usersBaseUrl}/`);
  return res.data;
});

const getByIdUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.get(`${usersBaseUrl}/${data.id}`);
  return res.data;
});

const createUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.post(`${usersBaseUrl}/`, data);
  return res.data;
});

const updateUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.put(`${usersBaseUrl}/${data.id}`, data);
  return res.data;
});

const deleteUsers = asyncWrapper.api(async (data?: any) => {
  const res = await axiosInstance.delete(`${usersBaseUrl}/${data.id}`, data);
  return res.data;
});

export default {
  getAllUsers,
  getByIdUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
