"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import updateTenantSettings from "@/actions/tenant/updateTenantSettings";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {formatDate} from "@/utils/date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {TENANT_STATUS} from "@/constants/tenant";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";

export type UpdateTenantSettingsFormProps = {
  tenant: any;
};

export const UpdateTenantSettingsForm = ({tenant}: UpdateTenantSettingsFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const [websiteScheme, websiteHost] = process.env.NEXT_PUBLIC_QR_MENU_URL!.split("{alias}");

  const clientAction = async (formData: FormData) => {
    const response = await updateTenantSettings(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    if (response.success) {
      reloadIframe();
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4 w-full">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="name">Name (*)</Label>
        </div>
        <Input required defaultValue={tenant.name} id="name" name="name" type="text" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="alias">Web address (*)</Label>
        <div className="flex">
          <span className="bg-primary text-primary-foreground py-1 px-2 rounded-l-lg">
            {websiteScheme}
          </span>
          <Input
            required
            className="rounded-none"
            defaultValue={tenant.alias}
            id="alias"
            name="alias"
            type="text"
          />
          <span className="bg-primary text-primary-foreground py-1 px-2 rounded-r-lg">
            {websiteHost}
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="status">Status (*)</Label>
        </div>
        <Select defaultValue={tenant.status} name="status">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent id="status">
            {TENANT_STATUS.map((tenantStatus: any, tenantStatusIndex: number) => (
              <SelectItem key={tenantStatusIndex} value={tenantStatus.key}>
                {tenantStatus.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="text-xs">(*) Required field</span>
      <div className="flex flex-col sm:flex-row justify-between gap-1">
        <span className="text-muted-foreground text-xs">
          <b>Creation date</b>: {formatDate(tenant.createdAt)}
        </span>
        <span className="text-muted-foreground text-xs">
          <b>Update date</b>: {formatDate(tenant.updatedAt)}
        </span>
      </div>

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateTenantSettingsForm.displayName = "UpdateTenantSettingsForm";
