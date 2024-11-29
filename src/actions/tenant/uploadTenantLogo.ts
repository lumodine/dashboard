"use server";

import tenantService from "@/services/tenant.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, formData: FormData) {
    const response = await tenantService.uploadLogo(tenantId, formData);

    if (response.success) {
        revalidatePath("/", "layout");
    }

    return response;
}
