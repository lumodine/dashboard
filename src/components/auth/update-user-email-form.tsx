"use client";

import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Save } from "lucide-react";
import updateUserEmail from "@/actions/auth/updateUserEmail";

export type UpdateUserEmailFormProps = {
    user: any;
};

export const UpdateUserEmailForm = ({ user }: UpdateUserEmailFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateUserEmail(formData);

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
                    <Label htmlFor="email">
                        E-posta (*)
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={user.email}
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
UpdateUserEmailForm.displayName = "UpdateUserEmailForm";
