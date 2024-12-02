"use server";

import productService from "@/services/product.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, productId: string) {
    const response = await productService.removeImage(tenantId, categoryId, productId);

    if (response.success) {
        revalidatePath("/", "layout");
    }

    return response;
}
