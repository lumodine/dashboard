"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import forgotPassword from "@/actions/auth/forgotPassword";
import { toast } from "react-toastify";

export default function AuthForgotPasswordPage() {
  const clientAction = async (formData: FormData) => {
    const response = await forgotPassword(formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  }

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl">
          Şifremi unuttum
        </CardTitle>
        <CardDescription>
          Şifrenizi sıfırlayabilmek için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              E-posta (*)
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
          <span className="text-xs">
            (*) Zorunlu alan
          </span>
          <Button type="submit" className="w-full">
            Şifremi sıfırla
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Hesabınız yok mu?{" "}
          <Link href={"/sign-up"} className="underline">
            Kayıt ol
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          Hesabınız var mı?{" "}
          <Link href={"/sign-in"} className="underline">
            Giriş yap
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
