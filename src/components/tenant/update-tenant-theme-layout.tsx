"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "../ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import updateTenantThemeLayout from "@/actions/tenant/updateTenantThemeLayout";
import {HEADER_POSITIONS} from "@/constants/theme";

export type UpdateTenantThemeLayoutFormProps = {
  tenant: any;
};

export const UpdateTenantThemeLayoutForm = ({tenant}: UpdateTenantThemeLayoutFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const clientAction = async (formData: FormData) => {
    const response = await updateTenantThemeLayout(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <form action={clientAction} className="w-full flex flex-col gap-4">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="headerPosition">Header position</Label>
        </div>
        <Select defaultValue={tenant.theme.headerPosition} name="headerPosition">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {HEADER_POSITIONS.map((headerPosition: any, headerPositionIndex) => (
              <SelectItem key={headerPositionIndex} value={headerPosition.key}>
                {headerPosition.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateTenantThemeLayoutForm.displayName = "UpdateTenantThemeLayoutForm";
