import axios from "axios";
import { getLocale } from "next-intl/server";

const getLanguage = async () => {
  const locale = await getLocale();
  return locale;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    // "accept-language": await getLanguage(),
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosInstance;
