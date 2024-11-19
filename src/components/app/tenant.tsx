import Link from "next/link";
import { NotFound } from "./error";
import Image from "next/image";
import { Button } from "../ui/button";
import {
    Banknote,
    ExternalLink,
    Globe,
    Plus,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export type TenantItemProps = {
    tenant: any;
};

export const TenantItem = ({ tenant }: TenantItemProps) => {
    return (
        <Link
            href={`/d/${tenant._id}`}
            className="border rounded-lg overflow-hidden hover:bg-gray-50"
        >
            <div className="flex gap-2">
                <div>
                    <Image
                        src={"https://placehold.co/100x100/png"}
                        alt={tenant.name}
                        width={100}
                        height={100}
                        loading="lazy"
                    />
                </div>
                <div className="p-2 flex flex-col gap-2">
                    <span>
                        {tenant.name} ({tenant.alias})
                    </span>
                    <p className="text-xs">
                        {tenant.address}
                    </p>
                    <div className="flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex gap-1 item-center">
                                        <Globe size={16} />
                                        <span className="text-xs">
                                            {tenant.languages.length}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Diller
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex gap-1 item-center">
                                        <Banknote size={16} />
                                        <span className="text-xs">
                                            {tenant.currencies.length}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Para birimleri
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export type TenantListProps = {
    tenants: any[];
};

export const TenantList = ({ tenants }: TenantListProps) => {
    const count = tenants?.length || 0;
    const hasTenants = count > 0;

    return (
        <section>
            <div className="inline-flex gap-2 justify-start items-center mb-3">
                <h2 className="text-2xl font-semibold">
                    İşletmelerim ({count})
                </h2>
                <Link href={"/d/create"}>
                    <Button size={"sm"}>
                        <Plus size={14} /> Yeni işletme ekle
                    </Button>
                </Link>
            </div>
            {
                !hasTenants && (
                    <NotFound title={"Henüz eklenmiş bir işletmeniz bulunamadı. Hemen bir tane ekle!"} />
                )
            }
            {
                hasTenants && (
                    <div className="grid grid-cols-1 gap-3">
                        {
                            tenants.map((tenant, tenantIndex) => (
                                <TenantItem
                                    key={tenantIndex}
                                    tenant={tenant}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>
    );
};

export type TenantIframeProps = {
    tenant: any;
    path?: string;
};

export const TenantIframe = ({ tenant, path = "" }: TenantIframeProps) => {
    const domain = process.env.NEXT_PUBLIC_QR_MENU_URL!.replace("{alias}", tenant.alias);
    const iframeSrc = domain + path;

    return (
        <div className="flex flex-col items-center gap-2">
            <Link
                href={iframeSrc}
                target="_blank"
                className="w-full"
            >
                <Button
                    variant={"secondary"}
                    className="w-full"
                >
                    Menüyü farklı sayfada görüntüle <ExternalLink />
                </Button>
            </Link>
            <iframe
                className="border rounded-lg"
                src={iframeSrc}
                width={390}
                height={844}
            />
        </div>
    );
};

export type TenantMenuListProps = {
    tenant: any;
    menus: any[];
};

export const TenantMenuList = ({ tenant, menus }: TenantMenuListProps) => {
    if (menus.length === 0) {
        return null;
    }

    return (
        <div>
            {menus.map((menu, menuIndex) => (
                <div key={menuIndex} className="mb-4">
                    <h3 className="text-xl font-bold">
                        {menuIndex + 1}. {menu.title}
                    </h3>
                    {menu.items.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2">
                            {menu.items.map((menuItem: any, menuItemIndex: number) => (
                                <Link
                                    key={menuItemIndex}
                                    href={menuItem.href}
                                    title={menuItem.title}
                                    className="flex flex-col items-center justify-center gap-2 text-center w-[150px] h-[120px] p-4 bg-gray-100 hover:bg-gray-200 rounded-lg"
                                >
                                    <span className="text-sm font-semibold">
                                        {menuIndex + 1}.{menuItemIndex + 1}. {menuItem.title}
                                    </span>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};
