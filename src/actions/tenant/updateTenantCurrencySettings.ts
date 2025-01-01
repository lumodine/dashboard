"use server";

import tenantService from "@/services/tenant.service";

export default async function (tenantId: string, defaultCurrency: any, otherCurrencies: any[]) {
  let currencies: any[] = [
    {
      currency: defaultCurrency._id,
      isDefault: true,
    },
  ];

  for (const otherCurrency of otherCurrencies) {
    currencies.push({
      currency: otherCurrency._id,
      isDefault: false,
    });
  }

  const response = await tenantService.updateCurrencySettings(tenantId, currencies);

  return response;
}
