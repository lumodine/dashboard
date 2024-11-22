"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, formData: FormData) {
    const defaultCurrency = formData.get("defaultCurrency") as string;
    const otherCurrencies = formData.getAll("otherCurrencies") as string[];

    let currencies = [
        {
            _id: defaultCurrency,
            isDefault: true,
        },
    ];

    for (const otherCurrency of otherCurrencies) {
        currencies.push({
            _id: otherCurrency,
            isDefault: false,
        });
    }

    const response = await tenantService.updateCurrencySettings({
        tenantId,
        currencies,
    });

    return response;
}
