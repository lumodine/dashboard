import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const { data } = await axios.get(`/${tenantId}/categories`);

  return data;
};

const getById = async (tenantId: string, categoryId: string) => {
  const { data } = await axios.get(`/${tenantId}/categories/${categoryId}`);

  return data;
};

export default {
  getAll,
  getById,
};
