import axios from "@/lib/axios";

const getAllTranslatableContents = async (tenantId: string, item: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/content/translatable/contents`, {
    params: {
      item,
    },
  });

  return data;
};

const getAllTranslatableCurrencies = async (tenantId: string, item: string) => {
  const {data} = await axios.get(`/tenants/${tenantId}/content/translatable/currencies`, {
    params: {
      item,
    },
  });

  return data;
};

const updateTranslateAllContents = async (tenantId: string, type: string, items: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/content/translatable/contents`, {
    type,
    items,
  });

  return data;
};

const updateAllAmounts = async (tenantId: string, type: string, items: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/content/translatable/currencies`, {
    type,
    items,
  });

  return data;
};

export default {
  getAllTranslatableContents,
  getAllTranslatableCurrencies,
  updateTranslateAllContents,
  updateAllAmounts,
};
