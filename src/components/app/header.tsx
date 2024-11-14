"use client";

import authService from "@/services/auth.service";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export const Header = () => {
    const handleLogout = async () => {
        await authService.logout();
        redirect("/");
        return;
    }

    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
            <Button onClick={handleLogout}>
                Çıkış yap
            </Button>
        </header>
    );
};
