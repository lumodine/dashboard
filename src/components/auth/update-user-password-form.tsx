"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import updateUserPassword from "@/actions/auth/updateUserPassword";

export const UpdateUserPasswordForm = () => {
  const clientAction = async (formData: FormData) => {
    const response = await updateUserPassword(formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <>
      <form action={clientAction} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="currentPassword">Var olan şifre (*)</Label>
          <Input required id="currentPassword" name="currentPassword" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="newPassword">Yeni şifre (*)</Label>
          <Input required id="newPassword" name="newPassword" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmNewPassword">Şifreyi onayla (*)</Label>
          <Input required id="confirmNewPassword" name="confirmNewPassword" type="password" />
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <Button className="w-full" type="submit">
          <Save /> Kaydet
        </Button>
      </form>
    </>
  );
};
UpdateUserPasswordForm.displayName = "UpdateUserPasswordForm";
