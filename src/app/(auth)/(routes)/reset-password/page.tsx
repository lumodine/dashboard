"use client";

import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import resetPassword from "@/actions/auth/resetPassword";

export default function AuthResetPasswordPage() {
  const searchParams = useSearchParams();

  const clientAction = async (formData: FormData) => {
    const t = searchParams.get("t") as string;

    const response = await resetPassword(t, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Şifremi sıfırla</CardTitle>
        <CardDescription>
          Yeni şifrenizi oluşturmak için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Yeni şifre (*)</Label>
            <Input required id="password" name="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Şifreyi onayla (*)</Label>
            <Input required id="confirmPassword" name="confirmPassword" type="password" />
          </div>
          <span className="text-xs">(*) Zorunlu alan</span>
          <Button className="w-full" type="submit">
            Şifremi yenile
          </Button>
        </form>
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
