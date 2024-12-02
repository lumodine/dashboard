"use server";

import tenantService from "@/services/tenant.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, formData: FormData) {
    const name = formData.get("name") as string;
    const alias = formData.get("alias") as string;

    const response = await tenantService.updateSettings({
        tenantId,
        name,
        alias,
    });

    revalidatePath("/", "layout");

    return response;
}
