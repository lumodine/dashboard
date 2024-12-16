"use client";

import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ResetPasswordForm} from "@/components/auth/reset-password-form";

export default function AuthResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t") as string;

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Please enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />

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
