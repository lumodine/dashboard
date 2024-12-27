import axios from "@/lib/axios";

const create = async (tenantId: string, items: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/items/menu`, {
    items,
  });

  return data;
};

export default {
  create,
};
