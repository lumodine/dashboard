"use server";
import {revalidatePath} from "next/cache";
import subCategoryService from "@/services/subCategory.service";

export default async function (tenantId: string, subCategoryId: string, formData: FormData) {
  const languages = formData.getAll("languages") as string[];
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      title: titles[i],
      description: descriptions[i],
    });
  }

  const response = await subCategoryService.update(tenantId, subCategoryId, translations);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
