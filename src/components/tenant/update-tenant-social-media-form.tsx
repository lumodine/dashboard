"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import updateTenantSocialMedia from "@/actions/tenant/updateTenantSocialMedia";

export type UpdateTenantSocialMediaFormProps = {
    tenant: any;
};

export const UpdateTenantSocialMediaForm = ({ tenant }: UpdateTenantSocialMediaFormProps) => {
    const clientAction = async (formData: FormData) => {
        const response = await updateTenantSocialMedia(tenant._id, formData);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }

    const findSocialMediaByType = (type: string) => {
        return tenant.socialMedias.find((socialMedia: any) => socialMedia.type === type);
    }

    return (
        <form action={clientAction} className="flex flex-col gap-4 w-full">

            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="instagram">
                        Instagram
                    </Label>
                </div>
                <Input
                    id="instagram"
                    type="url"
                    name="instagram"
                    defaultValue={findSocialMediaByType("instagram")?.value}
                />
            </div>

            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="x">
                        X
                    </Label>
                </div>
                <Input
                    id="x"
                    type="url"
                    name="x"
                    defaultValue={findSocialMediaByType("x")?.value}
                />
            </div>

            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="facebook">
                        Facebook
                    </Label>
                </div>
                <Input
                    id="facebook"
                    type="url"
                    name="facebook"
                    defaultValue={findSocialMediaByType("facebook")?.value}
                />
            </div>

            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="youtube">
                        YouTube
                    </Label>
                </div>
                <Input
                    id="youtube"
                    type="url"
                    name="youtube"
                    defaultValue={findSocialMediaByType("youtube")?.value}
                />
            </div>

            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="website">
                        Website
                    </Label>
                </div>
                <Input
                    id="website"
                    type="url"
                    name="website"
                    defaultValue={findSocialMediaByType("website")?.value}
                />
            </div>

            <Button type="submit" className="w-full">
                <Save /> Kaydet
            </Button>
        </form>
    );
};
UpdateTenantSocialMediaForm.displayName = "UpdateTenantSocialMediaForm";
