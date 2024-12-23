import axios from "@/lib/axios";

const getAll = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/branches`);

  return data;
};

const getById = async (tenantId: string, tenantBranchId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/branches/${tenantBranchId}`);

  return data;
};

const create = async (tenantId: string, translations: any[], address: string, coordinates: any) => {
  const {data} = await axios.post(`/tenants/${tenantId}/branches`, {
    translations,
    address,
    coordinates,
  });

  return data;
};

const update = async (
  tenantId: string,
  tenantBranchId: string,
  translations: any[],
  address: string,
  coordinates: any,
) => {
  const {data} = await axios.put(`/tenants/${tenantId}/branches/${tenantBranchId}`, {
    translations,
    address,
    coordinates,
  });

  return data;
};

const remove = async (tenantId: string, tenantBranchId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/branches/${tenantBranchId}`);

  return data;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
