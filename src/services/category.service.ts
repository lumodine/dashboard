import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/categories`);

  return data;
};

const getById = async (tenantId: string, categoryId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/categories/${categoryId}`);

  return data;
};

const create = async (tenantId: string, translations: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/categories`, {
    translations,
  });

  return data;
};

const update = async (tenantId: string, categoryId: string, translations: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/categories/${categoryId}`, {
    translations,
  });

  return data;
};

const updateSort = async (tenantId: string, items: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/categories/sort`, {
    items,
  });

  return data;
};

const updateStatus = async (tenantId: string, categoryId: string, status: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/categories/${categoryId}/status`, {
    status,
  });

  return data;
};

const updateType = async (tenantId: string, categoryId: string, type: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/categories/${categoryId}/type`, {
    type,
  });

  return data;
};

const remove = async (tenantId: string, categoryId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/categories/${categoryId}`);

  return data;
};

const uploadImage = async (tenantId: string, categoryId: string, formData: FormData) => {
  const {data} = await axios.post(
    `/tenants/${tenantId}/categories/${categoryId}/upload/image`,
    formData,
  );

  return data;
};

const removeImage = async (tenantId: string, categoryId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/categories/${categoryId}/upload/image`);

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  updateSort,
  updateStatus,
  updateType,
  remove,
  uploadImage,
  removeImage,
};
