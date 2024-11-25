"use server";
import categoryService from "@/services/category.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, formData: FormData) {
    const languages = formData.getAll("languages") as string[];
    const names = formData.getAll("names") as string[];
    const descriptions = formData.getAll("descriptions") as string[];
    
    const translations = [];
    for (const i in languages) {
        translations.push({
            language: languages[i],
            name: names[i],
            description: descriptions[i],
        });
    }
    
    const response = await categoryService.update(tenantId, categoryId, translations);
    if (response.success) {
        revalidatePath("/", "layout")
    }
    return response;
}
