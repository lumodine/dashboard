import {Input} from "@/components/ui/input";

type PriceFieldsProps = {
  currencies: any[];
  prices: any[];
  onUpdate: (currencyId: string, amount: string) => void;
};

export const PriceFields = ({currencies, prices, onUpdate}: PriceFieldsProps) => {
  return (
    <div className="space-y-2">
      {currencies.map((currency) => {
        const price = prices.find((p) => p.currency === currency.currency._id);

        return (
          <div key={currency.currency._id} className="flex items-center gap-2">
            <span className="text-sm font-medium min-w-[100px]">
              {currency.currency.code} - {currency.currency.symbol}
            </span>
            <Input
              defaultValue={price?.amount || ""}
              placeholder={`Price (${currency.currency.symbol})`}
              step={0.00000000000000000000000000000001}
              type="number"
              onChange={(e) => onUpdate(currency.currency._id, e.target.value || "")}
            />
          </div>
        );
      })}
    </div>
  );
};
