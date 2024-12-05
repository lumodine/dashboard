"use server";
import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (
  tenantId: string,
  categoryId: string,
  productId: string,
  status: string,
) {
  const response = await productService.updateStatus(tenantId, categoryId, productId, status);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
