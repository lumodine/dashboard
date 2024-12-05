"use client";

import {Save} from "lucide-react";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import updateUserInfo from "@/actions/auth/updateUserInfo";

export type UpdateUserInfoFormProps = {
  user: any;
};

export const UpdateUserInfoForm = ({user}: UpdateUserInfoFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await updateUserInfo(formData);

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
          <Label htmlFor="name">Ad (*)</Label>
          <Input required defaultValue={user.name} id="name" name="name" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="surname">Soyad (*)</Label>
          <Input required defaultValue={user.surname} id="surname" name="surname" type="text" />
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <Button className="w-full" type="submit">
          <Save /> Kaydet
        </Button>
      </form>
    </>
  );
};
UpdateUserInfoForm.displayName = "UpdateUserInfoForm";
