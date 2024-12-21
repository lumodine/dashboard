"use server";
import {revalidatePath} from "next/cache";
import announcementService from "@/services/announcement.service";

export default async function (tenantId: string, announcementId: string, formData: FormData) {
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

  const response = await announcementService.update(tenantId, announcementId, translations);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
