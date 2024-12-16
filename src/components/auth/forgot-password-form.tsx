"use client";

import {toast} from "react-toastify";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import forgotPassword from "@/actions/auth/forgotPassword";
import {SubmitButton} from "@/components/common/submit-button";

export const ForgotPasswordForm = () => {
  const clientAction = async (formData: FormData) => {
    const response = await forgotPassword(formData);

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
          <Label htmlFor="email">Email (*)</Label>
          <Input required id="email" name="email" type="email" />
        </div>
        <span className="text-xs">(*) Required field</span>
        <SubmitButton>Reset Password</SubmitButton>
      </form>
    </>
  );
};
ForgotPasswordForm.displayName = "ForgotPasswordForm";
