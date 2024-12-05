"use client";

import Link from "next/link";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import login from "@/actions/auth/login";

export default function AuthSignInPage() {
  const clientAction = async (formData: FormData) => {
    const response = await login(formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Giriş yap</CardTitle>
        <CardDescription>
          Hesabınıza giriş yapmak için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-posta (*)</Label>
            <Input required id="email" name="email" type="email" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Şifre (*)</Label>
              <Link className="ml-auto inline-block text-sm underline" href={"/forgot-password"}>
                Şifreni mi unuttun?
              </Link>
            </div>
            <Input required id="password" name="password" type="password" />
          </div>
          <span className="text-xs">(*) Zorunlu alan</span>
          <Button className="w-full" type="submit">
            Giriş yap
          </Button>
        </form>
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
