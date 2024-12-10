"use client";

import {toast} from "react-toastify";
import Link from "next/link";
import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import login from "@/actions/auth/login";

export function SubmitButton() {
  const {pending} = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      Giriş yap {pending && <LoaderCircle className="animate-spin" />}
    </Button>
  );
}

export const SignInForm = () => {
  const clientAction = async (formData: FormData) => {
    const response = await login(formData);

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
          <div className="flex items-center">
            <Label htmlFor="password">Şifre (*)</Label>
            <Link className="ml-auto inline-block text-sm underline" href={"/forgot-password"}>
              Şifreni mi unuttun?
            </Link>
          </div>
          <Input required id="password" name="password" type="password" />
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <SubmitButton />
      </form>
    </>
  );
};
SignInForm.displayName = "SignInForm";
