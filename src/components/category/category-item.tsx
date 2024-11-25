"use client";

import { ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { CATEGORY_TYPES } from "@/constants/category";
import {
    Draggable
} from "@hello-pangea/dnd";

export type CategoryItemProps = {
    tenant: any;
    category: any;
    index: number;
};

export const CategoryItem = ({ tenant, category, index }: CategoryItemProps) => {
    return (
        <Draggable
            key={category._id}
            draggableId={category._id}
            index={index}>
            {
                provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="border rounded-lg overflow-hidden hover:bg-gray-50"
                    >
                        <div className="flex gap-4 p-4 items-center">
                            <div
                                {...provided.dragHandleProps}
                            >
                                <ChevronsUpDown strokeWidth={1} />
                            </div>
                            <div className="rounded-lg overflow-hidden">
                                {
                                    category.image ? (
                                        <Image
                                            src={category.image}
                                            alt={category.translations[0].name}
                                            width={100}
                                            height={100}
                                            loading="lazy"
                                            className="w-[100px]"
                                        />
                                    ) : (
                                        <div className="w-[100px]"></div>
                                    )
                                }
                            </div>
                            <div className="w-full flex flex-col gap-1 items-start">
                                <b>
                                    {category.translations[0].name}
                                </b>
                                <Link
                                    href={`/d/${tenant._id}/menu/${category._id}`}
                                >
                                    <Button
                                        variant={"link"}
                                        size={"sm"}
                                        className="p-0"
                                    >
                                        Detayına git
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs">
                                    Görünüm
                                </span>
                                <Select defaultValue={category.type}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            CATEGORY_TYPES.map((categoryType: any, categoryTypeIndex: number) => (
                                                <SelectItem
                                                    key={categoryTypeIndex}
                                                    value={categoryType.key}
                                                >
                                                    {categoryType.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs">
                                    Durum
                                </span>
                                {
                                    category.status === "published" && (
                                        <Button
                                            title="Gizle"
                                            size={"icon"}
                                            variant={"outline"}
                                        >
                                            <Eye />
                                        </Button>
                                    )
                                }
                                {
                                    category.status === "not_available" && (
                                        <Button
                                            title="Göster"
                                            size={"icon"}
                                            variant={"outline"}
                                        >
                                            <EyeOff />
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
        </Draggable>
    );
};
CategoryItem.displayName = "CategoryItem";