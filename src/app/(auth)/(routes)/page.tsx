"use client";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SignInForm} from "@/components/auth/sign-in-form";

export default function AuthSignInPage() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Giriş yap</CardTitle>
        <CardDescription>
          Hesabınıza giriş yapmak için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />

        <div className="mt-4 text-center text-sm">
          Hesabınız yok mu?{" "}
          <Link className="underline" href={"/sign-up"}>
            Kayıt ol
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
