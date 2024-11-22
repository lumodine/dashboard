"use client";

import { NotFound } from "@/components/common/error";
import { UnitItem } from "./unit-item";

export type UnitListProps = {
    units: any[];
    tenant: any;
};

export const UnitList = ({ units, tenant }: UnitListProps) => {
    const count = units?.length || 0;
    const hasUnits = count > 0;

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
                Birimler
            </h2>
            {
                !hasUnits && (
                    <NotFound
                        title="Eklenmiş birim bulunamadı. Hemen yeni bir tane ekle."
                    />
                )
            }
            {
                hasUnits && units.map((unit: any, unitIndex: number) => (
                    <UnitItem
                        key={unitIndex}
                        unit={unit}
                        tenant={tenant}
                    />
                ))
            }
        </div>
    );
};
UnitList.displayName = "UnitList";
