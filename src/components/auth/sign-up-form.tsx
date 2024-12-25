"use client";

import {toast} from "react-toastify";
import Link from "next/link";
import {PasswordInput} from "@/components/common/password-input";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import register from "@/actions/auth/register";
import {SubmitButton} from "@/components/common/submit-button";

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
          <Label htmlFor="email">Email (*)</Label>
          <Input required id="email" name="email" type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name (*)</Label>
          <Input required id="name" name="name" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="surname">Surname (*)</Label>
          <Input required id="surname" name="surname" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password (*)</Label>
          <PasswordInput required id="password" name="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm password (*)</Label>
          <PasswordInput required id="confirmPassword" name="confirmPassword" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox required id="terms" />
          <Label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="terms"
          >
            Accept{" "}
            <Link
              className="underline hover:no-underline"
              href={`${process.env.NEXT_PUBLIC_LANDING_URL}/terms-and-conditions`}
              target="_blank"
            >
              terms and conditions
            </Link>{" "}
            (*)
          </Label>
        </div>
        <span className="text-xs">(*) Required field</span>
        <SubmitButton>Sign up</SubmitButton>
      </form>
    </>
  );
};
SignUpForm.displayName = "SignUpForm";
