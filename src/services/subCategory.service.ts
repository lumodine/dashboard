import axios from "@/lib/axios";

const update = async (tenantId: string, subCategoryId: string, translations: any[]) => {
  const {data} = await axios.put(`/tenants/${tenantId}/items/sub-categories/${subCategoryId}`, {
    translations,
  });

  return data;
};

const remove = async (tenantId: string, subCategoryId: string) => {
  const {data} = await axios.delete(`/tenants/${tenantId}/items/sub-categories/${subCategoryId}`);

  return data;
};

export default {
  update,
  remove,
};
