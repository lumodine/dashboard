"use client";

import {toast} from "react-toastify";
import {Plus} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/common/submit-button";
import createTag from "@/actions/tag/createTag";
import {ColorRadioGroup} from "@/components/common/color-radio-group";

export type CreateTagFormProps = {
  tenant: any;
  colors: any[];
};

export const CreateTagForm = ({tenant, colors}: CreateTagFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await createTag(tenant._id, formData);

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
          <Label>Name (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => (
            <div key={languageIndex}>
              <Label htmlFor={`names-${language.language._id}`}>
                {language.language.name} - {language.language.shortName} (*)
              </Label>
              <Input required id={`names-${language.language._id}`} name="names" type="text" />
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

      <div className="flex items-center space-x-2">
        <Checkbox id="isShowInMenu" name="isShowInMenu" />
        <Label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="isShowInMenu"
        >
          Show in menu
        </Label>
      </div>

      <ColorRadioGroup colors={colors} />

      <span className="text-xs">(*) Required field</span>
      <SubmitButton>
        <Plus /> Create tag
      </SubmitButton>
    </form>
  );
};
CreateTagForm.displayName = "CreateTagForm";
