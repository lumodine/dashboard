"use client";

import Link from "next/link";
import { NotFound } from "@/components/common/error";
import { Button } from "@/components/ui/button";
import {
    Plus,
} from "lucide-react";
import { TenantItem } from "./tenant-item";

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
                            tenants.map((tenant: any, tenantIndex: number) => (
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
TenantList.displayName = "TenantList";
