"use client";

import { NotFound } from "@/components/common/error";
import { UnitItem } from "./unit-item";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export type UnitListProps = {
    units: any[];
    tenant: any;
};

export const UnitList = ({ units, tenant }: UnitListProps) => {
    const count = units?.length || 0;
    const hasUnits = count > 0;

    return (
        <div className="flex flex-col gap-2">
            <div className="inline-flex gap-2 justify-start items-center mb-3">
                <h2 className="text-2xl font-semibold">
                    Birimler ({count})
                </h2>
                <Link href={`/d/${tenant._id}/units/create`}>
                    <Button size={"sm"}>
                        <Plus size={14} /> Yeni birim ekle
                    </Button>
                </Link>
            </div>
            {
                !hasUnits && (
                    <NotFound
                        title="Eklenmiş birim bulunamadı. Hemen yeni bir tane ekle."
                    />
                )
            }
            {
                hasUnits && (
                    <div className="grid grid-cols-2 gap-2">
                        {
                            units.map((unit: any, unitIndex: number) => (
                                <UnitItem
                                    key={unitIndex}
                                    unit={unit}
                                    tenant={tenant}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};
UnitList.displayName = "UnitList";
