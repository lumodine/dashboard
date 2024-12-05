"use client";

import Link from "next/link";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import forgotPassword from "@/actions/auth/forgotPassword";

export default function AuthForgotPasswordPage() {
  const clientAction = async (formData: FormData) => {
    const response = await forgotPassword(formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Şifremi unuttum</CardTitle>
        <CardDescription>
          Şifrenizi sıfırlayabilmek için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-posta (*)</Label>
            <Input required id="email" name="email" type="email" />
          </div>
          <span className="text-xs">(*) Zorunlu alan</span>
          <Button className="w-full" type="submit">
            Şifremi sıfırla
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
