import {ReactNode} from "react";
import {X} from "lucide-react";
import {TranslationFields} from "@/components/menu/translation-fields";
import {PriceFields} from "@/components/menu/price-fields";
import {Button} from "@/components/ui/button";
import {ITEM_KINDS} from "@/constants/item";

type ItemFormProps = {
  item: any;
  languages: any[];
  currencies: any[];
  children?: ReactNode;
  onRemove: () => void;
  onUpdateTranslation: (languageId: string, field: keyof any, value: string) => void;
  onUpdatePrice: (currencyId: string, amount: string) => void;
};

export const ItemForm = ({
  item,
  languages,
  currencies,
  children,
  onRemove,
  onUpdateTranslation,
  onUpdatePrice,
}: ItemFormProps) => {
  return (
    <div className="ml-8 p-4 border rounded-lg relative">
      <Button
        className="absolute right-2 top-2"
        size="icon"
        type="button"
        variant="ghost"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="grid gap-4">
        <TranslationFields
          languages={languages}
          translations={item.translations}
          onUpdate={onUpdateTranslation}
        />

        {item.kind === ITEM_KINDS.PRODUCT && item.prices && (
          <PriceFields currencies={currencies} prices={item.prices} onUpdate={onUpdatePrice} />
        )}
      </div>

      {children}
    </div>
  );
};
