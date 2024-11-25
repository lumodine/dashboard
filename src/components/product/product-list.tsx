"use client";

import Link from "next/link";
import { NotFound } from "@/components/common/error";
import { Button } from "@/components/ui/button";
import {
    Plus,
} from "lucide-react";
import { ProductItem } from "./product-item";
import {
    DragDropContext,
    Droppable,
} from "@hello-pangea/dnd";
import updateProductSort from "@/actions/product/updateProductSort";
import { toast } from "react-toastify";

export type ProductListProps = {
    tenant: any;
    category: any;
    products: any[];
};

export const ProductList = ({ tenant, category, products }: ProductListProps) => {
    const count = products?.length || 0;
    const hasProducts = count > 0;

    const onDragEnd = async (result: any) => {
        const { destination, draggableId } = result;

        if (!destination) {
            return;
        }

        const response = await updateProductSort(
            tenant._id,
            category._id,
            draggableId,
            destination.index + 1);

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
                    Ürünler ({count})
                </h2>
                <Link href={`/d/${tenant._id}/menu/${category._id}/create`}>
                    <Button size={"sm"}>
                        <Plus size={14} /> Yeni ürün ekle
                    </Button>
                </Link>
            </div>
            {
                !hasProducts && (
                    <NotFound title={"Henüz eklenmiş bir ürününüz bulunamadı. Hemen bir tane ekle!"} />
                )
            }
            
            {
                hasProducts && (
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
                                            products.map((product: any, productIndex: number) => (
                                                <ProductItem
                                                    key={productIndex}
                                                    tenant={tenant}
                                                    category={category}
                                                    product={product}
                                                    index={productIndex}
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
ProductList.displayName = "ProductList";
