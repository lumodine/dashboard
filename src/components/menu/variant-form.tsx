import {X} from "lucide-react";
import {TranslationFields} from "@/components/menu/translation-fields";
import {PriceFields} from "@/components/menu/price-fields";
import {Button} from "@/components/ui/button";

type VariantFormProps = {
  variant: any;
  languages: any[];
  currencies: any[];
  onRemove: () => void;
  onUpdateTranslation: (languageId: string, field: keyof any, value: string) => void;
  onUpdatePrice: (currencyId: string, amount: string) => void;
};

export const VariantForm = ({
  variant,
  languages,
  currencies,
  onRemove,
  onUpdateTranslation,
  onUpdatePrice,
}: VariantFormProps) => {
  return (
    <div className="p-4 border rounded-lg relative">
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
          translations={variant.translations}
          onUpdate={onUpdateTranslation}
        />

        <PriceFields currencies={currencies} prices={variant.prices} onUpdate={onUpdatePrice} />
      </div>
    </div>
  );
};
