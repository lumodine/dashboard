"use server";

import unitService from "@/services/unit.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, unitId: string) {
    const response = await unitService.remove(tenantId, unitId);

    revalidatePath("/");

    return response;
}
