import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/units`);

  return data;
};

const getById = async (tenantId: string, unitId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/units/${unitId}`);

  return data;
};

const create = async (tenantId: string, translations: any[]) => {
  const { data } = await axios.post(`/tenants/${tenantId}/units`, {
    translations
  });

  return data;
};

const update = async (tenantId: string, unitId: string, translations: any[]) => {
  const { data } = await axios.put(`/tenants/${tenantId}/units/${unitId}`, {
    translations
  });

  return data;
};

const remove = async (tenantId: string, unitId: string) => {
  const { data } = await axios.delete(`/tenants/${tenantId}/units/${unitId}`);

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
