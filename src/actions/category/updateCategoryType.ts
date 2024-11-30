"use server";
import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, type: string) {
    const response = await categoryService.updateType(tenantId, categoryId, type);
    if (response.success) {
        revalidatePath("/", "layout");
    }
    return response;
}
