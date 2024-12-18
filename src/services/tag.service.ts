import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/tags`);

  return data;
};

const getById = async (tenantId: string, tagId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/tags/${tagId}`);

  return data;
};

const create = async (tenantId: string, translations: any[], isShowInMenu: boolean) => {
  const {data} = await axios.post(`/tenants/${tenantId}/tags`, {
    translations,
    isShowInMenu,
  });

  return data;
};

const update = async (
  tenantId: string,
  tagId: string,
  translations: any[],
  isShowInMenu: boolean,
) => {
  const {data} = await axios.put(`/tenants/${tenantId}/tags/${tagId}`, {
    translations,
    isShowInMenu,
  });

  return data;
};

const remove = async (tenantId: string, tagId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/tags/${tagId}`);

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
