"use server";

import authService from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function (token: string, formData: FormData) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const response = await authService.resetPassword(token, password, confirmPassword);

    if (response.success) {
        redirect("/");
    }

    return response;
}
