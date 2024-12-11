"use server";

import {revalidatePath} from "next/cache";
import userService from "@/services/user.service";

export default async function (tenantId: string, userId: string, role: string) {
  const response = await userService.update(tenantId, userId, role);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
