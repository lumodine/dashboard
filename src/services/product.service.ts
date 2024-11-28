import axios from "@/lib/axios";

const getAll = async (tenantId: string, categoryId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/categories/${categoryId}/products`);

  return data;
};

const getById = async (tenantId: string, categoryId: string, productId: string) => {
  const { data } = await axios.get(`/tenants/${tenantId}/categories/${categoryId}/products/${productId}`);

  return data;
};

const create = async (tenantId: string, categoryId: string, translations: any[], prices: any[]) => {
  const { data } = await axios.post(`/tenants/${tenantId}/categories/${categoryId}/products`, {
    category: categoryId,
    translations,
    prices,
  });

  return data;
};

const updateSort = async (tenantId: string, categoryId: string, items: any[]) => {
  const { data } = await axios.put(`/tenants/${tenantId}/categories/${categoryId}/products/sort`, {
    items,
  });

  return data;
};

const updateStatus = async (tenantId: string, categoryId: string, productId: string, status: string) => {
  const { data } = await axios.put(`/tenants/${tenantId}/categories/${categoryId}/products/${productId}/status`, {
    status,
  });

  return data;
};

const updateType = async (tenantId: string, categoryId: string, productId: string, type: string) => {
  const { data } = await axios.put(`/tenants/${tenantId}/categories/${categoryId}/products/${productId}/type`, {
    type,
  });

  return data;
};

export default {
  getAll,
  getById,
  create,
  updateSort,
  updateStatus,
  updateType,
};
