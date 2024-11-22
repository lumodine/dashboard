"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const alias = formData.get("alias") as string;

    const response = await tenantService.updateSettings({
        tenantId,
        name,
        address,
        alias,
    });

    return response;
}
