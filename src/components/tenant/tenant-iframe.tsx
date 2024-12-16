"use client";

import Link from "next/link";
import {ExternalLink, RefreshCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";

export type TenantIframeProps = {
  tenant: any;
  path?: string;
};

export const TenantIframe = ({tenant, path = ""}: TenantIframeProps) => {
  const {reloadKey, reloadIframe} = useIframeReloadContext();

  const domain = process.env.NEXT_PUBLIC_QR_MENU_URL!.replace("{alias}", tenant.alias);
  const iframeSrc = `${domain}${path}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1 w-full">
        <Button size={"icon"} variant={"outline"} onClick={reloadIframe}>
          <RefreshCcw />
        </Button>
        <Link className="flex-1" href={iframeSrc} target="_blank">
          <Button className="w-full" variant={"secondary"}>
            View menu <ExternalLink />
          </Button>
        </Link>
      </div>
      <iframe
        key={reloadKey}
        className="border rounded-lg"
        height={844}
        src={iframeSrc}
        title={tenant.name}
        width={390}
      />
    </div>
  );
};
TenantIframe.displayName = "TenantIframe";
