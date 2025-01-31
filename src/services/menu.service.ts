import axios from "@/lib/axios";

const create = async (tenantId: string, items: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/menu`, {
    items,
  });

  return data;
};

const createSub = async (tenantId: string, itemId: string, items: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/menu/${itemId}`, {
    items,
  });

  return data;
};

export default {
  create,
  createSub,
};
