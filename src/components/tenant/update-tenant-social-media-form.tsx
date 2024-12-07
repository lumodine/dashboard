"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import updateTenantSocialMedia from "@/actions/tenant/updateTenantSocialMedia";
import { useIframeReloadContext } from "@/contexts/iframeReloadContext";

export type UpdateTenantSocialMediaFormProps = {
  tenant: any;
};

export const UpdateTenantSocialMediaForm = ({tenant}: UpdateTenantSocialMediaFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const clientAction = async (formData: FormData) => {
    const response = await updateTenantSocialMedia(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const findSocialMediaByType = (type: string) => {
    return tenant.socialMedias.find((socialMedia: any) => socialMedia.type === type);
  };

  return (
    <form action={clientAction} className="w-full flex flex-col gap-4 w-full">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="instagram">Instagram</Label>
        </div>
        <Input
          defaultValue={findSocialMediaByType("instagram")?.value}
          id="instagram"
          name="instagram"
          type="url"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="x">X</Label>
        </div>
        <Input defaultValue={findSocialMediaByType("x")?.value} id="x" name="x" type="url" />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="facebook">Facebook</Label>
        </div>
        <Input
          defaultValue={findSocialMediaByType("facebook")?.value}
          id="facebook"
          name="facebook"
          type="url"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="youtube">YouTube</Label>
        </div>
        <Input
          defaultValue={findSocialMediaByType("youtube")?.value}
          id="youtube"
          name="youtube"
          type="url"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="website">Web site</Label>
        </div>
        <Input
          defaultValue={findSocialMediaByType("website")?.value}
          id="website"
          name="website"
          type="url"
        />
      </div>

      <Button className="w-full" type="submit">
        <Save /> Kaydet
      </Button>
    </form>
  );
};
UpdateTenantSocialMediaForm.displayName = "UpdateTenantSocialMediaForm";
