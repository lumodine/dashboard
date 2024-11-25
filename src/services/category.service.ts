import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/categories`);

  return data;
};

const getById = async (tenantId: string, categoryId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/categories/${categoryId}`);

  return data;
};

const create = async (tenantId: string, translations: any[]) => {
  const { data } = await axios.post(`/tenants/${tenantId}/categories`, {
    translations
  });

  return data;
};

const update = async (tenantId: string, categoryId: string, translations: any[]) => {
  const { data } = await axios.put(`/tenants/${tenantId}/categories/${categoryId}`, {
    translations
  });

  return data;
};

const updateSort = async (tenantId: string, items: any[]) => {
  const { data } = await axios.put(`/tenants/${tenantId}/categories/sort`, {
    items,
  });

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  updateSort,
};
