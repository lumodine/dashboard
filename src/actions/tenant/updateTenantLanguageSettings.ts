"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
    const defaultLanguage = formData.get("defaultLanguage") as string;
    const otherLanguages = formData.getAll("otherLanguages") as string[];

    let languages = [
        {
            language: defaultLanguage,
            isDefault: true,
        },
    ];

    for (const otherLanguage of otherLanguages) {
        languages.push({
            language: otherLanguage,
            isDefault: false,
        });
    }

    const response = await tenantService.updateLanguageSettings({
        tenantId,
        languages,
    });

    return response;
}
