"use client";

import {EyeOff} from "lucide-react";
import {toast} from "react-toastify";
import {Eye} from "lucide-react";
import Link from "next/link";
import updateItemStatus from "@/actions/item/updateItemStatus";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {Button} from "@/components/ui/button";

export type ProductVariantItemProps = {
  tenant: any;
  category: any;
  product: any;
  variant: any;
};

export const ProductVariantItem = ({
  tenant,
  category,
  product,
  variant,
}: ProductVariantItemProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const handleStatus = async (status: string) => {
    const response = await updateItemStatus(tenant._id, variant._id, status);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    if (response.success) {
      reloadIframe();
    }
  };

  return (
    <div className="flex justify-between items-center gap-3 p-2 border rounded-lg">
      <Link
        className="w-full flex flex-col gap-1 items-start"
        href={`/d/${tenant._id}/menu/${category._id}/${product._id}/${variant._id}`}
      >
        <b>{variant.translations[0].title}</b>
      </Link>
      <div className="flex flex-col items-center gap-1">
        {variant.status === "published" && (
          <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("hidden")}>
            <Eye />
          </Button>
        )}
        {variant.status === "hidden" && (
          <Button size={"icon"} variant={"ghost"} onClick={() => handleStatus("published")}>
            <EyeOff />
          </Button>
        )}
      </div>
    </div>
  );
};
ProductVariantItem.displayName = "ProductVariantItem";
