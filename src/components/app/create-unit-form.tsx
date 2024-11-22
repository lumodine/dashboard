"use client";

import createUnit from "@/actions/unit/createUnit";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type CreateUnitFormProps = {
    tenant: any;
};

export const CreateUnitForm = ({ tenant }: CreateUnitFormProps) => {
    const toast = useToast();

    const clientAction = async (formData: FormData) => {
        const response = await createUnit(tenant._id, formData);

        if (response.message) {
            toast.toast({
                variant: response.success ? "default" : "destructive",
                description: response.message
            });
        }
    }

    return (
        <form action={clientAction} className="flex flex-col gap-4 w-full">
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label>
                        Adı (*)
                    </Label>
                </div>
                <div className="pl-3 mt-2 flex flex-col gap-2">
                    {tenant.languages.map((language, languageIndex) => (
                        <div key={languageIndex}>
                            <Input
                                type="hidden"
                                name="languageIds"
                                defaultValue={language._id._id}
                            />
                            <Label htmlFor="names">
                                {language._id.name} - {language._id.shortName} (*)
                            </Label>
                            <Input
                                id="names"
                                type="text"
                                name="names"
                                required
                            />
                        </div>
                    ))}
                </div>
            </div>
            <span className="text-xs">
                (*) Zorunlu alan
            </span>
            <Button type="submit" className="w-full">
                Birimi oluştur
            </Button>
        </form>
    );
};
