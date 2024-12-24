"use client";

import Link from "next/link";
import {BackButton} from "../../components/back-button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ForgotPasswordForm} from "@/components/auth/forgot-password-form";

export default function AuthForgotPasswordPage() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <BackButton />
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Please enter your email address to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href={"/sign-up"}>
            Sign up
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          Have an account?{" "}
          <Link className="underline" href={"/"}>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
