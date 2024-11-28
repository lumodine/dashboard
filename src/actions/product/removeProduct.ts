"use server";

import productService from "@/services/product.service";
import { redirect } from "next/navigation";

export default async function (tenantId: string, categoryId: string, productId: string) {
    const response = await productService.remove(tenantId, categoryId, productId);

    if (response.success) {
        redirect(`/d/${tenantId}/menu/${categoryId}`);
    }

    return response;
}
