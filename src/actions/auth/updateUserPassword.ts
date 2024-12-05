"use server";

import {revalidatePath} from "next/cache";
import authService from "@/services/auth.service";

export default async function (formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmNewPassword = formData.get("confirmNewPassword") as string;

  const response = await authService.updateMePassword(
    currentPassword,
    newPassword,
    confirmNewPassword,
  );

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
