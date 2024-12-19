"use server";
import {revalidatePath} from "next/cache";
import tagService from "@/services/tag.service";

export default async function (tenantId: string, tagId: string, formData: FormData) {
  const languages = formData.getAll("languages") as string[];
  const names = formData.getAll("names") as string[];
  const descriptions = formData.getAll("descriptions") as string[];
  const isShowInMenu = formData.get("isShowInMenu") as string;
  const color = formData.get("color") as string;

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      name: names[i],
      description: descriptions[i],
    });
  }

  const response = await tagService.update(
    tenantId,
    tagId,
    translations,
    isShowInMenu === "on",
    color,
  );

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
