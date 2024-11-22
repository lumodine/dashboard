"use client";

import authService from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export const Header = () => {
    const handleLogout = async () => {
        await authService.logout();
        redirect("/");
        return;
    }

    return (
        <header className="flex w-full shrink-0 items-center py-4">
            <nav className="container flex items-center justify-between overflow-hidden">
                <div>
                    <Link
                        href={"/d"}
                        className="flex gap-2 items-center justify-center"
                    >
                        <Image
                            src="https://picsum.photos/300/300"
                            alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`}
                            loading="lazy"
                            width={50}
                            height={50}
                            className="rounded-full h-full"
                        />
                        <b>
                            {process.env.NEXT_PUBLIC_APP_NAME}
                        </b>
                    </Link>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <Link href={"/d/my-account"}>
                        <Button variant={"ghost"}>
                            <User /> Hesabım
                        </Button>
                    </Link>
                    <Button
                        variant={"destructive"}
                        onClick={handleLogout}
                    >
                        Çıkış yap <LogOut />
                    </Button>
                </div>
            </nav>
        </header>
    );
};
Header.displayName = "Header";
