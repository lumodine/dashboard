"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
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
      <RadioGroup
        className="flex items-center justify-center flex-wrap gap-2"
        defaultValue={tenant.theme.color}
        name="color"
      >
        {colors.map((color: any, colorIndex: number) => (
          <Label key={colorIndex} className="cursor-pointer hover:scale-95" htmlFor={color}>
            <div
              className={`flex flex-col items-center justify-center gap-3 bg-gray-100 rounded-lg p-4 theme-${color}`}
            >
              <div className="p-6 rounded-full bg-primary w-10 h-10" />
              <div className="flex items-center gap-1">
                <RadioGroupItem id={color} value={color} />
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateTenantThemeColorForm.displayName = "UpdateTenantThemeColorForm";
