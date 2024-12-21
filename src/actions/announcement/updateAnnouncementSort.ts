"use server";
import {revalidatePath} from "next/cache";
import announcementService from "@/services/announcement.service";

export default async function (tenantId: string, items: any[]) {
  const response = await announcementService.updateSort(tenantId, items);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
