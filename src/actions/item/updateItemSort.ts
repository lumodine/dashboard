"use server";
import {revalidatePath} from "next/cache";
import itemService from "@/services/item.service";

export default async function (tenantId: string, items: any[]) {
  const response = await itemService.updateSort(tenantId, items);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
