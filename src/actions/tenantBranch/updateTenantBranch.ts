"use server";
import {revalidatePath} from "next/cache";
import tenantBranchService from "@/services/tenantBranch.service";

export default async function (
  tenantId: string,
  languages: any[],
  tenantBranchId: string,
  formData: FormData,
) {
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
      language: languages[i].language._id,
      title: titles[i],
      description: descriptions[i],
    });
  }

  const response = await tenantBranchService.update(
    tenantId,
    tenantBranchId,
    translations,
    address,
    coordinates,
  );

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
