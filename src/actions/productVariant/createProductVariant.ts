"use server";
import {redirect} from "next/navigation";
import productVariantService from "@/services/productVariant.service";

export default async function (tenantId: string, itemId: string, subItemId: string, items: any[]) {
  const response = await productVariantService.create(tenantId, itemId, subItemId, items);

  if (response.success) {
    redirect(`/d/${tenantId}/menu/${itemId}/${subItemId}?tab=variants`);
  }

  return response;
}
