import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const { data } = await axios.get(`/${tenantId}/products`);

  return data;
};

const getById = async (tenantId: string, productId: string) => {
  const { data } = await axios.get(`/${tenantId}/products/${productId}`);

  return data;
};

export default {
  getAll,
  getById,
};
