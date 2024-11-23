"use server";

import tenantService from "@/services/tenant.service";
import { redirect } from "next/navigation";

export default async function (formData: FormData) {
    const name = formData.get("name") as string;
    const alias = formData.get("alias") as string;
    const language = formData.get("language") as string;
    const currency = formData.get("currency") as string;

    const languages = [
        {
            language: language,
            isDefault: true,
        },
    ];

    const currencies = [
        {
            currency: currency,
            isDefault: true,
        },
    ];

    const response = await tenantService.create({
        name,
        alias,
        languages,
        currencies,
    });

    if (response.success) {
        redirect(`/d/${response.data._id}`); //TODO:
    }

    return response;
}
