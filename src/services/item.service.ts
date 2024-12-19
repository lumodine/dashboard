import axios from "@/lib/axios";

const updateSort = async (tenantId: string, items: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/sort`, {
    items,
  });

  return data;
};

const updateStatus = async (tenantId: string, itemId: string, status: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/${itemId}/status`, {
    status,
  });

  return data;
};

const updateType = async (tenantId: string, itemId: string, type: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/${itemId}/type`, {
    type,
  });

  return data;
};

export default {
  updateSort,
  updateStatus,
  updateType,
};
