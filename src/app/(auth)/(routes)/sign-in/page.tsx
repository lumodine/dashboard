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
import login from "@/actions/auth/login";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export default function AuthSignInPage() {
  const toast = useToast();

  const clientAction = async (formData: FormData) => {
    const response = await login(formData);

    if (!response.success) {
      toast.toast({
        description: response.message
      });
      return;
    }

    redirect("/");
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          Giriş yap
        </CardTitle>
        <CardDescription>
          Hesabınıza giriş yapmak için aşağıdaki bilgileri doldurunuz
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
              name="email"
              type="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">
                Şifre (*)
              </Label>
              <Link href={"/forgot-password"} className="ml-auto inline-block text-sm underline">
                Şifreni mi unuttun?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <span className="text-xs">
            (*) Zorunlu alan
          </span>
          <Button type="submit" className="w-full">
            Giriş yap
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Hesabınız yok mu?{" "}
          <Link href={"/sign-up"} className="underline">
            Kayıt ol
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
