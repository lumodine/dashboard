"use server";

import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, formData: FormData) {
    const response = await categoryService.uploadImage(tenantId, categoryId, formData);

    if (response.success) {
        revalidatePath("/", "layout");
    }

    return response;
}
