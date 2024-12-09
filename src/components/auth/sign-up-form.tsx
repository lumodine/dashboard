"use client";

import {toast} from "react-toastify";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import register from "@/actions/auth/register";

export const SignUpForm = () => {
  const clientAction = async (formData: FormData) => {
    const response = await register(formData);

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
          <Input required id="email" name="email" type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Ad (*)</Label>
          <Input required id="name" name="name" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="surname">Soyad (*)</Label>
          <Input required id="surname" name="surname" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Şifre (*)</Label>
          <Input required id="password" name="password" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Şifreyi onayla (*)</Label>
          <Input required id="confirmPassword" name="confirmPassword" type="password" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox required id="terms" />
          <Label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="terms"
          >
            Hüküm ve koşulları kabul edin (*)
          </Label>
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <Button className="w-full" type="submit">
          Kayıt ol
        </Button>
      </form>
    </>
  );
};
SignUpForm.displayName = "SignUpForm";
