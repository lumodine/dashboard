"use server";
import {redirect} from "next/navigation";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, formData: FormData) {
  const languages = formData.getAll("languages") as string[];
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      name: titles[i],
      description: descriptions[i],
    });
  }

  const response = await categoryService.create(tenantId, translations);

  if (response.success) {
    redirect(`/d/${tenantId}/menu`);
  }

  return response;
}
