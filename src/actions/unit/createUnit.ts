"use server";

import unitService from "@/services/unit.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, formData: FormData) {
    const languageIds = formData.getAll("languageIds") as string[];
    const names = formData.getAll("names") as string[];
    
    const translations = [];
    for (const i in languageIds) {
        translations.push({
            languageId: languageIds[i],
            name: names[i],
        });
    }
    
    const response = await unitService.create(tenantId, translations);

    revalidatePath("/");

    return response;
}
