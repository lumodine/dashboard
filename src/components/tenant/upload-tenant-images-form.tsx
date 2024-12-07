"use client";

import {ChangeEvent} from "react";
import {toast} from "react-toastify";
import Image from "next/image";
import {Trash} from "lucide-react";
import uploadTenantLogo from "@/actions/tenant/uploadTenantLogo";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import uploadTenantBackground from "@/actions/tenant/uploadTenantBackground";
import {cn} from "@/utils/shadcn";
import removeTenantLogo from "@/actions/tenant/removeTenantLogo";
import removeTenantBackground from "@/actions/tenant/removeTenantBackground";
import {Button} from "@/components/ui/button";
import { useIframeReloadContext } from "@/contexts/iframeReloadContext";

export type UploadTenantImagesFormProps = {
  tenant: any;
};

export const UploadTenantImagesForm = ({tenant}: UploadTenantImagesFormProps) => {
  const {reloadIframe} = useIframeReloadContext();
  
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

    reloadIframe();
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

    reloadIframe();
  };

  const handleRemoveLogo = async () => {
    const response = await removeTenantLogo(tenant._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const handleRemoveBackground = async () => {
    const response = await removeTenantBackground(tenant._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-start">
        <Label className="inline-flex flex-col gap-2" htmlFor="logo">
          <span>Logo</span>
          <div className="relative flex items-center justify-center border rounded-lg overflow-hidden w-[200px] h-[200px] cursor-pointer group">
            {tenant.logo && (
              <Image alt={tenant.name} height={200} loading="lazy" src={tenant.logo} width={200} />
            )}
            <span
              className={cn(
                "absolute top-0 left-0 h-full w-full items-center justify-center bg-black/50 text-white",
                tenant.logo && "hidden group-hover:flex",
                !tenant.logo && "flex",
              )}
            >
              Logo yükle
            </span>
          </div>
        </Label>
        <Input className="hidden" id="logo" name="logo" type="file" onChange={handleUploadLogo} />
        {tenant.logo && (
          <Button size={"sm"} variant={"destructive"} onClick={handleRemoveLogo}>
            <Trash /> Logoyu sil
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Label className="inline-flex flex-col gap-2" htmlFor="background">
          <span>Arkaplan</span>

          <div className="relative flex items-center justify-center border rounded-lg overflow-hidden w-[400px] h-[200px] cursor-pointer group">
            {tenant.background && (
              <Image
                alt={tenant.name}
                height={200}
                loading="lazy"
                src={tenant.background}
                width={400}
              />
            )}
            <span
              className={cn(
                "absolute top-0 left-0 h-full w-full items-center justify-center bg-black/50 text-white",
                tenant.background && "hidden group-hover:flex",
                !tenant.background && "flex",
              )}
            >
              Arkaplan yükle
            </span>
          </div>
        </Label>
        <Input
          className="hidden"
          id="background"
          name="background"
          type="file"
          onChange={handleUploadBackground}
        />
        {tenant.background && (
          <Button size={"sm"} variant={"destructive"} onClick={handleRemoveBackground}>
            <Trash /> Arkaplanı sil
          </Button>
        )}
      </div>
    </div>
  );
};
UploadTenantImagesForm.displayName = "UploadTenantImagesForm";
