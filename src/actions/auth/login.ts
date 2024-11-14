"use server";

import authService from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function (formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await authService.login(email, password);

    if (response.success) {
        redirect("/d");
    }

    return response;
}
