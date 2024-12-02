"use client";

import { ChevronsUpDown, Trash } from "lucide-react";
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
import { PRODUCT_STATUS, PRODUCT_TYPES } from "@/constants/product";
import {
    Draggable
} from "@hello-pangea/dnd";
import updateProductType from "@/actions/product/updateProductType";
import updateProductStatus from "@/actions/product/updateProductStatus";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/shadcn";
import { ChangeEvent } from "react";
import uploadProductImage from "@/actions/product/uploadProductImage";
import removeProductImage from "@/actions/product/removeProductImage";

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

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files?.length === 0) {
            return;
        }

        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await uploadProductImage(tenant._id, category._id, product._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    const handleRemoveImage = async () => {
        const response = await removeProductImage(tenant._id, category._id, product._id);

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
                            <div>
                                <Label
                                    htmlFor={`image-${tenant._id}-${category._id}-${product._id}`}
                                    className="text-center"
                                >
                                    <div className="relative flex items-center justify-center border rounded-lg w-[100px] h-[100px] cursor-pointer group">
                                        {
                                            product.image && (
                                                <Image
                                                    src={product.image}
                                                    alt={product.translations[0].name}
                                                    width={100}
                                                    height={100}
                                                    loading="lazy"
                                                />
                                            )
                                        }
                                        <span
                                            className={
                                                cn(
                                                    "absolute top-0 left-0 h-full w-full items-center justify-center text-xs bg-black/50 text-primary-foreground",
                                                    product.image && "hidden group-hover:flex",
                                                    !product.image && "flex",
                                                )
                                            }
                                        >
                                            Resim yükle
                                        </span>
                                        {
                                            product.image && (
                                                <Button
                                                    variant={"destructive"}
                                                    size={"icon"}
                                                    className="absolute -top-1 -right-1 z-20"
                                                    onClick={handleRemoveImage}
                                                >
                                                    <Trash />
                                                </Button>
                                            )
                                        }
                                    </div>
                                </Label>
                                <Input
                                    type="file"
                                    name={`image-${tenant._id}-${category._id}-${product._id}`}
                                    id={`image-${tenant._id}-${category._id}-${product._id}`}
                                    className="hidden"
                                    onChange={handleUploadImage}
                                />
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
                                        Ürün bilgilerini gör/düzenle
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
                                <Select
                                    defaultValue={product.status}
                                    onValueChange={(value) => handleStatus(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            PRODUCT_STATUS.map((productStatus: any, productStatusIndex: number) => (
                                                <SelectItem
                                                    key={productStatusIndex}
                                                    value={productStatus.key}
                                                >
                                                    {productStatus.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}
        </Draggable>
    );
};
ProductItem.displayName = "ProductItem";