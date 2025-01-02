import itemService from "@/services/item.service";
import axios from "@/lib/axios";
import {ITEM_KINDS} from "@/constants/item";

const getAll = async (tenantId: string, categoryId: string) => {
  return await itemService.getAll(tenantId, categoryId, ITEM_KINDS.PRODUCT);
};

const getById = async (tenantId: string, productId: string) => {
  return await itemService.getById(tenantId, productId, ITEM_KINDS.PRODUCT);
};

const update = async (tenantId: string, productId: string, translations: any[], prices: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/products/${productId}`, {
    translations,
    prices,
  });

  return data;
};

const updateTags = async (tenantId: string, productId: string, tags: string[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/products/${productId}/tags`, {
    tags,
  });

  return data;
};

const remove = async (tenantId: string, productId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/items/products/${productId}`);

  return data;
};

const uploadImage = async (tenantId: string, productId: string, formData: FormData) => {
  const {data} = await axios.post(
    `/tenants/${tenantId}/items/products/${productId}/upload/image`,
    formData,
  );

  return data;
};

const removeImage = async (tenantId: string, productId: string) => {
  const {data} = await axios.delete(
    `/tenants/${tenantId}/items/products/${productId}/upload/image`,
  );

  return data;
};

export default {
  getAll,
  getById,
  update,
  updateTags,
  remove,
  uploadImage,
  removeImage,
};
