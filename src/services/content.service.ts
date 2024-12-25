import axios from "@/lib/axios";

const getAllTranslatableContents = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/content/translatable/contents`);

  return data;
};

const getAllTranslatableCurrencies = async (tenantId: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/content/translatable/currencies`);

  return data;
};

export default {
  getAllTranslatableContents,
  getAllTranslatableCurrencies,
};
