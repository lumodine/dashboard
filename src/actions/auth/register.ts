"use server";

import authService from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function (formData: FormData) {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const password = formData.get("password") as string;

    const response = await authService.register(
        email,
        name,
        surname,
        password
    );

    if (response.success) {
        redirect("/");
    }

    return response;
}
