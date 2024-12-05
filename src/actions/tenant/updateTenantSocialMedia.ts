"use server";

import {revalidatePath} from "next/cache";
import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
  const instagram = formData.get("instagram") as string;
  const x = formData.get("x") as string;
  const facebook = formData.get("facebook") as string;
  const youtube = formData.get("youtube") as string;
  const website = formData.get("website") as string;

  const response = await tenantService.updateSocialMedia(tenantId, [
    {
      type: "instagram",
      value: instagram,
    },
    {
      type: "x",
      value: x,
    },
    {
      type: "facebook",
      value: facebook,
    },
    {
      type: "youtube",
      value: youtube,
    },
    {
      type: "website",
      value: website,
    },
  ]);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
