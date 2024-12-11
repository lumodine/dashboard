"use server";

import {revalidatePath} from "next/cache";
import userService from "@/services/user.service";

export default async function (tenantId: string, formData: FormData) {
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  const response = await userService.create(tenantId, email, role);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
