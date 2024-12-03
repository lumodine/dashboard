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
import resetPassword from "@/actions/auth/resetPassword";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthResetPasswordPage() {
  const searchParams = useSearchParams()

  const clientAction = async (formData: FormData) => {
    const t = searchParams.get("t") as string;
    
    const response = await resetPassword(t, formData);

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
          Şifremi sıfırla
        </CardTitle>
        <CardDescription>
          Yeni şifrenizi oluşturmak için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">
              Yeni şifre (*)
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">
              Şifreyi onayla (*)
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />
          </div>
          <span className="text-xs">
            (*) Zorunlu alan
          </span>
          <Button type="submit" className="w-full">
            Şifremi yenile
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
