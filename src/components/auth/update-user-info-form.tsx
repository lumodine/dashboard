"use client";

import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import updateUserInfo from "@/actions/auth/updateUserInfo";

export type UpdateUserInfoFormProps = {
    user: any;
};

export const UpdateUserInfoForm = ({ user }: UpdateUserInfoFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateUserInfo(formData);

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
                    <Label htmlFor="name">
                        Ad (*)
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={user.name}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="surname">
                        Soyad (*)
                    </Label>
                    <Input
                        id="surname"
                        name="surname"
                        type="text"
                        defaultValue={user.surname}
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
UpdateUserInfoForm.displayName = "UpdateUserInfoForm";
