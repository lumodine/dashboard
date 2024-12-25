"use server";

import {revalidatePath} from "next/cache";
import productService from "@/services/product.service";

export default async function (tenantId: string, productId: string, formData: FormData) {
  const response = await productService.uploadImage(tenantId, productId, formData);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
