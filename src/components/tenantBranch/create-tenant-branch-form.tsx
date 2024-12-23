"use client";

import {toast} from "react-toastify";
import {Plus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/common/submit-button";
import createTenantBranch from "@/actions/tenantBranch/createTenantBranch";

export type CreateTenantBranchFormProps = {
  tenant: any;
};

export const CreateTenantBranchForm = ({tenant}: CreateTenantBranchFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await createTenantBranch(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      {tenant.languages.map((language: any, languageIndex: number) => (
        <Input
          key={languageIndex}
          defaultValue={language.language._id}
          name="languages"
          type="hidden"
        />
      ))}

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Title (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor={`titles-${language.language._id}`}>
                {language.language.name} - {language.language.shortName} (*)
              </Label>
              <Input required id={`titles-${language.language._id}`} name="titles" type="text" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Description</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor={`descriptions-${language.language._id}`}>
                {language.language.name} - {language.language.shortName}
              </Label>
              <Input id={`descriptions-${language.language._id}`} name="descriptions" type="text" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="address">Address (*)</Label>
        </div>
        <Input required id="address" name="address" type="text" />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="lat">Latitude (*)</Label>
        </div>
        <Input required id="lat" name="lat" step={0.01} type="number" />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="lng">Longitude (*)</Label>
        </div>
        <Input required id="lng" name="lng" step={0.01} type="number" />
      </div>

      <span className="text-xs">(*) Required field</span>

      <SubmitButton>
        <Plus /> Create branch
      </SubmitButton>
    </form>
  );
};
CreateTenantBranchForm.displayName = "CreateTenantBranchForm";
