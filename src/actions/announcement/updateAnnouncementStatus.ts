"use server";
import {revalidatePath} from "next/cache";
import announcementService from "@/services/announcement.service";

export default async function (tenantId: string, announcementId: string, status: string) {
  const response = await announcementService.updateStatus(tenantId, announcementId, status);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
