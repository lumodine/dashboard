"use server";
import {redirect} from "next/navigation";
import announcementService from "@/services/announcement.service";

export default async function (tenantId: string, formData: FormData) {
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

  const response = await announcementService.create(tenantId, translations);

  if (response.success) {
    redirect(`/d/${tenantId}/announcements`);
  }

  return response;
}
