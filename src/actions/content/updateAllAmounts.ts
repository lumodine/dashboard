"use server";

import {revalidatePath} from "next/cache";
import contentService from "@/services/content.service";

const convertData = (formData: FormData, type: string, currencies: string[]) => {
  const baseItemsKey = `${type}_items`;
  const items = formData.getAll(baseItemsKey) as string[];

  const response = [];

  for (const item of items) {
    const baseTranslationsKey = `${type}[${item}]`;

    for (const currency of currencies) {
      const amountKey = `${baseTranslationsKey}[${currency}][amount]`;

      const amount = formData.get(amountKey) as string;

      response.push({item, currency, amount: parseFloat(amount)});
    }
  }

  return response;
};

export default async function (tenantId: string, formData: FormData) {
  const type = formData.get("type") as string;
  const currencies = formData.getAll("currencies") as string[];

  const items = convertData(formData, type, currencies);

  const response = await contentService.updateAllAmounts(tenantId, type, items);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
