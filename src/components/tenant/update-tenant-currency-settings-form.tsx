"use client";

import {Plus, Save, Trash} from "lucide-react";
import {useState} from "react";
import {toast} from "react-toastify";
import {SubmitButton} from "@/components/common/submit-button";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {NotFound} from "@/components/common/error";
import updateTenantCurrencySettings from "@/actions/tenant/updateTenantCurrencySettings";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";

export type UpdateTenantCurrencySettingsFormProps = {
  currencies: any[];
  tenant: any;
};

export const UpdateTenantCurrencySettingsForm = ({
  currencies,
  tenant,
}: UpdateTenantCurrencySettingsFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const _tenantCurrencies = currencies.filter((currency) =>
    tenant.currencies.some((tenantCurrency: any) => tenantCurrency.currency._id === currency._id),
  );

  const _defaultCurrencyId =
    tenant.currencies.find((tenantCurrency: any) => tenantCurrency.isDefault).currency._id ||
    _tenantCurrencies[0]._id;

  const _defaultCurrency = _tenantCurrencies.find(
    (tenantCurrency) => tenantCurrency._id === _defaultCurrencyId,
  );

  const _otherCurrencies = _tenantCurrencies.filter(
    (currency) => currency._id !== _defaultCurrency._id,
  );

  const _addableCurrencies = currencies.filter(
    (currency) => !_tenantCurrencies.some((tenantCurrency) => tenantCurrency._id === currency._id),
  );

  const [defaultCurrency, setDefaultCurrency] = useState<any>(_defaultCurrency);
  const [otherCurrencies, setOtherCurrencies] = useState<any[]>(_otherCurrencies);

  const [addableCurrencies, setAddableCurrencies] = useState<any[]>(_addableCurrencies);
  const [newCurrencyId, setNewCurrencyId] = useState<string>();

  const clientAction = async () => {
    const response = await updateTenantCurrencySettings(
      tenant._id,
      defaultCurrency,
      otherCurrencies,
    );

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const removeCurrency = (currency: any) => {
    let tempOtherCurrencies = [...otherCurrencies];

    tempOtherCurrencies = tempOtherCurrencies.filter(
      (tempOtherCurrency) => tempOtherCurrency._id !== currency._id,
    );

    setOtherCurrencies(tempOtherCurrencies);

    let tempAddableCurrencies = [...addableCurrencies];

    tempAddableCurrencies.push(currency);

    setAddableCurrencies(tempAddableCurrencies);
  };

  const addDefaultCurrency = (currency: any) => {
    let tempOtherCurrencies = [...otherCurrencies];

    tempOtherCurrencies = tempOtherCurrencies.filter(
      (tempOtherCurrency) => tempOtherCurrency._id !== currency._id,
    );

    tempOtherCurrencies.push(defaultCurrency);

    setOtherCurrencies(tempOtherCurrencies);

    setDefaultCurrency(currency);
  };

  const addNewCurrency = () => {
    if (!newCurrencyId) {
      return;
    }

    const currency = addableCurrencies.find(
      (addableCurrency) => addableCurrency._id === newCurrencyId,
    );

    let tempAddableCurrencies = [...addableCurrencies];

    tempAddableCurrencies = tempAddableCurrencies.filter(
      (tempAddableCurrency) => tempAddableCurrency._id !== currency._id,
    );

    setAddableCurrencies(tempAddableCurrencies);

    let tempOtherCurrencies = [...otherCurrencies];

    tempOtherCurrencies.push(currency);

    setOtherCurrencies(tempOtherCurrencies);

    setNewCurrencyId("");
  };

  return (
    <form action={clientAction} className="w-full flex flex-col gap-4">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="defaultCurrency">Default currency</Label>
        </div>
        <span>
          {defaultCurrency.code} ({defaultCurrency.symbol})
        </span>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Other currencies</Label>
        </div>
        <div className="flex flex-col gap-2">
          {otherCurrencies.length === 0 && (
            <NotFound title="You have not added any other currencies. Add one now." />
          )}

          {addableCurrencies.length > 0 && (
            <div className="flex items-center gap-2">
              <Button type="button" onClick={addNewCurrency}>
                <Plus size={14} />
              </Button>
              <Select onValueChange={(value) => setNewCurrencyId(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {addableCurrencies.map((currency: any, currencyIndex: number) => (
                    <SelectItem key={currencyIndex} value={currency._id}>
                      {currency.code} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {otherCurrencies.map((currency: any, currencyIndex: number) => (
            <div
              key={currencyIndex}
              className="flex justify-between items-center gap-3 p-2 border rounded-lg"
            >
              <div className="flex gap-2 items-center">
                <Button
                  size={"sm"}
                  type="button"
                  variant={"outline"}
                  onClick={() => addDefaultCurrency(currency)}
                >
                  Make default
                </Button>
                <span>
                  {currency.code} ({currency.symbol})
                </span>
              </div>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => removeCurrency(currency)}
              >
                <Trash size={14} />
              </Button>
            </div>
          ))}

          <SubmitButton>
            <Save /> Save
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};
UpdateTenantCurrencySettingsForm.displayName = "UpdateTenantCurrencySettingsForm";
