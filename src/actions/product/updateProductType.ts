"use server";
import productService from "@/services/product.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, productId: string, type: string) {
    const response = await productService.updateType(tenantId, categoryId, productId, type);
    if (response.success) {
        revalidatePath("/", "layout");
    }
    return response;
}
