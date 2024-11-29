"use client";

import { ChevronsUpDown } from "lucide-react";
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
import { CATEGORY_STATUS } from "@/constants/category";
import {
    Draggable
} from "@hello-pangea/dnd";
import { toast } from "react-toastify";
import updateCategoryStatus from "@/actions/category/updateCategoryStatus";
import uploadCategoryImage from "@/actions/category/uploadCategoryImage";
import { ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/shadcn";

export type CategoryItemProps = {
    tenant: any;
    category: any;
    index: number;
};

export const CategoryItem = ({ tenant, category, index }: CategoryItemProps) => {
    const handleStatus = async (status: string) => {
        const response = await updateCategoryStatus(tenant._id, category._id, status);

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

        const response = await uploadCategoryImage(tenant._id, category._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

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
                        <div className="flex gap-4 p-4 items-center justify-start w-full">
                            <div
                                {...provided.dragHandleProps}
                            >
                                <ChevronsUpDown strokeWidth={1} />
                            </div>
                            <div>
                                <Label
                                    htmlFor={`image-${tenant._id}-${category._id}`}
                                    className="text-center"
                                >
                                    <div
                                        className="relative flex items-center justify-center border rounded-lg overflow-hidden w-[100px] h-[100px] cursor-pointer group"
                                    >
                                        {
                                            category.image && (
                                                <Image
                                                    src={category.image}
                                                    alt={category.translations[0].name}
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
                                                    category.image && "hidden group-hover:flex",
                                                    !category.image && "flex",
                                                )
                                            }
                                        >
                                            Resim yükle (800x400)
                                        </span>
                                    </div>
                                </Label>
                                <Input
                                    type="file"
                                    name={`image-${tenant._id}-${category._id}`}
                                    id={`image-${tenant._id}-${category._id}`}
                                    className="hidden"
                                    onChange={handleUploadImage}
                                />
                            </div>
                            <div className="flex-1 w-full flex flex-col gap-1 items-start">
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
                                        Ürünleri gör/düzenle
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs">
                                    Durum
                                </span>
                                <Select
                                    defaultValue={category.status}
                                    onValueChange={(value) => handleStatus(value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            CATEGORY_STATUS.map((categoryStatus: any, categoryStatusIndex: number) => (
                                                <SelectItem
                                                    key={categoryStatusIndex}
                                                    value={categoryStatus.key}
                                                >
                                                    {categoryStatus.name}
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
CategoryItem.displayName = "CategoryItem";