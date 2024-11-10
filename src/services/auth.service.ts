import axios from "@/lib/axios";
import tokenService from "./token.service";

const me = async () => {
  const { data } = await axios.get("/auth/me");

  return data;
};

const mePermissions = async () => {
  const { data } = await axios.get("/auth/me/permissions");

  return data;
};

const login = async (email: string, password: string) => {
  const { data } = await axios.post("/auth/login", {
    email,
    password
  });

  if (data.success) {
    await tokenService.setToken(data.data.token);
  }

  return data;
};

const register = async (email: string, name: string, surname: string, password: string) => {
  const { data } = await axios.post("/auth/register", {
    email,
    name,
    surname,
    password
  });

  if (data.success) {
    await tokenService.setToken(data.data.token);
  }

  return data;
};

const logout = async () => await tokenService.removeToken();

export default {
  me,
  mePermissions,
  login,
  register,
  logout,
};
