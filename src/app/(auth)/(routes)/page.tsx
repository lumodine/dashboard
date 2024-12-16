"use client";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SignInForm} from "@/components/auth/sign-in-form";

export default function AuthSignInPage() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Please fill in the following information to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href={"/sign-up"}>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
