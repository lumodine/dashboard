"use client";

import {useState} from "react";
import {Save} from "lucide-react";
import {toast} from "react-toastify";
import {SubmitButton} from "@/components/common/submit-button";
import {ItemForm} from "@/components/menu/item-form";
import {VariantForm} from "@/components/menu/variant-form";
import {Button} from "@/components/ui/button";
import {ITEM_KINDS} from "@/constants/item";
import createSubMenu from "@/actions/menu/createSubMenu";

export type CreateSubMenuFormProps = {
  tenant: any;
  itemId: string;
};

export const CreateSubMenuForm = ({tenant, itemId}: CreateSubMenuFormProps) => {
  const languages = tenant.languages;
  const currencies = tenant.currencies;

  const [items, setItems] = useState<any[]>([]);

  const addItem = (kind: string) => {
    const newItems = [...items];
    const newItem: any = {
      kind,
      translations: languages.map((language: any) => ({
        language: language.language._id,
        title: "",
        description: "",
      })),
    };

    if (kind === ITEM_KINDS.PRODUCT) {
      newItem.prices = currencies.map((currency: any) => ({
        currency: currency.currency._id,
        amount: undefined,
      }));
      newItem.items = [];
    }

    newItems.push(newItem);
    setItems(newItems);
  };

  const addVariant = (itemIndex: number) => {
    const newItems = [...items];
    const item = newItems[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.items) {
      item.items.push({
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
    }
  };

  const removeVariant = (itemIndex: number, variantIndex: number) => {
    const newItems = [...items];
    const item = newItems[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.items) {
      item.items.splice(variantIndex, 1);
      setItems(newItems);
    }
  };

  const updateVariantTranslation = (
    itemIndex: number,
    variantIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.items) {
      const variant = item.items[variantIndex];
      const translationIndex = variant.translations.findIndex(
        (t: any) => t.language === languageId,
      );

      if (translationIndex !== -1) {
        variant.translations[translationIndex][field] = value;
        setItems(newItems);
      }
    }
  };

  const updateVariantPrice = (
    itemIndex: number,
    variantIndex: number,
    currencyId: string,
    amount: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.items) {
      const variant = item.items[variantIndex];
      const priceIndex = variant.prices.findIndex((p: any) => p.currency === currencyId);

      if (priceIndex !== -1 && amount !== undefined) {
        variant.prices[priceIndex].amount = parseFloat(amount);
        setItems(newItems);
      }
    }
  };

  const removeSubItem = (itemIndex: number) => {
    const newItems = [...items];

    newItems.splice(itemIndex, 1);
    setItems(newItems);
  };

  const updateSubItemTranslation = (
    itemIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex];
    const translationIndex = item.translations.findIndex((t: any) => t.language === languageId);

    if (translationIndex !== -1) {
      item.translations[translationIndex][field] = value;
      setItems(newItems);
    }
  };

  const updatePrice = (itemIndex: number, currencyId: string, amount: string) => {
    const newItems = [...items];
    const item = newItems[itemIndex];

    if (item.prices) {
      const priceIndex = item.prices.findIndex((p: any) => p.currency === currencyId);

      if (priceIndex !== -1 && amount !== undefined) {
        item.prices[priceIndex].amount = parseFloat(amount);
        setItems(newItems);
      }
    }
  };

  const clientAction = async () => {
    const response = await createSubMenu(tenant._id, itemId, items);

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
      {items.map((item: any, itemIndex: number) => (
        <div key={itemIndex} className="relative">
          <ItemForm
            key={itemIndex}
            currencies={currencies}
            item={item}
            languages={languages}
            onRemove={() => removeSubItem(itemIndex)}
            onUpdatePrice={(currencyId: string, amount: string) =>
              updatePrice(itemIndex, currencyId, amount)
            }
            onUpdateTranslation={(languageId: string, field: keyof any, value: string) =>
              updateSubItemTranslation(itemIndex, languageId, field, value)
            }
          >
            {item.kind === ITEM_KINDS.PRODUCT && item.items && (
              <div className="space-y-4 mt-4">
                {item.items.map((variant: any, variantIndex: number) => (
                  <VariantForm
                    key={itemIndex + "-" + variantIndex}
                    currencies={currencies}
                    languages={languages}
                    variant={variant}
                    onRemove={() => removeVariant(itemIndex, variantIndex)}
                    onUpdatePrice={(currencyId: string, amount: string) =>
                      updateVariantPrice(itemIndex, variantIndex, currencyId, amount)
                    }
                    onUpdateTranslation={(languageId: string, field: keyof any, value: string) =>
                      updateVariantTranslation(itemIndex, variantIndex, languageId, field, value)
                    }
                  />
                ))}

                <Button type="button" variant="outline" onClick={() => addVariant(itemIndex)}>
                  Add variant
                </Button>
              </div>
            )}
          </ItemForm>
        </div>
      ))}

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => addItem(ITEM_KINDS.SUB_CATEGORY)}>
          Add sub category
        </Button>
        <Button type="button" variant="outline" onClick={() => addItem(ITEM_KINDS.PRODUCT)}>
          Add product
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
