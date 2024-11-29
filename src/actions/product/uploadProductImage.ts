"use server";

import productService from "@/services/product.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, productId: string, formData: FormData) {
    const response = await productService.uploadImage(tenantId, categoryId, productId, formData);

    if (response.success) {
        revalidatePath("/", "layout");
    }

    return response;
}
