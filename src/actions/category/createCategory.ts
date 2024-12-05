"use server";
import {redirect} from "next/navigation";
import categoryService from "@/services/category.service";

export default async function (tenantId: string, formData: FormData) {
  const languages = formData.getAll("languages") as string[];
  const names = formData.getAll("names") as string[];
  const descriptions = formData.getAll("descriptions") as string[];

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      name: names[i],
      description: descriptions[i],
    });
  }

  const response = await categoryService.create(tenantId, translations);

  if (response.success) {
    redirect(`/d/${tenantId}/menu`);
  }

  return response;
}
