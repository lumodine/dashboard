"use client";

import {EyeOff} from "lucide-react";
import {toast} from "react-toastify";
import {Eye} from "lucide-react";
import updateItemStatus from "@/actions/item/updateItemStatus";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {Button} from "@/components/ui/button";

export type ProductVariantItemProps = {
  tenant: any;
  variant: any;
};

export const ProductVariantItem = ({tenant, variant}: ProductVariantItemProps) => {
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
      <div className="flex gap-2 items-center">
        <b>{variant.translations[0].title}</b>
      </div>
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
