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

export default function AuthForgotPasswordPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          Şifremi unuttum
        </CardTitle>
        <CardDescription>
          Şifrenizi sıfırlayabilmek için aşağıdaki bilgileri doldurunuz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              E-posta (*)
            </Label>
            <Input
              id="email"
              type="email"
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
