import itemService from "./item.service";
import axios from "@/lib/axios";
import {ITEM_KINDS} from "@/constants/item";

const getAll = async (tenantId: string, productId: string) => {
  return await itemService.getAll(tenantId, productId, ITEM_KINDS.PRODUCT_VARIANT);
};

const getById = async (tenantId: string, productVariantId: string) => {
  return await itemService.getById(tenantId, productVariantId, ITEM_KINDS.PRODUCT_VARIANT);
};

const create = async (tenantId: string, productId: string, translations: any[], prices: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/items/product-variants`, {
    productId,
    translations,
    prices,
  });

  return data;
};

const update = async (
  tenantId: string,
  productVariantId: string,
  productId: string,
  translations: any[],
  prices: any[],
) => {
  const {data} = await axios.put(
    `/tenants/${tenantId}/items/product-variants/${productVariantId}`,
    {
      productId,
      translations,
      prices,
    },
  );

  return data;
};

const remove = async (tenantId: string, productVariantId: string) => {
  const {data} = await axios.delete(
    `/tenants/${tenantId}/items/product-variants/${productVariantId}`,
  );

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
