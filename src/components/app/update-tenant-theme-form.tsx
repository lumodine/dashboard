"use client";

import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import updateTenantTheme from "@/actions/tenant/updateTenantTheme";
import { cn } from "@/utils/shadcn";

export type UpdateTenantThemeFormProps = {
    tenant: any;
    themes: any[];
};

export const UpdateTenantThemeForm = ({ tenant, themes }: UpdateTenantThemeFormProps) => {
    const toast = useToast();

    const clientAction = async (formData: FormData) => {
        const response = await updateTenantTheme(tenant._id, formData);

        if (response.message) {
            toast.toast({
                variant: response.success ? "default" : "destructive",
                description: response.message
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
                        themes.map((theme, themeIndex) => (
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
                                        <span className="text-primary">
                                            {theme}
                                        </span>
                                    </div>
                                </div>
                            </Label>
                        ))
                    }
                </RadioGroup>
                <Button type="submit" className="w-full">
                    Kaydet
                </Button>
            </form>
        </section>
    );
};
