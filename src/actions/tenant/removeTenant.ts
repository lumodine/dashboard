"use server";

import tenantService from "@/services/tenant.service";
import { redirect } from "next/navigation";

export default async function (tenantId: string) {
    const response = await tenantService.remove(tenantId);

    if (response.success) {
        redirect("/d");
    }

    return response;
}
