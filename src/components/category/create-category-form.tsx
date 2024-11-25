"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import createCategory from "@/actions/category/createCategory";

export type CreateCategoryFormProps = {
    tenant: any;
};

export const CreateCategoryForm = ({ tenant }: CreateCategoryFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await createCategory(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }

    return (
        <section className="container my-3">
            <form action={clientAction} className="flex flex-col gap-4">
                {
                    tenant.languages.map((language: any, languageIndex: number) => (
                        <Input
                            key={languageIndex}
                            type="hidden"
                            name="languages"
                            defaultValue={language.language._id}
                        />
                    ))
                }

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label>
                            Ad (*)
                        </Label>
                    </div>
                    <div className="pl-3 mt-2 flex flex-col gap-2">
                        {
                            tenant.languages.map((language: any, languageIndex: number) => (
                                <div key={languageIndex}>
                                    <Label htmlFor="names">
                                        {language.language.name} - {language.language.shortName} (*)
                                    </Label>
                                    <Input
                                        id="names"
                                        type="text"
                                        name="names"
                                        required
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label>
                            Açıklama
                        </Label>
                    </div>
                    <div className="pl-3 mt-2 flex flex-col gap-2">
                        {
                            tenant.languages.map((language: any, languageIndex: number) => (
                                <div key={languageIndex}>
                                    <Label htmlFor="descriptions">
                                        {language.language.name} - {language.language.shortName}
                                    </Label>
                                    <Input
                                        id="descriptions"
                                        type="text"
                                        name="descriptions"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <span className="text-xs">
                    (*) Zorunlu alan
                </span>
                <Button type="submit" className="w-full">
                    <Plus /> Kategori oluştur
                </Button>
            </form>
        </section>
    );
};
CreateCategoryForm.displayName = "CreateCategoryForm";
