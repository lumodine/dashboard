import Link from "next/link";
import { NotFound } from "./error";
import Image from "next/image";
import { Button } from "../ui/button";
import {
    Banknote,
    Globe,
    Plus
} from "lucide-react";

export type TenantItemProps = {
    tenant: any;
};

export const TenantItem = ({ tenant }: TenantItemProps) => {
    return (
        <Link
            href={`/${tenant._id}`}
            className="border rounded-lg overflow-hidden hover:bg-gray-50"
        >
            <div className="flex gap-2">
                <div>
                    <Image
                        src={'https://placehold.co/100x100/png'}
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
                        <div className="flex gap-1 item-center">
                            <Globe size={16} />
                            <span className="text-xs">
                                {tenant.languages.length}
                            </span>
                        </div>
                        <div className="flex gap-1 item-center">
                            <Banknote size={16} />
                            <span className="text-xs">
                                {tenant.currencies.length}
                            </span>
                        </div>
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
                <Link href={'/create'}>
                    <Button size={'sm'}>
                        <Plus size={14} /> Yeni işletme ekle
                    </Button>
                </Link>
            </div>
            {
                !hasTenants && (
                    <NotFound title={'Henüz eklenmiş bir işletmeniz bulunamadı. Hemen bir tane ekle!'} />
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
