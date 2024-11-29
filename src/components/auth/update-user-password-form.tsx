"use client";

import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import updateUserPassword from "@/actions/auth/updateUserPassword";

export type UpdateUserPasswordFormProps = {
    user: any;
};

export const UpdateUserPasswordForm = ({ user }: UpdateUserPasswordFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateUserPassword(formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }

    return (
        <>
            <form action={clientAction} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="currentPassword">
                        Var olan şifre (*)
                    </Label>
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="newPassword">
                        Yeni şifre (*)
                    </Label>
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmNewPassword">
                        Şifreyi onayla (*)
                    </Label>
                    <Input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        required
                    />
                </div>
                <span className="text-xs">
                    (*) Zorunlu alan
                </span>
                <Button type="submit" className="w-full">
                    <Save /> Kaydet
                </Button>
            </form>
        </>
    );
};
UpdateUserPasswordForm.displayName = "UpdateUserPasswordForm";
