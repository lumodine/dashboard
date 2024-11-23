"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import updateTenantTheme from "@/actions/tenant/updateTenantTheme";
import { toast } from "react-toastify";
import { Save } from "lucide-react";

export type UpdateTenantThemeFormProps = {
    tenant: any;
    themes: any[];
};

export const UpdateTenantThemeForm = ({ tenant, themes }: UpdateTenantThemeFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateTenantTheme(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
              type: response.success ? "success" : "error",
            });
        }
    }

    return (
        <section className="container my-3">
            <form action={clientAction} className="flex flex-col gap-4">
                <RadioGroup
                    name="theme"
                    defaultValue={tenant.theme}
                    className="flex items-center justify-center flex-wrap gap-2"
                >
                    {
                        themes.map((theme: any, themeIndex: number) => (
                            <Label
                                key={themeIndex}
                                htmlFor={theme}
                                className="cursor-pointer hover:scale-95"
                            >
                                <div className={`flex flex-col items-center justify-center gap-3 bg-gray-100 rounded-lg p-4 theme-${theme}`}>
                                    <div className="p-6 rounded-full bg-primary w-10 h-10"></div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem
                                            value={theme}
                                            id={theme}
                                        />
                                    </div>
                                </div>
                            </Label>
                        ))
                    }
                </RadioGroup>
                <Button type="submit" className="w-full">
                    <Save /> Kaydet
                </Button>
            </form>
        </section>
    );
};
UpdateTenantThemeForm.displayName = "UpdateTenantThemeForm";
