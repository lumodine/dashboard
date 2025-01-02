"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {FontRadioGroup} from "@/components/common/font-radio-group";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import updateTenantThemeFont from "@/actions/tenant/updateTenantThemeFont";

export type UpdateTenantThemeFontFormProps = {
  tenant: any;
  fonts: any[];
};

export const UpdateTenantThemeFontForm = ({tenant, fonts}: UpdateTenantThemeFontFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const clientAction = async (formData: FormData) => {
    const response = await updateTenantThemeFont(tenant._id, formData);

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
    <form action={clientAction} className="w-full flex flex-col gap-4">
      <FontRadioGroup defaultValue={tenant.theme.font} fonts={fonts} />

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateTenantThemeFontForm.displayName = "UpdateTenantThemeFontForm";
