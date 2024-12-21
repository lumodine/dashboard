import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/announcements`);

  return data;
};

const getById = async (tenantId: string, announcementId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/announcements/${announcementId}`);

  return data;
};

const create = async (tenantId: string, translations: any[]) => {
  const {data} = await axios.post(`/tenants/${tenantId}/announcements`, {
    translations,
  });

  return data;
};

const update = async (tenantId: string, announcementId: string, translations: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/announcements/${announcementId}`, {
    translations,
  });

  return data;
};

const updateSort = async (tenantId: string, items: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/announcements/sort`, {
    items,
  });

  return data;
};

const updateStatus = async (tenantId: string, announcementId: string, status: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/announcements/${announcementId}/status`, {
    status,
  });

  return data;
};

const remove = async (tenantId: string, announcementId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/announcements/${announcementId}`);

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  updateSort,
  updateStatus,
  remove,
};
