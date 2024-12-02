"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import updateProduct from "@/actions/product/updateProduct";
import { formatDate } from "@/utils/date";

export type UpdateProductFormProps = {
    tenant: any;
    category: any;
    product: any;
};

export const UpdateProductForm = ({ tenant, category, product }: UpdateProductFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateProduct(tenant._id, category._id, product._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }

    return (
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
            {
                tenant.currencies.map((currency: any, currencyIndex: number) => (
                    <Input
                        key={currencyIndex}
                        type="hidden"
                        name="currencies"
                        defaultValue={currency.currency._id}
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
                        tenant.languages.map((language: any, languageIndex: number) => {
                            const item = product.translations
                                .find((translation: any) => translation.language._id === language.language._id);

                            return (
                                <div key={languageIndex}>
                                    <Label htmlFor="names">
                                        {language.language.name} - {language.language.shortName} (*)
                                    </Label>
                                    <Input
                                        id="names"
                                        type="text"
                                        name="names"
                                        defaultValue={item?.name}
                                        required
                                    />
                                </div>
                            );
                        })
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
                        tenant.languages.map((language: any, languageIndex: number) => {
                            const item = product.translations
                                .find((translation: any) => translation.language._id === language.language._id);

                            return (
                                <div key={languageIndex}>
                                    <Label htmlFor="descriptions">
                                        {language.language.name} - {language.language.shortName}
                                    </Label>
                                    <Input
                                        id="descriptions"
                                        type="text"
                                        name="descriptions"
                                        defaultValue={item?.description}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label>
                        Fiyat
                    </Label>
                </div>
                <div className="pl-3 mt-2 flex flex-col gap-2">
                    {
                        tenant.currencies.map((currency: any, currencyIndex: number) => {
                            const item = product.prices
                                .find((price: any) => price.currency._id === currency.currency._id);

                            return (
                                <div key={currencyIndex}>
                                    <Label htmlFor="amounts">
                                        {currency.currency.code} - {currency.currency.symbol}
                                    </Label>
                                    <Input
                                        id="amounts"
                                        type="number"
                                        name="amounts"
                                        defaultValue={item?.amount}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <span className="text-xs">
                (*) Zorunlu alan
            </span>

            <div className="flex flex-col sm:flex-row justify-between gap-1">
                <span className="text-muted-foreground text-xs">
                    <b>Oluşturma tarihi</b>: {formatDate(product.createdAt)}
                </span>
                <span className="text-muted-foreground text-xs">
                    <b>Güncelleme tarihi</b>: {formatDate(product.updatedAt)}
                </span>
            </div>

            <Button type="submit" className="w-full">
                <Save /> Kaydet
            </Button>
        </form>
    );
};
UpdateProductForm.displayName = "UpdateProductForm";
