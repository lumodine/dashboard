"use server";

import tenantService from "@/services/tenant.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string) {
    const response = await tenantService.removeLogo(tenantId);

    if (response.success) {
        revalidatePath("/", "layout");
    }

    return response;
}
