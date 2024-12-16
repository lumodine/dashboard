"use client";

import {toast} from "react-toastify";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import login from "@/actions/auth/login";
import {SubmitButton} from "@/components/common/submit-button";

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
          <Label htmlFor="email">Email (*)</Label>
          <Input required id="email" name="email" type="email" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password (*)</Label>
            <Link className="ml-auto inline-block text-sm underline" href={"/forgot-password"}>
              Forgot password?
            </Link>
          </div>
          <Input required id="password" name="password" type="password" />
        </div>
        <span className="text-xs">(*) Required field</span>
        <SubmitButton>Sign in</SubmitButton>
      </form>
    </>
  );
};
SignInForm.displayName = "SignInForm";
