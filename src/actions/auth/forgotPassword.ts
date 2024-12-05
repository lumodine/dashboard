"use server";

import authService from "@/services/auth.service";

export default async function (formData: FormData) {
  const email = formData.get("email") as string;

  const response = await authService.forgotPassword(email);

  return response;
}
