"use server";

import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string) {
    const response = await categoryService.removeImage(tenantId, categoryId);

    if (response.success) {
        revalidatePath("/", "layout");
    }

    return response;
}
