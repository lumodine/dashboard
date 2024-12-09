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
        <CardTitle className="text-2xl">Şifremi sıfırla</CardTitle>
        <CardDescription>
          Yeni şifrenizi oluşturmak için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />

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
