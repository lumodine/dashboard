"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import productService from "@/services/product.service";

export default async function (
  tenantId: string,
  categoryId: string,
  productId: string,
  formData: FormData,
) {
  const languages = formData.getAll("languages") as string[];
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];

  const currencies = formData.getAll("currencies") as string[];
  const amounts = formData.getAll("amounts") as string[];

  const category = formData.get("category") as string;

  const tags = formData.getAll("tags") as string[];

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      title: titles[i],
      description: descriptions[i],
    });
  }

  const prices = [];

  for (const i in currencies) {
    prices.push({
      currency: currencies[i],
      amount: amounts[i],
    });
  }

  const response = await productService.update(
    tenantId,
    productId,
    category,
    translations,
    prices,
    tags,
  );

  if (response.success) {
    if (categoryId !== category) {
      redirect(`/d/${tenantId}/menu/${category}/${productId}`);
    } else {
      revalidatePath("/", "layout");
    }
  }

  return response;
}
