import itemService from "@/services/item.service";
import axios from "@/lib/axios";
import {ITEM_KINDS} from "@/constants/item";

const getAll = async (tenantId: string) => {
  return await itemService.getAll(tenantId, undefined, ITEM_KINDS.CATEGORY);
};

const getById = async (tenantId: string, categoryId: string) => {
  return await itemService.getById(tenantId, categoryId, ITEM_KINDS.CATEGORY);
};

const create = async (tenantId: string, translations: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/items/categories`, {
    translations,
  });

  return data;
};

const update = async (tenantId: string, categoryId: string, translations: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/categories/${categoryId}`, {
    translations,
  });

  return data;
};

const remove = async (tenantId: string, categoryId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/items/categories/${categoryId}`);

  return data;
};

const uploadImage = async (tenantId: string, categoryId: string, formData: FormData) => {
  const {data} = await axios.post(
    `/tenants/${tenantId}/items/categories/${categoryId}/upload/image`,
    formData,
  );

  return data;
};

const removeImage = async (tenantId: string, categoryId: string) => {
  const {data} = await axios.delete(
    `/tenants/${tenantId}/items/categories/${categoryId}/upload/image`,
  );

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  uploadImage,
  removeImage,
};
