import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/users`);

  return data;
};

const getById = async (tenantId: string, userId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/users/${userId}`);

  return data;
};

export default {
  getAll,
  getById,
};
