"use client";

import {useState} from "react";
import {Save, X} from "lucide-react";
import {toast} from "react-toastify";
import {SubmitButton} from "@/components/common/submit-button";
import {TranslationFields} from "@/components/menu/translation-fields";
import {ItemForm} from "@/components/menu/item-form";
import {VariantForm} from "@/components/menu/variant-form";
import {Button} from "@/components/ui/button";
import createMenu from "@/actions/menu/createMenu";
import {ITEM_KINDS} from "@/constants/item";

export type CreateMenuFormProps = {
  tenant: any;
};

export const CreateMenuForm = ({tenant}: CreateMenuFormProps) => {
  const languages = tenant.languages;
  const currencies = tenant.currencies;
  const [items, setItems] = useState<any[]>([]);

  const addCategory = () => {
    setItems([
      ...items,
      {
        kind: ITEM_KINDS.CATEGORY,
        translations: languages.map((language: any) => ({
          language: language.language._id,
          title: "",
          description: "",
        })),
        items: [],
      },
    ]);
  };

  const addItem = (itemIndex: number, kind: string) => {
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

    newItems[itemIndex].items.push(newItem);
    setItems(newItems);
  };

  const addVariant = (itemIndex: number, subItemIndex: number) => {
    const newItems = [...items];
    const item = newItems[itemIndex].items[subItemIndex];

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

  const removeVariant = (itemIndex: number, subItemIndex: number, variantIndex: number) => {
    const newItems = [...items];
    const item = newItems[itemIndex].items[subItemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.items) {
      item.items.splice(variantIndex, 1);
      setItems(newItems);
    }
  };

  const updateVariantTranslation = (
    itemIndex: number,
    subItemIndex: number,
    variantIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex].items[subItemIndex];

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
    subItemIndex: number,
    variantIndex: number,
    currencyId: string,
    amount: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex].items[subItemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.items) {
      const variant = item.items[variantIndex];
      const priceIndex = variant.prices.findIndex((p: any) => p.currency === currencyId);

      if (priceIndex !== -1 && amount !== undefined) {
        variant.prices[priceIndex].amount = parseFloat(amount);
        setItems(newItems);
      }
    }
  };

  const removeItem = (itemIndex: number) => {
    const newItems = [...items];

    newItems.splice(itemIndex, 1);
    setItems(newItems);
  };

  const removeSubItem = (itemIndex: number, subItemIndex: number) => {
    const newItems = [...items];

    newItems[itemIndex].items.splice(subItemIndex, 1);
    setItems(newItems);
  };

  const updateItemTranslation = (
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

  const updateSubItemTranslation = (
    itemIndex: number,
    subItemIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex].items[subItemIndex];
    const translationIndex = item.translations.findIndex((t: any) => t.language === languageId);

    if (translationIndex !== -1) {
      item.translations[translationIndex][field] = value;
      setItems(newItems);
    }
  };

  const updatePrice = (
    itemIndex: number,
    subItemIndex: number,
    currencyId: string,
    amount: string,
  ) => {
    const newItems = [...items];
    const item = newItems[itemIndex].items[subItemIndex];

    if (item.prices) {
      const priceIndex = item.prices.findIndex((p: any) => p.currency === currencyId);

      if (priceIndex !== -1 && amount !== undefined) {
        item.prices[priceIndex].amount = parseFloat(amount);
        setItems(newItems);
      }
    }
  };

  const clientAction = async () => {
    const response = await createMenu(tenant._id, items);

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
      {items.map((item, itemIndex) => (
        <div key={itemIndex} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            className="absolute right-2 top-2"
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => removeItem(itemIndex)}
          >
            <X className="h-4 w-4" />
          </Button>

          <TranslationFields
            languages={languages}
            translations={item.translations}
            onUpdate={(languageId: string, field: keyof any, value: string) =>
              updateItemTranslation(itemIndex, languageId, field, value)
            }
          />

          <div className="mt-4 space-y-4">
            {item.items.map((subItem: any, subItemIndex: number) => (
              <ItemForm
                key={itemIndex + "-" + subItemIndex}
                currencies={currencies}
                item={subItem}
                languages={languages}
                onRemove={() => removeSubItem(itemIndex, subItemIndex)}
                onUpdatePrice={(currencyId: string, amount: string) =>
                  updatePrice(itemIndex, subItemIndex, currencyId, amount)
                }
                onUpdateTranslation={(languageId: string, field: keyof any, value: string) =>
                  updateSubItemTranslation(itemIndex, subItemIndex, languageId, field, value)
                }
              >
                {subItem.kind === ITEM_KINDS.PRODUCT && subItem.items && (
                  <div className="mt-4 space-y-4">
                    {subItem.items.map((variant: any, variantIndex: number) => (
                      <VariantForm
                        key={itemIndex + "-" + subItemIndex + "-" + variantIndex}
                        currencies={currencies}
                        languages={languages}
                        variant={variant}
                        onRemove={() => removeVariant(itemIndex, subItemIndex, variantIndex)}
                        onUpdatePrice={(currencyId: string, amount: string) =>
                          updateVariantPrice(
                            itemIndex,
                            subItemIndex,
                            variantIndex,
                            currencyId,
                            amount,
                          )
                        }
                        onUpdateTranslation={(
                          languageId: string,
                          field: keyof any,
                          value: string,
                        ) =>
                          updateVariantTranslation(
                            itemIndex,
                            subItemIndex,
                            variantIndex,
                            languageId,
                            field,
                            value,
                          )
                        }
                      />
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addVariant(itemIndex, subItemIndex)}
                    >
                      Add variant
                    </Button>
                  </div>
                )}
              </ItemForm>
            ))}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem(itemIndex, ITEM_KINDS.SUB_CATEGORY)}
              >
                Add sub category
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem(itemIndex, ITEM_KINDS.PRODUCT)}
              >
                Add product
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <Button type="button" variant="outline" onClick={addCategory}>
          Add category
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
