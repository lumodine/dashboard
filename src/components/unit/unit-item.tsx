"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateUnit from "@/actions/unit/updateUnit";
import removeUnit from "@/actions/unit/removeUnit";
import { toast } from "react-toastify";
import { Plus, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

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
        <form action={clientAction} className="flex flex-col gap-4 w-full bg-gray-50 p-4 rounded-lg">
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label>
                        Adı (*)
                    </Label>
                </div>
                <div className="pl-3 mt-2 flex flex-col gap-2">
                    {tenant.languages.map((language: any, languageIndex: number) => {
                        const data = unit.translations.find((unitTranslation: any) => unitTranslation.languageId._id === language.language._id);

                        return (
                            <div key={languageIndex}>
                                <Input
                                    type="hidden"
                                    name="languageIds"
                                    defaultValue={language.language._id}
                                />
                                <Label htmlFor="names">
                                    {language.language.name} - {language.language.shortName} (*)
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant={"destructive"}
                            type="button"
                        >
                            <Trash /> Birimi sil
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Birimi sil
                            </DialogTitle>
                        </DialogHeader>
                        <p>
                            <b>ÖNEMLİ</b>! birimi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine de bunu yapmak istiyor musunuz?
                        </p>
                        <DialogClose asChild>
                            <Button
                                variant={"destructive"}
                                type="button"
                                onClick={() => handleRemoveUnit(unit._id)}
                            >
                                <Trash /> Birimi sil
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>
        </form>
    );
};
UnitItem.displayName = "UnitItem";
