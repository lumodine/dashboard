"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, defaultLanguage: any, otherLanguages: any[]) {
  let languages: any[] = [
    {
      language: defaultLanguage._id,
      isDefault: true,
    },
  ];

  for (const otherLanguage of otherLanguages) {
    languages.push({
      language: otherLanguage._id,
      isDefault: false,
    });
  }

  const response = await tenantService.updateLanguageSettings(tenantId, languages);

  return response;
}
