"use client";

import {toast} from "react-toastify";
import {PasswordInput} from "../common/password-input";
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
          <Label htmlFor="password">New password (*)</Label>
          <PasswordInput required id="password" name="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm new password (*)</Label>
          <PasswordInput required id="confirmPassword" name="confirmPassword" />
        </div>
        <span className="text-xs">(*) Required field</span>
        <SubmitButton>Reset Password</SubmitButton>
      </form>
    </>
  );
};
ResetPasswordForm.displayName = "ResetPasswordForm";
