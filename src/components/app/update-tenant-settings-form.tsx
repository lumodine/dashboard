"use client";

import updateTenantSettings from "@/actions/tenant/updateTenantSettings";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type UpdateTenantSettingsFormProps = {
    tenant: any;
};

export const UpdateTenantSettingsForm = ({ tenant }: UpdateTenantSettingsFormProps) => {
    const toast = useToast();

    const [
        websiteScheme,
        websiteHost
    ] = process.env.NEXT_PUBLIC_QR_MENU_URL!.split("{alias}");

    const clientAction = async (formData: FormData) => {
        const response = await updateTenantSettings(tenant._id, formData);

        if (response.message) {
            toast.toast({
                variant: response.success ? "default" : "destructive",
                description: response.message
            });
        }
    }

    return (
        <form action={clientAction} className="grid gap-4 w-full">
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
                <div className="flex items-center">
                    <Label htmlFor="address">
                        Adres
                    </Label>
                </div>
                <Input
                    id="address"
                    type="text"
                    name="address"
                    defaultValue={tenant.address}
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
            <Button type="submit" className="w-full">
                Ayarları güncelle
            </Button>
        </form>
    );
};
