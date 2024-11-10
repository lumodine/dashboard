"use server";

import authService from "@/services/auth.service";

export default async function (formData: FormData) {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const password = formData.get("password") as string;

    return await authService.register(
        email,
        name,
        surname,
        password
    );
}
