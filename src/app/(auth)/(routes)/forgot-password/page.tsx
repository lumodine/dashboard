"use client";

import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ForgotPasswordForm} from "@/components/auth/forgot-password-form";

export default function AuthForgotPasswordPage() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Şifremi unuttum</CardTitle>
        <CardDescription>
          Şifrenizi sıfırlayabilmek için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />

        <div className="mt-4 text-center text-sm">
          Hesabınız yok mu?{" "}
          <Link className="underline" href={"/sign-up"}>
            Kayıt ol
          </Link>
        </div>
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
