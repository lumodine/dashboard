"use server";
import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, status: string) {
    const response = await categoryService.updateStatus(tenantId, categoryId, status);
    if (response.success) {
        revalidatePath("/", "layout");
    }
    return response;
}
