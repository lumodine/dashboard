import axios from "@/lib/axios";

const getAll = async () => {
  const {data} = await axios.get("/tenants");

  return data;
};

const getById = async (id: string) => {
  const {data} = await axios.get(`/tenants/${id}`);

  return data;
};

const create = async (name: string, alias: string, languages: any[], currencies: any[]) => {
  const {data} = await axios.post(`/tenants`, {
    name,
    alias,
    languages,
    currencies,
  });

  return data;
};

const updateSettings = async (tenantId: string, name: string, alias: string, status: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/settings`, {
    name,
    alias,
    status,
  });

  return data;
};

const updateLanguageSettings = async (tenantId: string, languages: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/languages`, {
    languages,
  });

  return data;
};

const updateCurrencySettings = async (tenantId: string, currencies: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/currencies`, {
    currencies,
  });

  return data;
};

const updateColor = async (tenantId: string, color: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/theme/color`, {
    color,
  });

  return data;
};

const updateFont = async (tenantId: string, font: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/theme/font`, {
    font,
  });

  return data;
};

const updateLayout = async (tenantId: string, headerPosition: string) => {
  const {data} = await axios.put(`/tenants/${tenantId}/theme/layout`, {
    headerPosition,
  });

  return data;
};

const remove = async (tenantId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}`);

  return data;
};

const uploadLogo = async (tenantId: string, formData: FormData) => {
  const {data} = await axios.post(`/tenants/${tenantId}/upload/logo`, formData);

  return data;
};

const uploadBackground = async (tenantId: string, formData: FormData) => {
  const {data} = await axios.post(`/tenants/${tenantId}/upload/background`, formData);

  return data;
};

const removeLogo = async (tenantId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/upload/logo`);

  return data;
};

const removeBackground = async (tenantId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/upload/background`);

  return data;
};

const updateSocialMedia = async (tenantId: string, socialMedias: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/social-media`, {
    socialMedias,
  });

  return data;
};

export default {
  getAll,
  getById,
  create,
  updateSettings,
  updateLanguageSettings,
  updateCurrencySettings,
  updateColor,
  updateFont,
  updateLayout,
  remove,
  uploadLogo,
  uploadBackground,
  removeLogo,
  removeBackground,
  updateSocialMedia,
};
