"use client";

import uploadTenantLogo from "@/actions/tenant/uploadTenantLogo";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import uploadTenantBackground from "@/actions/tenant/uploadTenantBackground";
import Image from "next/image";

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

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label
                    htmlFor="logo"
                    className="inline-flex flex-col gap-2"
                >
                    <span>
                        Logo
                    </span>
                    <p className="text-muted-foreground">
                        İşletmenize ait logonuzu buradan yükleyebilirsiniz. 400x400px boyutunda yüklemenizi öneririz.
                    </p>
                    <div
                        className="relative flex items-center justify-center cursor-pointer border hover:scale-95 w-[400px] min-h-[400px] h-auto rounded-lg bg-gray-50 overflow-hidden"
                    >
                        {
                            tenant.logo
                                ? (
                                    <Image
                                        src={tenant.logo}
                                        alt={tenant.name}
                                        width={400}
                                        height={400}
                                        loading="lazy"
                                    />
                                )
                                : (
                                    <span className="text-muted-foreground">
                                        Logo yükle (400x400)
                                    </span>
                                )
                        }
                    </div>
                </Label>
                <Input
                    type="file"
                    name="logo"
                    id="logo"
                    className="hidden"
                    onChange={handleUploadLogo}
                />
            </div>
            <div>
                <Label
                    htmlFor="background"
                    className="inline-flex flex-col gap-2"
                >
                    <span>
                        Arkaplan
                    </span>
                    <p className="text-muted-foreground">
                        İşletmenize ait arkaplan resminizi buradan yükleyebilirsiniz. 800x400px boyutunda yüklemenizi öneririz.
                    </p>
                    <div
                        className="relative flex items-center justify-center cursor-pointer border hover:scale-95 w-[800px] min-h-[400px] h-auto rounded-lg bg-gray-50 overflow-hidden"
                    >
                        {
                            tenant.background
                                ? (
                                    <Image
                                        src={tenant.background}
                                        alt={tenant.name}
                                        width={800}
                                        height={400}
                                        loading="lazy"
                                    />
                                )
                                : (
                                    <span className="text-muted-foreground">
                                        Arkaplan yükle (800x400)
                                    </span>
                                )
                        }
                    </div>
                </Label>
                <Input
                    type="file"
                    name="background"
                    id="background"
                    className="hidden"
                    onChange={handleUploadBackground}
                />
            </div>
        </div>
    );
};
UploadTenantImagesForm.displayName = "UploadTenantImagesForm";
