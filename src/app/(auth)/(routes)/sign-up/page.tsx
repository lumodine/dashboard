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
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthSignUpPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          Kayıt ol
        </CardTitle>
        <CardDescription>
          Kayıt olmak için aşağıdaki bilgileri doldurunuz
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
          <div className="grid gap-2">
            <Label htmlFor="name">
              Ad (*)
            </Label>
            <Input
              id="name"
              type="text"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="surname">
              Soyad (*)
            </Label>
            <Input
              id="surname"
              type="text"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">
              Şifre (*)
            </Label>
            <Input
              id="password"
              type="password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">
              Şifre Tekrar (*)
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hüküm ve koşulları kabul edin (*)
            </Label>
          </div>
          <span className="text-xs">
            (*) Zorunlu alan
          </span>
          <Button type="submit" className="w-full">
            Kayıt ol
          </Button>
        </form>
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
