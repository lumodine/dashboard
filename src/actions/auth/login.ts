"use server";

import {redirect} from "next/navigation";
import authService from "@/services/auth.service";

export default async function (formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await authService.login(email, password);

  if (response.success) {
    redirect("/d");
  }

  return response;
}
