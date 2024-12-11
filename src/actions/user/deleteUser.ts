"use server";

import {revalidatePath} from "next/cache";
import userService from "@/services/user.service";

export default async function (tenantId: string, userId: string) {
  const response = await userService.remove(tenantId, userId);

  if (response.success) {
    revalidatePath("/", "layout");
  }

  return response;
}
