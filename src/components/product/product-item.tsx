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
import { PRODUCT_TYPES } from "@/constants/product";
import {
    Draggable
} from "@hello-pangea/dnd";
import updateProductType from "@/actions/product/updateProductType";
import updateProductStatus from "@/actions/product/updateProductStatus";
import { toast } from "react-toastify";

export type ProductItemProps = {
    tenant: any;
    category: any;
    product: any;
    index: number;
};

export const ProductItem = ({ tenant, category, product, index }: ProductItemProps) => {
    const handleType = async (type: string) => {
        const response = await updateProductType(tenant._id, category._id, product._id, type);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    const handleStatus = async (status: string) => {
        const response = await updateProductStatus(tenant._id, category._id, product._id, status);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    return (
        <Draggable
            key={product._id}
            draggableId={product._id}
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
                                    product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.translations[0].name}
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
                                    {product.translations[0].name}
                                </b>
                                <Link
                                    href={`/d/${tenant._id}/menu/${category._id}/${product._id}`}
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
                                <Select
                                    defaultValue={product.type}
                                    onValueChange={(value) => handleType(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            PRODUCT_TYPES.map((productType: any, productTypeIndex: number) => (
                                                <SelectItem
                                                    key={productTypeIndex}
                                                    value={productType.key}
                                                >
                                                    {productType.name}
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
                                    product.status === "published" && (
                                        <Button
                                            title="Gizle"
                                            size={"icon"}
                                            variant={"outline"}
                                            onClick={() => handleStatus("not_available")}
                                        >
                                            <Eye />
                                        </Button>
                                    )
                                }
                                {
                                    product.status === "not_available" && (
                                        <Button
                                            title="Göster"
                                            size={"icon"}
                                            variant={"outline"}
                                            onClick={() => handleStatus("published")}
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
ProductItem.displayName = "ProductItem";