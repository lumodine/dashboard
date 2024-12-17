"use server";

import {redirect} from "next/navigation";
import tagService from "@/services/tag.service";

export default async function (tenantId: string, tagId: string) {
  const response = await tagService.remove(tenantId, tagId);

  if (response.success) {
    redirect(`/d/${tenantId}/tags`);
  }

  return response;
}
