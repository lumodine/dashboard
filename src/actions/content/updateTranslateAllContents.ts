"use server";

import {revalidatePath} from "next/cache";
import contentService from "@/services/content.service";

const convertData = (formData: FormData, type: string, languages: string[]) => {
  const baseItemsKey = `${type}_items`;
  const items = formData.getAll(baseItemsKey) as string[];

  const response = [];

  for (const item of items) {
    const baseTranslationsKey = `${type}[${item}]`;

    for (const language of languages) {
      const titleKey = `${baseTranslationsKey}[${language}][title]`;
      const descriptionKey = `${baseTranslationsKey}[${language}][description]`;

      const title = formData.get(titleKey) as string;
      const description = formData.get(descriptionKey) as string;

      response.push({item, language, title, description});
    }
  }

  return response;
};

export default async function (tenantId: string, formData: FormData) {
  const type = formData.get("type") as string;
  const languages = formData.getAll("languages") as string[];

  const items = convertData(formData, type, languages);

  const response = await contentService.updateTranslateAllContents(tenantId, type, items);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
