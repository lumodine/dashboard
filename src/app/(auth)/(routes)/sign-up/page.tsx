"use client";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SignUpForm} from "@/components/auth/sign-up-form";

export default function AuthSignUpPage() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Kayıt ol</CardTitle>
        <CardDescription>Kayıt olmak için aşağıdaki bilgileri doldurunuz</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />

        <div className="mt-4 text-center text-sm">
          Hesabınız var mı?{" "}
          <Link className="underline" href={"/sign-in"}>
            Giriş yap
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
