"use server";
import productService from "@/services/product.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, productId: string, status: string) {
    const response = await productService.updateStatus(tenantId, categoryId, productId, status);
    if (response.success) {
        revalidatePath("/", "layout");
    }
    return response;
}
