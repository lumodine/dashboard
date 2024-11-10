"use server";

import authService from "@/services/auth.service";

export default async function (formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return await authService.login(email, password);
}
