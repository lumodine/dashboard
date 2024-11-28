"use client";

import createTenant from "@/actions/tenant/createTenant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

export type CreateTenantFormProps = {
    languages: any[];
    currencies: any[];
};

export const CreateTenantForm = ({ languages, currencies }: CreateTenantFormProps) => {
    const [
        websiteScheme,
        websiteHost
    ] = process.env.NEXT_PUBLIC_QR_MENU_URL!.split("{alias}");

    const clientAction = async (formData: FormData) => {
        const response = await createTenant(formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }

    return (
        <form action={clientAction} className="flex flex-col gap-4">
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
                        className="rounded-none"
                    />
                    <span className="bg-primary text-white py-1 px-2 rounded-r-lg">
                        {websiteHost}
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="language">
                        Ana dil (*)
                    </Label>
                </div>
                <Select name="language" defaultValue={languages[0]._id}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            languages.map((language: any, languageIndex: number) => (
                                <SelectItem
                                    key={languageIndex}
                                    value={language._id}
                                >
                                    {language.name} ({language.shortName})
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="currency">
                        Ana para birimi (*)
                    </Label>
                </div>
                <Select name="currency" defaultValue={currencies[0]._id}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            currencies.map((currency: any, currencyIndex: number) => (
                                <SelectItem
                                    key={currencyIndex}
                                    value={currency._id}
                                >
                                    {currency.code} ({currency.symbol})
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            <span className="text-xs">
                (*) Zorunlu alan
            </span>
            <Button type="submit" className="w-full">
                <Plus /> İşletmemi oluştur
            </Button>
        </form>
    );
};
CreateTenantForm.displayName = "CreateTenantForm";
