"use client";

import {useState} from "react";
import {Save} from "lucide-react";
import {toast} from "react-toastify";
import {SubmitButton} from "@/components/common/submit-button";
import {VariantForm} from "@/components/menu/variant-form";
import {Button} from "@/components/ui/button";
import {ITEM_KINDS} from "@/constants/item";
import createProductVariant from "@/actions/productVariant/createProductVariant";

export type CreateProductVariantFormProps = {
  tenant: any;
  itemId: string;
  subItemId: string;
};

export const CreateProductVariantForm = ({
  tenant,
  itemId,
  subItemId,
}: CreateProductVariantFormProps) => {
  const languages = tenant.languages;
  const currencies = tenant.currencies;

  const [items, setItems] = useState<any[]>([]);

  const addVariant = () => {
    const newItems = [...items];

    newItems.push({
      kind: ITEM_KINDS.PRODUCT_VARIANT,
      translations: languages.map((language: any) => ({
        language: language.language._id,
        title: "",
        description: "",
      })),
      prices: currencies.map((currency: any) => ({
        currency: currency.currency._id,
        amount: undefined,
      })),
    });

    setItems(newItems);
  };

  const removeVariant = (variantIndex: number) => {
    const newItems = [...items];

    newItems.splice(variantIndex, 1);
    setItems(newItems);
  };

  const updateVariantTranslation = (
    variantIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newItems = [...items];
    const item = newItems[variantIndex];

    const translationIndex = item.translations.findIndex((t: any) => t.language === languageId);

    if (translationIndex !== -1) {
      item.translations[translationIndex][field] = value;
      setItems(newItems);
    }
  };

  const updateVariantPrice = (variantIndex: number, currencyId: string, amount: string) => {
    const newItems = [...items];
    const item = newItems[variantIndex];

    const priceIndex = item.prices.findIndex((p: any) => p.currency === currencyId);

    if (priceIndex !== -1 && amount !== undefined) {
      item.prices[priceIndex].amount = parseFloat(amount);
      setItems(newItems);
    }
  };

  const clientAction = async () => {
    const response = await createProductVariant(tenant._id, itemId, subItemId, items);

    if (response.success) {
      setItems([]);
    }

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <form action={clientAction} className="space-y-4">
      <div className="space-y-4 mt-4">
        {items.map((variant: any, variantIndex: number) => (
          <VariantForm
            key={variantIndex}
            currencies={currencies}
            languages={languages}
            variant={variant}
            onRemove={() => removeVariant(variantIndex)}
            onUpdatePrice={(currencyId: string, amount: string) =>
              updateVariantPrice(variantIndex, currencyId, amount)
            }
            onUpdateTranslation={(languageId: string, field: keyof any, value: string) =>
              updateVariantTranslation(variantIndex, languageId, field, value)
            }
          />
        ))}

        <Button type="button" variant="outline" onClick={() => addVariant()}>
          Add variant
        </Button>
      </div>

      {items.length > 0 && (
        <div className="space-y-4">
          <SubmitButton>
            <Save /> Save
          </SubmitButton>
        </div>
      )}
    </form>
  );
};
