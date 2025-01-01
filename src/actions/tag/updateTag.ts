"use server";
import {revalidatePath} from "next/cache";
import tagService from "@/services/tag.service";

export default async function (
  tenantId: string,
  languages: any[],
  tagId: string,
  formData: FormData,
) {
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];
  const color = formData.get("color") as string;

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i].language._id,
      title: titles[i],
      description: descriptions[i],
    });
  }

  const response = await tagService.update(tenantId, tagId, translations, color);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
