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
  const [categories, setCategories] = useState<any[]>([]);

  const addCategory = () => {
    setCategories([
      ...categories,
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

  const addItem = (categoryIndex: number, kind: string) => {
    const newCategories = [...categories];
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
      newItem.variants = [];
    }

    newCategories[categoryIndex].items.push(newItem);
    setCategories(newCategories);
  };

  const addVariant = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.variants) {
      item.variants.push({
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
      setCategories(newCategories);
    }
  };

  const removeVariant = (categoryIndex: number, itemIndex: number, variantIndex: number) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.variants) {
      item.variants.splice(variantIndex, 1);
      setCategories(newCategories);
    }
  };

  const updateVariantTranslation = (
    categoryIndex: number,
    itemIndex: number,
    variantIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.variants) {
      const variant = item.variants[variantIndex];
      const translationIndex = variant.translations.findIndex(
        (t: any) => t.language === languageId,
      );

      if (translationIndex !== -1) {
        variant.translations[translationIndex][field] = value;
        setCategories(newCategories);
      }
    }
  };

  const updateVariantPrice = (
    categoryIndex: number,
    itemIndex: number,
    variantIndex: number,
    currencyId: string,
    amount: string,
  ) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];

    if (item.kind === ITEM_KINDS.PRODUCT && item.variants) {
      const variant = item.variants[variantIndex];
      const priceIndex = variant.prices.findIndex((p: any) => p.currency === currencyId);

      if (priceIndex !== -1 && amount !== undefined) {
        variant.prices[priceIndex].amount = parseFloat(amount);
        setCategories(newCategories);
      }
    }
  };

  const removeCategory = (categoryIndex: number) => {
    const newCategories = [...categories];

    newCategories.splice(categoryIndex, 1);
    setCategories(newCategories);
  };

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];

    newCategories[categoryIndex].items.splice(itemIndex, 1);
    setCategories(newCategories);
  };

  const updateCategoryTranslation = (
    categoryIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newCategories = [...categories];
    const category = newCategories[categoryIndex];
    const translationIndex = category.translations.findIndex((t: any) => t.language === languageId);

    if (translationIndex !== -1) {
      category.translations[translationIndex][field] = value;
      setCategories(newCategories);
    }
  };

  const updateItemTranslation = (
    categoryIndex: number,
    itemIndex: number,
    languageId: string,
    field: keyof any,
    value: string,
  ) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];
    const translationIndex = item.translations.findIndex((t: any) => t.language === languageId);

    if (translationIndex !== -1) {
      item.translations[translationIndex][field] = value;
      setCategories(newCategories);
    }
  };

  const updatePrice = (
    categoryIndex: number,
    itemIndex: number,
    currencyId: string,
    amount: string,
  ) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];

    if (item.prices) {
      const priceIndex = item.prices.findIndex((p: any) => p.currency === currencyId);

      if (priceIndex !== -1 && amount !== undefined) {
        item.prices[priceIndex].amount = parseFloat(amount);
        setCategories(newCategories);
      }
    }
  };

  const clientAction = async () => {
    const response = await createMenu(tenant._id, categories);

    if (response.success) {
      setCategories([]);
    }

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <form action={clientAction} className="space-y-4">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4 p-4 border rounded-lg relative">
          <Button
            className="absolute right-2 top-2"
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => removeCategory(categoryIndex)}
          >
            <X className="h-4 w-4" />
          </Button>

          <TranslationFields
            languages={languages}
            translations={category.translations}
            onUpdate={(languageId: string, field: keyof any, value: string) =>
              updateCategoryTranslation(categoryIndex, languageId, field, value)
            }
          />

          <div className="mt-4 space-y-4">
            {category.items.map((item: any, itemIndex: number) => (
              <ItemForm
                key={categoryIndex + "-" + itemIndex}
                currencies={currencies}
                item={item}
                languages={languages}
                onRemove={() => removeItem(categoryIndex, itemIndex)}
                onUpdatePrice={(currencyId: string, amount: string) =>
                  updatePrice(categoryIndex, itemIndex, currencyId, amount)
                }
                onUpdateTranslation={(languageId: string, field: keyof any, value: string) =>
                  updateItemTranslation(categoryIndex, itemIndex, languageId, field, value)
                }
              >
                {item.kind === ITEM_KINDS.PRODUCT && item.variants && (
                  <div className="mt-4 space-y-4">
                    {item.variants.map((variant: any, variantIndex: number) => (
                      <VariantForm
                        key={categoryIndex + "-" + itemIndex + "-" + variantIndex}
                        currencies={currencies}
                        languages={languages}
                        variant={variant}
                        onRemove={() => removeVariant(categoryIndex, itemIndex, variantIndex)}
                        onUpdatePrice={(currencyId: string, amount: string) =>
                          updateVariantPrice(
                            categoryIndex,
                            itemIndex,
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
                            categoryIndex,
                            itemIndex,
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
                      onClick={() => addVariant(categoryIndex, itemIndex)}
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
                onClick={() => addItem(categoryIndex, ITEM_KINDS.SUB_CATEGORY)}
              >
                Add sub category
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem(categoryIndex, ITEM_KINDS.PRODUCT)}
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

      {categories.length > 0 && (
        <div className="space-y-4">
          <SubmitButton>
            <Save /> Save
          </SubmitButton>
        </div>
      )}
    </form>
  );
};
