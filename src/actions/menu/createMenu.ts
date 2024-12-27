"use server";
import {redirect} from "next/navigation";
import menuService from "@/services/menu.service";

export default async function (tenantId: string, categories: any[]) {
  const response = await menuService.create(tenantId, categories);

  if (response.success) {
    redirect(`/d/${tenantId}/menu`);
  }

  return response;
}
