import axios from "@/lib/axios";

const getAll = async () => {
  const { data } = await axios.get("/tenants");

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
};

const updateSettings = async ({ tenantId, name, address, alias }: UpdateSettingsProps) => {
  const { data } = await axios.put(`/tenants/${tenantId}/settings`, {
    name,
    address,
    alias,
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

export default {
  getAll,
  getById,
  create,
  updateSettings,
  updateLanguageSettings,
};
