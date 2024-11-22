"use client";

import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { NotFound } from "./error";
import updateTenantCurrencySettings from "@/actions/tenant/updateTenantCurrencySettings";

export type UpdateTenantCurrencySettingsFormProps = {
    currencies: any[];
    tenant: any;
};

export const UpdateTenantCurrencySettingsForm = ({
    currencies,
    tenant,
}: UpdateTenantCurrencySettingsFormProps) => {
    const _tenantCurrencies = currencies.filter(currency =>
        tenant.currencies.some(tenantCurrency => tenantCurrency._id._id === currency._id)
    );

    const _defaultCurrencyId = tenant.currencies
        .find(tenantCurrency => tenantCurrency.isDefault)._id._id
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

    const toast = useToast();

    const [defaultCurrency, setDefaultCurrency] = useState<any>(_defaultCurrency);
    const [otherCurrencies, setOtherCurrencies] = useState<any[]>(_otherCurrencies);

    const [addableCurrencies, setAddableCurrencies] = useState<any[]>(_addableCurrencies);
    const [newCurrencyId, setNewCurrencyId] = useState<string>();

    const clientAction = async (formData: FormData) => {
        const response = await updateTenantCurrencySettings(tenant._id, formData);

        if (response.message) {
            toast.toast({
                variant: response.success ? "default" : "destructive",
                description: response.message
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
            <form action={clientAction} className="grid gap-4">
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
                            otherCurrencies.map((currency, currencyIndex) => (
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
                                        title="Para birimini sil"
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
                                    <Button
                                        type="button"
                                        onClick={addNewCurrency}
                                    >
                                        <Plus size={14} /> Para birimi ekle
                                    </Button>
                                    <Select onValueChange={(value) => setNewCurrencyId(value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                addableCurrencies.map((currency, currencyIndex) => (
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
                                </div>
                            )
                        }
                    </div>
                </div>

                <span className="text-xs">
                    (*) Kaydet butonuna basana kadar yaptığınız değişiklikler uygulanmayacaktır! İstediğiniz gibi güncelleme yapabilirsiniz.
                </span>

                <Button type="submit" className="w-full">
                    Kaydet
                </Button>
            </form>
        </section>
    );
};
