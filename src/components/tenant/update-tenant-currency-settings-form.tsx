"use client";

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
import updateTenantCurrencySettings from "@/actions/tenant/updateTenantCurrencySettings";
import { toast } from "react-toastify";

export type UpdateTenantCurrencySettingsFormProps = {
    currencies: any[];
    tenant: any;
};

export const UpdateTenantCurrencySettingsForm = ({
    currencies,
    tenant,
}: UpdateTenantCurrencySettingsFormProps) => {
    const _tenantCurrencies = currencies.filter(currency =>
        tenant.currencies.some((tenantCurrency: any) => tenantCurrency._id._id === currency._id)
    );

    const _defaultCurrencyId = tenant.currencies
        .find((tenantCurrency: any) => tenantCurrency.isDefault)._id._id
        || _tenantCurrencies[0]._id;

    const _defaultCurrency = _tenantCurrencies
        .find(tenantCurrency => tenantCurrency._id === _defaultCurrencyId);

    const _otherCurrencies = _tenantCurrencies
        .filter(currency => currency._id !== _defaultCurrency._id);

    const _addableCurrencies = currencies
        .filter(currency =>
            !_tenantCurrencies
                .some(tenantCurrency => tenantCurrency._id === currency._id)
        );

    const [defaultCurrency, setDefaultCurrency] = useState<any>(_defaultCurrency);
    const [otherCurrencies, setOtherCurrencies] = useState<any[]>(_otherCurrencies);

    const [addableCurrencies, setAddableCurrencies] = useState<any[]>(_addableCurrencies);
    const [newCurrencyId, setNewCurrencyId] = useState<string>();

    const clientAction = async (formData: FormData) => {
        const response = await updateTenantCurrencySettings(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
              type: response.success ? "success" : "error",
            });
        }
    }

    const removeCurrency = (currency: any) => {
        let tempOtherCurrencies = [...otherCurrencies];
        tempOtherCurrencies = tempOtherCurrencies
            .filter(tempOtherCurrency => tempOtherCurrency._id !== currency._id);

        setOtherCurrencies(tempOtherCurrencies);

        let tempAddableCurrencies = [...addableCurrencies];
        tempAddableCurrencies.push(currency);

        setAddableCurrencies(tempAddableCurrencies);
    }

    const addDefaultCurrency = (currency: any) => {
        let tempOtherCurrencies = [...otherCurrencies];
        tempOtherCurrencies = tempOtherCurrencies
            .filter(tempOtherCurrency => tempOtherCurrency._id !== currency._id);

        tempOtherCurrencies.push(defaultCurrency);

        setOtherCurrencies(tempOtherCurrencies);

        setDefaultCurrency(currency);
    }

    const addNewCurrency = () => {
        if (!newCurrencyId) {
            return;
        }

        const currency = addableCurrencies
            .find(addableCurrency => addableCurrency._id === newCurrencyId);

        let tempAddableCurrencies = [...addableCurrencies];
        tempAddableCurrencies = tempAddableCurrencies
            .filter(tempAddableCurrency => tempAddableCurrency._id !== currency._id);

        setAddableCurrencies(tempAddableCurrencies);

        let tempOtherCurrencies = [...otherCurrencies];
        tempOtherCurrencies.push(currency);

        setOtherCurrencies(tempOtherCurrencies);

        setNewCurrencyId("");
    }

    return (
        <section className="container my-3">
            <form action={clientAction} className="flex flex-col gap-4">
                <Input
                    type="hidden"
                    name="defaultCurrency"
                    defaultValue={defaultCurrency._id}
                />

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="defaultCurrency">
                            Ana para birimi
                        </Label>
                    </div>
                    <span>
                        {defaultCurrency.code} ({defaultCurrency.symbol})
                    </span>
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label>
                            Diğer para birimleri
                        </Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            otherCurrencies.length === 0 && (
                                <NotFound
                                    title="Diğer para birimi eklemediniz. Hemen diğer para birimini ekle."
                                />
                            )
                        }
                        {
                            otherCurrencies.map((currency: any, currencyIndex: number) => (
                                <div
                                    key={currencyIndex}
                                    className="flex justify-between items-center gap-3 p-2 border rounded-lg"
                                >
                                    <Input
                                        type="hidden"
                                        name="otherCurrencies"
                                        defaultValue={currency._id}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <Button
                                            size={"sm"}
                                            variant={"outline"}
                                            type="button"
                                            onClick={() => addDefaultCurrency(currency)}
                                        >
                                            Ana para birimi yap
                                        </Button>
                                        <span>
                                            {currency.code} ({currency.symbol})
                                        </span>
                                    </div>
                                    <Button
                                        variant={"destructive"}
                                        type="button"
                                        onClick={() => removeCurrency(currency)}
                                    >
                                        <Trash size={14} /> Sil
                                    </Button>
                                </div>
                            ))
                        }

                        {
                            addableCurrencies.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Select onValueChange={(value) => setNewCurrencyId(value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                addableCurrencies.map((currency: any, currencyIndex: number) => (
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
                                    <Button
                                        type="button"
                                        onClick={addNewCurrency}
                                    >
                                        <Plus size={14} /> Para birimi ekle
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
UpdateTenantCurrencySettingsForm.displayName = "UpdateTenantCurrencySettingsForm";
