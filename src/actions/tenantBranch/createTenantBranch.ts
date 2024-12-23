"use server";
import {redirect} from "next/navigation";
import tenantBranchService from "@/services/tenantBranch.service";

export default async function (tenantId: string, formData: FormData) {
  const languages = formData.getAll("languages") as string[];
  const titles = formData.getAll("titles") as string[];
  const descriptions = formData.getAll("descriptions") as string[];
  const address = formData.get("address") as string;
  const coordinates = {
    lat: formData.get("lat") as string,
    lng: formData.get("lng") as string,
  };

  const translations = [];

  for (const i in languages) {
    translations.push({
      language: languages[i],
      title: titles[i],
      description: descriptions[i],
    });
  }

  const response = await tenantBranchService.create(tenantId, translations, address, coordinates);

  if (response.success) {
    redirect(`/d/${tenantId}/branches`);
  }

  return response;
}
