"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {PasswordInput} from "../common/password-input";
import {Label} from "@/components/ui/label";
import updateUserPassword from "@/actions/auth/updateUserPassword";
import {SubmitButton} from "@/components/common/submit-button";

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
          <Label htmlFor="currentPassword">Current password (*)</Label>
          <PasswordInput required id="currentPassword" name="currentPassword" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New password (*)</Label>
          <PasswordInput required id="newPassword" name="newPassword" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmNewPassword">Confirm new password (*)</Label>
          <PasswordInput required id="confirmNewPassword" name="confirmNewPassword" />
        </div>
        <span className="text-xs">(*) Required field</span>

        <SubmitButton>
          <Save /> Save
        </SubmitButton>
      </form>
    </>
  );
};
UpdateUserPasswordForm.displayName = "UpdateUserPasswordForm";
