"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateUserEmail from "@/actions/auth/updateUserEmail";
import {SubmitButton} from "@/components/common/submit-button";

export type UpdateUserEmailFormProps = {
  user: any;
};

export const UpdateUserEmailForm = ({user}: UpdateUserEmailFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await updateUserEmail(formData);

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
          <Input required defaultValue={user.email} id="email" name="email" type="email" />
        </div>
        <span className="text-xs">(*) Required field</span>

        <SubmitButton>
          <Save /> Save
        </SubmitButton>
      </form>
    </>
  );
};
UpdateUserEmailForm.displayName = "UpdateUserEmailForm";
