"use client";

import Link from "next/link";
import { NotFound } from "@/components/common/error";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryItem } from "./category-item";
import {
    DragDropContext,
    Droppable,
} from "@hello-pangea/dnd";
import updateCategorySort from "@/actions/category/updateCategorySort";
import { toast } from "react-toastify";
import { useState } from "react";
import { reOrder } from "@/utils/array";

export type CategoryListProps = {
    tenant: any;
    categories: any[];
};

export const CategoryList = ({ tenant, categories }: CategoryListProps) => {
    const [dragCategories, setDragCategories] = useState(categories);

    const count = categories?.length || 0;
    const hasCategories = count > 0;

    const onDragEnd = async (result: any) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        const items = reOrder(dragCategories, source.index, destination.index);

        setDragCategories(items);
        
        const orderedItems = items.map((item: any, index: number) => {
            return {
                categoryId: item._id,
                sort: index,
            };
        });

        const response = await updateCategorySort(tenant._id, orderedItems);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    return (
        <>
            <div className="inline-flex gap-2 justify-start items-center mb-3">
                <h2 className="text-2xl font-semibold">
                    Kategoriler ({count})
                </h2>
                <Link href={`/d/${tenant._id}/menu/create`}>
                    <Button size={"sm"}>
                        <Plus size={14} /> Yeni kategori ekle
                    </Button>
                </Link>
            </div>
            {
                !hasCategories && (
                    <NotFound title={"Henüz eklenmiş bir kategoriniz bulunamadı. Hemen bir tane ekle!"} />
                )
            }
            {
                hasCategories && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {
                                provided => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="grid grid-cols-1 gap-3"
                                    >
                                        {
                                            dragCategories.map((category: any, categoryIndex: number) => (
                                                <CategoryItem
                                                    key={categoryIndex}
                                                    tenant={tenant}
                                                    category={category}
                                                    index={categoryIndex}
                                                />
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
                )
            }
        </>
    );
};
CategoryList.displayName = "CategoryList";
