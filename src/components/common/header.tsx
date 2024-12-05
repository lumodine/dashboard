"use client";

import {redirect} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {LogOut, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import authService from "@/services/auth.service";

export const Header = () => {
  const handleLogout = async () => {
    await authService.logout();
    redirect("/");

    return;
  };

  return (
    <header className="flex w-full shrink-0 items-center py-4">
      <nav className="container flex items-center justify-between overflow-hidden">
        <div>
          <Link className="flex gap-2 items-center justify-center" href={"/d"}>
            <Image
              alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`}
              className="rounded-full h-full"
              height={50}
              loading="lazy"
              src="https://cdn.lumodine.com/public/logo.jpg"
              width={50}
            />
            <b>{process.env.NEXT_PUBLIC_APP_NAME}</b>
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Link href={"/d/my-account"}>
            <Button variant={"ghost"}>
              <User /> Hesabım
            </Button>
          </Link>
          <Button variant={"destructive"} onClick={handleLogout}>
            Çıkış yap <LogOut />
          </Button>
        </div>
      </nav>
    </header>
  );
};
Header.displayName = "Header";
