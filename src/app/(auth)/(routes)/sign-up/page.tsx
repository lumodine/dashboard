"use client";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SignUpForm} from "@/components/auth/sign-up-form";

export default function AuthSignUpPage() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Please fill in the following information to sign up</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />

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
