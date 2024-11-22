"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateUnit from "@/actions/unit/updateUnit";
import removeUnit from "@/actions/unit/removeUnit";
import { toast } from "react-toastify";
import { Plus, Trash } from "lucide-react";

export type UnitItemProps = {
    unit: any;
    tenant: any;
};

export const UnitItem = ({ unit, tenant }: UnitItemProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateUnit(tenant._id, unit._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }
    const handleRemoveUnit = async (unitId: string) => {
        const response = await removeUnit(tenant._id, unit._id);

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
                    <Label>
                        Adı (*)
                    </Label>
                </div>
                <div className="pl-3 mt-2 flex flex-col gap-2">
                    {tenant.languages.map((language: any, languageIndex: number) => {
                        const data = unit.translations.find((unitTranslation: any) => unitTranslation.languageId._id === language._id._id);

                        return (
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
                                    defaultValue={data?.name}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <span className="text-xs">
                (*) Zorunlu alan
            </span>
            <div className="flex gap-2">
                <Button type="submit" className="w-full flex-1">
                    <Plus /> Birimi güncelle
                </Button>
                <Button
                    variant={"destructive"}
                    type="button"
                    onClick={() => handleRemoveUnit(unit._id)}
                >
                    <Trash /> Birimi sil
                </Button>
            </div>
        </form>
    );
};
UnitItem.displayName = "UnitItem";
