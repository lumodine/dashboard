"use server";
import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (
  tenantId: string,
  categoryId: string,
  productId: string,
  type: string,
) {
  const response = await productService.updateType(tenantId, categoryId, productId, type);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
