"use server";
import {revalidatePath} from "next/cache";
import itemService from "@/services/item.service";

export default async function (tenantId: string, itemId: string, status: string) {
  const response = await itemService.updateStatus(tenantId, itemId, status);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
