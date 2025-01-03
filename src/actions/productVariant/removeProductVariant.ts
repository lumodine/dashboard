"use server";

import {redirect} from "next/navigation";
import productVariantService from "@/services/productVariant.service";

export default async function (
  tenantId: string,
  categoryId: string,
  productId: string,
  variantId: string,
) {
  const response = await productVariantService.remove(tenantId, variantId);

  if (response.success) {
    redirect(`/d/${tenantId}/menu/${categoryId}/${productId}?tab=variants`);
  }

  return response;
}
