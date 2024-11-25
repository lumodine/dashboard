"use server";
import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, sort: number) {
    const items = [
        {
            categoryId,
            sort,
        }
    ];
    
    const response = await categoryService.updateSort(tenantId, items);
    if (response.success) {
        revalidatePath("/", "layout");
    }
    return response;
}
