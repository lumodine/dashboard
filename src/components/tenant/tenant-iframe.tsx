"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ExternalLink,
    RefreshCcw,
} from "lucide-react";

export type TenantIframeProps = {
    tenant: any;
    path?: string;
};

export const TenantIframe = ({ tenant, path = "" }: TenantIframeProps) => {
    const domain = process.env.NEXT_PUBLIC_QR_MENU_URL!.replace("{alias}", tenant.alias);
    const iframeSrc = `${domain}${path}`;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 w-full">
                <Button
                    variant={"outline"}
                    size={"icon"}
                >
                    <RefreshCcw />
                </Button>
                <Link
                    href={iframeSrc}
                    target="_blank"
                    className="flex-1"
                >
                    <Button
                        variant={"secondary"}
                        className="w-full"
                    >
                        Menüyü farklı sayfada görüntüle <ExternalLink />
                    </Button>
                </Link>
            </div>
            <iframe
                className="border rounded-lg"
                src={iframeSrc}
                width={390}
                height={844}
            />
        </div>
    );
};
TenantIframe.displayName = "TenantIframe";
