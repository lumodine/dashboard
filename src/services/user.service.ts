import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/users`);

  return data;
};

const create = async (tenantId: string, email: string, role: string) => {
  const {data} = await axios.post(`/tenants/${tenantId}/users`, {
    email,
    role,
  });

  return data;
};

const update = async (tenantId: string, userId: string, role: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/users/${userId}`, {
    role,
  });

  return data;
};

const remove = async (tenantId: string, userId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/users/${userId}`);

  return data;
};

export default {
  getAll,
  create,
  update,
  remove,
};
