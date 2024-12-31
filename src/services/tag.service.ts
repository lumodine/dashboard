import itemService from "@/services/item.service";
import axios from "@/lib/axios";
import {ITEM_KINDS} from "@/constants/item";

const getAll = async (tenantId: string) => {
  return await itemService.getAll(tenantId, undefined, ITEM_KINDS.TAG);
};

const getById = async (tenantId: string, tagId: string) => {
  return await itemService.getById(tenantId, tagId, ITEM_KINDS.TAG);
};

const create = async (tenantId: string, translations: any[], color: string) => {
  const {data} = await axios.post(`/tenants/${tenantId}/items/tags`, {
    translations,
    color,
  });

  return data;
};

const update = async (tenantId: string, tagId: string, translations: any[], color: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/tags/${tagId}`, {
    translations,
    color,
  });

  return data;
};

const remove = async (tenantId: string, tagId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/items/tags/${tagId}`);

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
