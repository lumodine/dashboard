"use server";
import {redirect} from "next/navigation";
import tagService from "@/services/tag.service";

export default async function (tenantId: string, formData: FormData) {
  const languages = formData.getAll("languages") as string[];
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];
  const isShowInMenu = formData.get("isShowInMenu") as string;
  const color = formData.get("color") as string;

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      name: titles[i],
      description: descriptions[i],
    });
  }

  const response = await tagService.create(tenantId, translations, isShowInMenu === "on", color);

  if (response.success) {
    redirect(`/d/${tenantId}/tags`);
  }

  return response;
}
