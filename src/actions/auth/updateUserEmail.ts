"use server";

import authService from "@/services/auth.service";
import { revalidatePath } from "next/cache";

export default async function (formData: FormData) {
    const email = formData.get("email") as string;

    const response = await authService.updateMeEmail(email);

    if (response.success) {
        revalidatePath("/", "layout")
    }

    return response;
}
