"use server";
import {revalidatePath} from "next/cache";
import itemService from "@/services/item.service";

export default async function (tenantId: string, itemId: string, type: string) {
  const response = await itemService.updateType(tenantId, itemId, type);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
