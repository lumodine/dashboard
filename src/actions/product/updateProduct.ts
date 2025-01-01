"use server";
import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (
  tenantId: string,
  languages: any[],
  currencies: any[],
  productId: string,
  formData: FormData,
) {
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];

  const amounts = formData.getAll("amounts") as string[];

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i].language._id,
      title: titles[i],
      description: descriptions[i],
    });
  }

  const prices = [];

  for (const i in currencies) {
    prices.push({
      currency: currencies[i].currency._id,
      amount: amounts[i],
    });
  }

  const response = await productService.update(tenantId, productId, translations, prices);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
