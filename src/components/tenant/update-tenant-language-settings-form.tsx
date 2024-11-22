"use client";

import updateTenantLanguageSettings from "@/actions/tenant/updateTenantLanguageSettings";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { NotFound } from "@/components/common/error";
import { toast } from "react-toastify";

export type UpdateTenantLanguageSettingsFormProps = {
    languages: any[];
    tenant: any;
};

export const UpdateTenantLanguageSettingsForm = ({
    languages,
    tenant,
}: UpdateTenantLanguageSettingsFormProps) => {
    const _tenantLanguages = languages.filter(language =>
        tenant.languages.some((tenantLanguage: any) => tenantLanguage._id._id === language._id)
    );

    const _defaultLanguageId = tenant.languages
        .find((tenantLanguage: any) => tenantLanguage.isDefault)._id._id
        || _tenantLanguages[0]._id;

    const _defaultLanguage = _tenantLanguages
        .find(tenantLanguage => tenantLanguage._id === _defaultLanguageId);

    const _otherLanguages = _tenantLanguages
        .filter(language => language._id !== _defaultLanguage._id);

    const _addableLanguages = languages
        .filter(language =>
            !_tenantLanguages
                .some(tenantLanguage => tenantLanguage._id === language._id)
        );

    const [defaultLanguage, setDefaultLanguage] = useState<any>(_defaultLanguage);
    const [otherLanguages, setOtherLanguages] = useState<any[]>(_otherLanguages);

    const [addableLanguages, setAddableLanguages] = useState<any[]>(_addableLanguages);
    const [newLanguageId, setNewLanguageId] = useState<string>();

    const clientAction = async (formData: FormData) => {
        const response = await updateTenantLanguageSettings(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
              type: response.success ? "success" : "error",
            });
        }
    }

    const removeLanguage = (language: any) => {
        let tempOtherLanguages = [...otherLanguages];
        tempOtherLanguages = tempOtherLanguages
            .filter(tempOtherLanguage => tempOtherLanguage._id !== language._id);

        setOtherLanguages(tempOtherLanguages);

        let tempAddableLanguages = [...addableLanguages];
        tempAddableLanguages.push(language);

        setAddableLanguages(tempAddableLanguages);
    }

    const addDefaultLanguage = (language: any) => {
        let tempOtherLanguages = [...otherLanguages];
        tempOtherLanguages = tempOtherLanguages
            .filter(tempOtherLanguage => tempOtherLanguage._id !== language._id);

        tempOtherLanguages.push(defaultLanguage);

        setOtherLanguages(tempOtherLanguages);

        setDefaultLanguage(language);
    }

    const addNewLanguage = () => {
        if (!newLanguageId) {
            return;
        }

        const language = addableLanguages
            .find(addableLanguage => addableLanguage._id === newLanguageId);

        let tempAddableLanguages = [...addableLanguages];
        tempAddableLanguages = tempAddableLanguages
            .filter(tempAddableLanguage => tempAddableLanguage._id !== language._id);

        setAddableLanguages(tempAddableLanguages);

        let tempOtherLanguages = [...otherLanguages];
        tempOtherLanguages.push(language);

        setOtherLanguages(tempOtherLanguages);

        setNewLanguageId("");
    }

    return (
        <section className="container my-3">
            <form action={clientAction} className="flex flex-col gap-4">
                <Input
                    type="hidden"
                    name="defaultLanguage"
                    defaultValue={defaultLanguage._id}
                />

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="defaultLanguage">
                            Ana dil
                        </Label>
                    </div>
                    <span>
                        {defaultLanguage.name} ({defaultLanguage.shortName})
                    </span>
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label>
                            Diğer diller
                        </Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            otherLanguages.length === 0 && (
                                <NotFound
                                    title="Diğer dil eklemediniz. Hemen diğer dili ekle."
                                />
                            )
                        }
                        {
                            otherLanguages.map((language: any, languageIndex: number) => (
                                <div
                                    key={languageIndex}
                                    className="flex justify-between items-center gap-3 p-2 border rounded-lg"
                                >
                                    <Input
                                        type="hidden"
                                        name="otherLanguages"
                                        defaultValue={language._id}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <Button
                                            size={"sm"}
                                            variant={"outline"}
                                            type="button"
                                            onClick={() => addDefaultLanguage(language)}
                                        >
                                            Ana dil yap
                                        </Button>
                                        <span>
                                            {language.name} ({language.shortName})
                                        </span>
                                    </div>
                                    <Button
                                        variant={"destructive"}
                                        title="Dili sil"
                                        type="button"
                                        onClick={() => removeLanguage(language)}
                                    >
                                        <Trash size={14} /> Sil
                                    </Button>
                                </div>
                            ))
                        }

                        {
                            addableLanguages.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Select onValueChange={(value) => setNewLanguageId(value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                addableLanguages.map((language: any, languageIndex: number) => (
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
                                    <Button
                                        type="button"
                                        onClick={addNewLanguage}
                                    >
                                        <Plus size={14} /> Dil ekle
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </div>

                <span className="text-xs">
                    (*) Kaydet butonuna basana kadar yaptığınız değişiklikler uygulanmayacaktır! İstediğiniz gibi güncelleme yapabilirsiniz.
                </span>

                <Button type="submit" className="w-full">
                    <Save /> Kaydet
                </Button>
            </form>
        </section>
    );
};
UpdateTenantLanguageSettingsForm.displayName = "UpdateTenantLanguageSettingsForm";
