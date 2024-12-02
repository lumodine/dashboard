"use client";

import uploadTenantLogo from "@/actions/tenant/uploadTenantLogo";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import uploadTenantBackground from "@/actions/tenant/uploadTenantBackground";
import Image from "next/image";
import { cn } from "@/utils/shadcn";
import removeTenantLogo from "@/actions/tenant/removeTenantLogo";
import removeTenantBackground from "@/actions/tenant/removeTenantBackground";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export type UploadTenantImagesFormProps = {
    tenant: any;
};

export const UploadTenantImagesForm = ({ tenant }: UploadTenantImagesFormProps) => {
    const handleUploadLogo = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files?.length === 0) {
            return;
        }

        const logoFile = e.target.files[0];
        const formData = new FormData();
        formData.append("logo", logoFile);

        const response = await uploadTenantLogo(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    const handleUploadBackground = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files?.length === 0) {
            return;
        }

        const backgroundFile = e.target.files[0];
        const formData = new FormData();
        formData.append("background", backgroundFile);

        const response = await uploadTenantBackground(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    const handleRemoveLogo = async () => {
        const response = await removeTenantLogo(tenant._id);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    const handleRemoveBackground = async () => {
        const response = await removeTenantBackground(tenant._id);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start">
                <Label
                    htmlFor="logo"
                    className="inline-flex flex-col gap-2"
                >
                    <span>
                        Logo
                    </span>
                    <p className="text-muted-foreground">
                        İşletmenize ait logonuzu buradan yükleyebilirsiniz.
                    </p>
                    <div className="relative flex items-center justify-center border rounded-lg overflow-hidden w-[400px] h-[400px] cursor-pointer group">
                        {
                            tenant.logo && (
                                <Image
                                    src={tenant.logo}
                                    alt={tenant.name}
                                    width={400}
                                    height={400}
                                    loading="lazy"
                                />
                            )
                        }
                        <span
                            className={
                                cn(
                                    "absolute top-0 left-0 h-full w-full items-center justify-center bg-black/50 text-primary-foreground",
                                    tenant.logo && "hidden group-hover:flex",
                                    !tenant.logo && "flex",
                                )
                            }
                        >
                            Logo yükle
                        </span>
                    </div>
                </Label>
                <Input
                    type="file"
                    name="logo"
                    id="logo"
                    className="hidden"
                    onChange={handleUploadLogo}
                />
                <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={handleRemoveLogo}
                >
                    <Trash/> Logoyu sil
                </Button>
            </div>
            <div className="flex flex-col gap-2 items-start">
                <Label
                    htmlFor="background"
                    className="inline-flex flex-col gap-2"
                >
                    <span>
                        Arkaplan
                    </span>
                    <p className="text-muted-foreground">
                        İşletmenize ait arkaplan resminizi buradan yükleyebilirsiniz.
                    </p>

                    <div className="relative flex items-center justify-center border rounded-lg overflow-hidden w-[800px] h-[400px] cursor-pointer group">
                        {
                            tenant.background && (
                                <Image
                                    src={tenant.background}
                                    alt={tenant.name}
                                    width={800}
                                    height={400}
                                    loading="lazy"
                                />
                            )
                        }
                        <span
                            className={
                                cn(
                                    "absolute top-0 left-0 h-full w-full items-center justify-center bg-black/50 text-primary-foreground",
                                    tenant.background && "hidden group-hover:flex",
                                    !tenant.background && "flex",
                                )
                            }
                        >
                            Arkaplan yükle
                        </span>
                    </div>
                </Label>
                <Input
                    type="file"
                    name="background"
                    id="background"
                    className="hidden"
                    onChange={handleUploadBackground}
                />
                <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={handleRemoveLogo}
                >
                    <Trash/> Arkaplanı sil
                </Button>
            </div>
        </div>
    );
};
UploadTenantImagesForm.displayName = "UploadTenantImagesForm";
