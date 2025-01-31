"use server";

import {revalidatePath} from "next/cache";
import authService from "@/services/auth.service";

export default async function (formData: FormData) {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;

  const response = await authService.updateMeInfo(name, surname);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
