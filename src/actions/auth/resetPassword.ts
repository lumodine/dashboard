"use server";

import {redirect} from "next/navigation";
import authService from "@/services/auth.service";

export default async function (token: string, formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const response = await authService.resetPassword(token, password, confirmPassword);

  if (response.success) {
    redirect("/");
  }

  return response;
}
