"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {ColorRadioGroup} from "@/components/common/color-radio-group";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import updateTenantThemeColor from "@/actions/tenant/updateTenantThemeColor";

export type UpdateTenantThemeColorFormProps = {
  tenant: any;
  colors: any[];
};

export const UpdateTenantThemeColorForm = ({tenant, colors}: UpdateTenantThemeColorFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const clientAction = async (formData: FormData) => {
    const response = await updateTenantThemeColor(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  return (
    <form action={clientAction} className="w-full flex flex-col gap-4">
      <ColorRadioGroup colors={colors} defaultValue={tenant.theme.color} />

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateTenantThemeColorForm.displayName = "UpdateTenantThemeColorForm";
