import axios from "@/lib/axios";

const getAll = async () => {
  const { data } = await axios.get("/tenants");

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get(`/tenants/${id}`);

  return data;
};

const getMenus = async (id: string) => {
  const { data } = await axios.get(`/tenants/${id}/menus`);

  return data;
};

export default {
  getAll,
  getById,
  getMenus,
};
