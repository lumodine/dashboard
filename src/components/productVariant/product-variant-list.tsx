"use client";

import {ProductVariantItem} from "./product-variant-item";
import {NotFound} from "@/components/common/error";

export type ProductVariantListProps = {
  tenant: any;
  category: any;
  product: any;
  variants: any[];
};

export const ProductVariantList = ({
  tenant,
  category,
  product,
  variants,
}: ProductVariantListProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {variants?.length === 0 && <NotFound title="You have not added any variants. Add one now." />}

      {variants?.map((variant: any, variantIndex: number) => (
        <ProductVariantItem
          key={variantIndex}
          category={category}
          product={product}
          tenant={tenant}
          variant={variant}
        />
      ))}
    </div>
  );
};
ProductVariantList.displayName = "ProductVariantList";
