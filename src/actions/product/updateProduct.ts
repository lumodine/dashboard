"use server";
import productService from "@/services/product.service";
import { revalidatePath } from "next/cache";

export default async function (tenantId: string, categoryId: string, productId: string, formData: FormData) {
    const languages = formData.getAll("languages") as string[];
    const names = formData.getAll("names") as string[];
    const descriptions = formData.getAll("descriptions") as string[];

    const currencies = formData.getAll("currencies") as string[];
    const amounts = formData.getAll("amounts") as string[];
    
    const translations = [];
    for (const i in languages) {
        translations.push({
            language: languages[i],
            name: names[i],
            description: descriptions[i],
        });
    }
    
    const prices = [];
    for (const i in currencies) {
        prices.push({
            currency: currencies[i],
            amount: amounts[i],
        });
    }
    
    const response = await productService.update(tenantId, categoryId, productId, translations, prices);
    if (response.success) {
        revalidatePath("/", "layout")
    }
    return response;
}
