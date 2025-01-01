"use server";
import {redirect} from "next/navigation";
import menuService from "@/services/menu.service";

export default async function (tenantId: string, itemId: string, items: any[]) {
  const response = await menuService.createSub(tenantId, itemId, items);

  if (response.success) {
    redirect(`/d/${tenantId}/menu/${itemId}`);
  }

  return response;
}
