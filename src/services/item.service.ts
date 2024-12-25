import axios from "@/lib/axios";

const getAll = async (tenantId: string, itemId?: string, kind?: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/items`, {
    params: {
      itemId,
      kind,
    },
  });

  return data;
};

const getById = async (tenantId: string, itemId: string, kind?: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/items/${itemId}`, {
    params: {
      kind,
    },
  });

  return data;
};

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
  getAll,
  getById,
  updateSort,
  updateStatus,
  updateType,
};
