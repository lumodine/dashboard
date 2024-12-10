"use client";

import {toast} from "react-toastify";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import resetPassword from "@/actions/auth/resetPassword";
import {SubmitButton} from "@/components/common/submit-button";

export type ResetPasswordFormProps = {
  token: string;
};

export const ResetPasswordForm = ({token}: ResetPasswordFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await resetPassword(token, formData);

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
          <Label htmlFor="password">Yeni şifre (*)</Label>
          <Input required id="password" name="password" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Şifreyi onayla (*)</Label>
          <Input required id="confirmPassword" name="confirmPassword" type="password" />
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <SubmitButton>Şifremi yenile</SubmitButton>
      </form>
    </>
  );
};
ResetPasswordForm.displayName = "ResetPasswordForm";
