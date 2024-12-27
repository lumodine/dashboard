import axios from "@/lib/axios";

const create = async (tenantId: string, categories: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/items/menu`, {
    categories,
  });

  return data;
};

export default {
  create,
};
