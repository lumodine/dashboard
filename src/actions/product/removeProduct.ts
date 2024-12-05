"use server";

import {redirect} from "next/navigation";
import productService from "@/services/product.service";

export default async function (tenantId: string, categoryId: string, productId: string) {
  const response = await productService.remove(tenantId, categoryId, productId);

  if (response.success) {
    redirect(`/d/${tenantId}/menu/${categoryId}`);
  }

  return response;
}
