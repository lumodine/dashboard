"use client";

import updateTenantSettings from "@/actions/tenant/updateTenantSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import { formatDate } from "@/utils/date";

export type UpdateTenantSettingsFormProps = {
    tenant: any;
};

export const UpdateTenantSettingsForm = ({ tenant }: UpdateTenantSettingsFormProps) => {
    const [
        websiteScheme,
        websiteHost
    ] = process.env.NEXT_PUBLIC_QR_MENU_URL!.split("{alias}");

    const clientAction = async (formData: FormData) => {
        const response = await updateTenantSettings(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
              type: response.success ? "success" : "error",
            });
        }
    }

    return (
        <form action={clientAction} className="flex flex-col gap-4 w-full">
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="name">
                        Adı (*)
                    </Label>
                </div>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    required
                    defaultValue={tenant.name}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="alias">
                    Web adresi (*)
                </Label>
                <div className="flex">
                    <span className="bg-primary text-white py-1 px-2 rounded-l-lg">
                        {websiteScheme}
                    </span>
                    <Input
                        id="alias"
                        type="text"
                        name="alias"
                        required
                        defaultValue={tenant.alias}
                        className="rounded-none"
                    />
                    <span className="bg-primary text-white py-1 px-2 rounded-r-lg">
                        {websiteHost}
                    </span>
                </div>
            </div>
            <span className="text-xs">
                (*) Zorunlu alan
            </span>
            <div className="flex flex-col sm:flex-row justify-between gap-1">
                <span className="text-muted-foreground text-xs">
                    <b>Oluşturma tarihi</b>: {formatDate(tenant.createdAt)}
                </span>
                <span className="text-muted-foreground text-xs">
                    <b>Güncelleme tarihi</b>: {formatDate(tenant.updatedAt)}
                </span>
            </div>
            <Button type="submit" className="w-full">
                <Save /> Kaydet
            </Button>
        </form>
    );
};
UpdateTenantSettingsForm.displayName = "UpdateTenantSettingsForm";
