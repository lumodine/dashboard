"use server";
import productService from "@/services/product.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, productId: string, sort: number) {
    const items = [
        {
            productId,
            sort,
        }
    ];
    
    const response = await productService.updateSort(tenantId, categoryId, items);
    if (response.success) {
        revalidatePath("/", "layout");
    }
    return response;
}
