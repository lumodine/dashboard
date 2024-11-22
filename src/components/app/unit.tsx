"use client";

import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import updateUnit from "@/actions/unit/updateUnit";
import removeUnit from "@/actions/unit/removeUnit";

export type UnitItemProps = {
    unit: any;
    tenant: any;
};

export const UnitItem = ({ unit, tenant }: UnitItemProps) => {
    const toast = useToast();

    const clientAction = async (formData: FormData) => {
        const response = await updateUnit(tenant._id, unit._id, formData);

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
                    {tenant.languages.map((language, languageIndex) => {
                        const data = unit.translations.find(unitTranslation => unitTranslation.languageId._id === language._id._id);

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
                    Birimi güncelle
                </Button>
                <Button type="button" onClick={() => removeUnit(tenant._id, unit._id)}>
                    Birimi sil
                </Button>
            </div>
        </form>
    );
};

export type UnitListProps = {
    units: any[];
    tenant: any;
};

export const UnitList = ({ units, tenant }: UnitListProps) => {
    const count = units?.length || 0;
    const hasUnits = count > 0;

    return (
        <div className="flex flex-col gap-2">
            {hasUnits && units.map((unit, unitIndex) => (
                <UnitItem
                    key={unitIndex}
                    unit={unit}
                    tenant={tenant}
                />
            ))}
        </div>
    );
};
