"use client";

import {ProductVariantItem} from "./product-variant-item";
import {NotFound} from "@/components/common/error";

export type ProductVariantListProps = {
  tenant: any;
  variants: any[];
};

export const ProductVariantList = ({tenant, variants}: ProductVariantListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {variants?.length === 0 && <NotFound title="You have not added any variants. Add one now." />}

      {variants?.map((variant: any, variantIndex: number) => (
        <ProductVariantItem key={variantIndex} tenant={tenant} variant={variant} />
      ))}
    </div>
  );
};
ProductVariantList.displayName = "ProductVariantList";
