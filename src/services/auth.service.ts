import tokenService from "./token.service";
import axios from "@/lib/axios";

const getMe = async () => {
  const {data} = await axios.get("/auth/me");

  return data;
};

const login = async (email: string, password: string) => {
  const {data} = await axios.post("/auth/login", {
    email,
    password,
  });

  if (data.success) {
    await tokenService.setToken(data.data.token);
  }

  return data;
};

const register = async (
  email: string,
  name: string,
  surname: string,
  password: string,
  confirmPassword: string,
) => {
  const {data} = await axios.post("/auth/register", {
    email,
    name,
    surname,
    password,
    confirmPassword,
  });

  if (data.success) {
    await tokenService.setToken(data.data.token);
  }

  return data;
};

const forgotPassword = async (email: string) => {
  const {data} = await axios.post("/auth/forgot-password", {
    email,
  });

  return data;
};

const resetPassword = async (token: string, password: string, confirmPassword: string) => {
  const {data} = await axios.post(`/auth/reset-password?t=${token}`, {
    password,
    confirmPassword,
  });

  return data;
};

const logout = async () => await tokenService.removeToken();

const updateMeInfo = async (name: string, surname: string) => {
  const {data} = await axios.put("/auth/me/info", {
    name,
    surname,
  });

  return data;
};

const updateMeEmail = async (email: string) => {
  const {data} = await axios.put("/auth/me/email", {
    email,
  });

  return data;
};

const updateMePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
) => {
  const {data} = await axios.put("/auth/me/password", {
    currentPassword,
    newPassword,
    confirmNewPassword,
  });

  return data;
};

export default {
  getMe,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  updateMeInfo,
  updateMeEmail,
  updateMePassword,
};
