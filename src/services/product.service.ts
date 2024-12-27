import itemService from "@/services/item.service";
import axios from "@/lib/axios";
import {ITEM_KINDS} from "@/constants/item";

const getAll = async (tenantId: string, categoryId: string) => {
  return await itemService.getAll(tenantId, categoryId, ITEM_KINDS.PRODUCT);
};

const getById = async (tenantId: string, productId: string) => {
  return await itemService.getById(tenantId, productId, ITEM_KINDS.PRODUCT);
};

const create = async (
  tenantId: string,
  categoryId: string,
  translations: any[],
  prices: any[],
  tags: any[],
) => {
  const {data} = await axios.post(`/tenants/${tenantId}/items/products`, {
    category: categoryId,
    translations,
    prices,
    tags,
  });

  return data;
};

const update = async (
  tenantId: string,
  productId: string,
  category: string,
  translations: any[],
  prices: any[],
  tags: any[],
) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/products/${productId}`, {
    category,
    translations,
    prices,
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
  create,
  update,
  remove,
  uploadImage,
  removeImage,
};
