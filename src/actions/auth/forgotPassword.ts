"use server";

import authService from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function (formData: FormData) {
    const email = formData.get("email") as string;

    const response = await authService.forgotPassword(email);

    if (response.success) {
        redirect("/");
    }

    return response;
}
