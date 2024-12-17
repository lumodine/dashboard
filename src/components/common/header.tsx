"use client";

import {redirect} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {LogOut, Menu, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import authService from "@/services/auth.service";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

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
              className="h-full"
              height={50}
              loading="lazy"
              src="https://cdn.lumodine.com/public/logo.jpg?v=1"
              width={50}
            />
            <b className="hidden sm:block">{process.env.NEXT_PUBLIC_APP_NAME}</b>
          </Link>
        </div>
        <div className="hidden md:flex gap-2 items-center justify-center">
          <Link href={"/d/my-account"}>
            <Button variant={"ghost"}>
              <User /> My account
            </Button>
          </Link>
          <Button variant={"destructive"} onClick={handleLogout}>
            Log out <LogOut />
          </Button>
        </div>

        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="p-2" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 flex flex-col gap-2">
              <Link className="w-full" href={"/d/my-account"}>
                <Button className="w-full" variant={"default"}>
                  <User /> My account
                </Button>
              </Link>
              <Button variant={"destructive"} onClick={handleLogout}>
                Log out <LogOut />
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
};
Header.displayName = "Header";
