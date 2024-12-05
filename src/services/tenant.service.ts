import axios from "@/lib/axios";

const getAll = async () => {
  const { data } = await axios.get("/tenants");

  return data;
};

const getAllThemes = async () => {
  const { data } = await axios.get("/tenants/themes");

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get(`/tenants/${id}`);

  return data;
};

type CreateProps = {
  name: string;
  alias: string;
  languages: any[];
  currencies: any[];
};

const create = async ({ name, alias, languages, currencies }: CreateProps) => {
  const { data } = await axios.post(`/tenants`, {
    name,
    alias,
    languages,
    currencies,
  });

  return data;
};

type UpdateSettingsProps = {
  tenantId: string;
  name: string;
  address: string;
  alias: string;
  status: string;
};

const updateSettings = async ({ tenantId, name, alias, status }: UpdateSettingsProps) => {
  const { data } = await axios.put(`/tenants/${tenantId}/settings`, {
    name,
    alias,
    status,
  });

  return data;
};

type UpdateLanguageSettingsProps = {
  tenantId: string;
  languages: any[];
};

const updateLanguageSettings = async ({ tenantId, languages }: UpdateLanguageSettingsProps) => {
  const { data } = await axios.put(`/tenants/${tenantId}/languages`, {
    languages
  });

  return data;
};

type UpdateCurrencySettingsProps = {
  tenantId: string;
  currencies: any[];
};

const updateCurrencySettings = async ({ tenantId, currencies }: UpdateCurrencySettingsProps) => {
  const { data } = await axios.put(`/tenants/${tenantId}/currencies`, {
    currencies
  });

  return data;
};

type UpdateThemeProps = {
  tenantId: string;
  theme: string;
};

const updateTheme = async ({ tenantId, theme }: UpdateThemeProps) => {
  const { data } = await axios.put(`/tenants/${tenantId}/theme`, {
    theme
  });

  return data;
};

const remove = async (tenantId: string) => {
  const { data } = await axios.delete(`/tenants/${tenantId}`);

  return data;
};

const uploadLogo = async (tenantId: string, formData: FormData) => {
  const { data } = await axios.post(`/tenants/${tenantId}/upload/logo`, formData);

  return data;
};

const uploadBackground = async (tenantId: string, formData: FormData) => {
  const { data } = await axios.post(`/tenants/${tenantId}/upload/background`, formData);

  return data;
};

const removeLogo = async (tenantId: string) => {
  const { data } = await axios.delete(`/tenants/${tenantId}/upload/logo`);

  return data;
};

const removeBackground = async (tenantId: string) => {
  const { data } = await axios.delete(`/tenants/${tenantId}/upload/background`);

  return data;
};

const updateSocialMedia = async (tenantId: string, socialMedias: any[]) => {
  const { data } = await axios.put(`/tenants/${tenantId}/social-media`, {
    socialMedias
  });

  return data;
};

export default {
  getAll,
  getAllThemes,
  getById,
  create,
  updateSettings,
  updateLanguageSettings,
  updateCurrencySettings,
  updateTheme,
  remove,
  uploadLogo,
  uploadBackground,
  removeLogo,
  removeBackground,
  updateSocialMedia,
};
