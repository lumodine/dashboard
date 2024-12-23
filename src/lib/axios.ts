import axios, {AxiosInstance} from "axios";
import tokenService from "@/services/token.service";
import { redirect } from "next/navigation";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await tokenService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      redirect("/forbidden");
      return;
    }

    return Promise.reject(error);
  },
);

export default api;
