"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import updateUserEmail from "@/actions/auth/updateUserEmail";

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
          <Label htmlFor="email">E-posta (*)</Label>
          <Input required defaultValue={user.email} id="email" name="email" type="email" />
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <Button className="w-full" type="submit">
          <Save /> Kaydet
        </Button>
      </form>
    </>
  );
};
UpdateUserEmailForm.displayName = "UpdateUserEmailForm";
