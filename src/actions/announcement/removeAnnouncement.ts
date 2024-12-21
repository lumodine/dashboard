"use server";

import {redirect} from "next/navigation";
import announcementService from "@/services/announcement.service";

export default async function (tenantId: string, announcementId: string) {
  const response = await announcementService.remove(tenantId, announcementId);

  if (response.success) {
    redirect(`/d/${tenantId}/announcements`);
  }

  return response;
}
