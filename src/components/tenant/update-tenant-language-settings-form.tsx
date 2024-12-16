"use client";

import {Plus, Save, Trash} from "lucide-react";
import {useState} from "react";
import {toast} from "react-toastify";
import updateTenantLanguageSettings from "@/actions/tenant/updateTenantLanguageSettings";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {NotFound} from "@/components/common/error";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";

export type UpdateTenantLanguageSettingsFormProps = {
  languages: any[];
  tenant: any;
};

export const UpdateTenantLanguageSettingsForm = ({
  languages,
  tenant,
}: UpdateTenantLanguageSettingsFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const _tenantLanguages = languages.filter((language) =>
    tenant.languages.some((tenantLanguage: any) => tenantLanguage.language._id === language._id),
  );

  const _defaultLanguageId =
    tenant.languages.find((tenantLanguage: any) => tenantLanguage.isDefault).language._id ||
    _tenantLanguages[0]._id;

  const _defaultLanguage = _tenantLanguages.find(
    (tenantLanguage) => tenantLanguage._id === _defaultLanguageId,
  );

  const _otherLanguages = _tenantLanguages.filter(
    (language) => language._id !== _defaultLanguage._id,
  );

  const _addableLanguages = languages.filter(
    (language) => !_tenantLanguages.some((tenantLanguage) => tenantLanguage._id === language._id),
  );

  const [defaultLanguage, setDefaultLanguage] = useState<any>(_defaultLanguage);
  const [otherLanguages, setOtherLanguages] = useState<any[]>(_otherLanguages);

  const [addableLanguages, setAddableLanguages] = useState<any[]>(_addableLanguages);
  const [newLanguageId, setNewLanguageId] = useState<string>();

  const clientAction = async (formData: FormData) => {
    const response = await updateTenantLanguageSettings(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }

    reloadIframe();
  };

  const removeLanguage = (language: any) => {
    let tempOtherLanguages = [...otherLanguages];

    tempOtherLanguages = tempOtherLanguages.filter(
      (tempOtherLanguage) => tempOtherLanguage._id !== language._id,
    );

    setOtherLanguages(tempOtherLanguages);

    let tempAddableLanguages = [...addableLanguages];

    tempAddableLanguages.push(language);

    setAddableLanguages(tempAddableLanguages);
  };

  const addDefaultLanguage = (language: any) => {
    let tempOtherLanguages = [...otherLanguages];

    tempOtherLanguages = tempOtherLanguages.filter(
      (tempOtherLanguage) => tempOtherLanguage._id !== language._id,
    );

    tempOtherLanguages.push(defaultLanguage);

    setOtherLanguages(tempOtherLanguages);

    setDefaultLanguage(language);
  };

  const addNewLanguage = () => {
    if (!newLanguageId) {
      return;
    }

    const language = addableLanguages.find(
      (addableLanguage) => addableLanguage._id === newLanguageId,
    );

    let tempAddableLanguages = [...addableLanguages];

    tempAddableLanguages = tempAddableLanguages.filter(
      (tempAddableLanguage) => tempAddableLanguage._id !== language._id,
    );

    setAddableLanguages(tempAddableLanguages);

    let tempOtherLanguages = [...otherLanguages];

    tempOtherLanguages.push(language);

    setOtherLanguages(tempOtherLanguages);

    setNewLanguageId("");
  };

  return (
    <form action={clientAction} className="w-full flex flex-col gap-4">
      <Input defaultValue={defaultLanguage._id} name="defaultLanguage" type="hidden" />

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="defaultLanguage">Default language</Label>
        </div>
        <span>
          {defaultLanguage.name} ({defaultLanguage.shortName})
        </span>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Other languages</Label>
        </div>
        <div className="flex flex-col gap-2">
          {otherLanguages.length === 0 && (
            <NotFound title="You have not added any other languages. Add one now." />
          )}

          {addableLanguages.length > 0 && (
            <div className="flex items-center gap-2">
              <Select onValueChange={(value) => setNewLanguageId(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {addableLanguages.map((language: any, languageIndex: number) => (
                    <SelectItem key={languageIndex} value={language._id}>
                      {language.name} ({language.shortName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addNewLanguage}>
                <Plus size={14} /> Add language
              </Button>
            </div>
          )}

          <SubmitButton>
            <Save /> Save
          </SubmitButton>

          {otherLanguages.map((language: any, languageIndex: number) => (
            <div
              key={languageIndex}
              className="flex justify-between items-center gap-3 p-2 border rounded-lg"
            >
              <Input defaultValue={language._id} name="otherLanguages" type="hidden" />
              <div className="flex gap-2 items-center">
                <Button
                  size={"sm"}
                  type="button"
                  variant={"outline"}
                  onClick={() => addDefaultLanguage(language)}
                >
                  Make default language
                </Button>
                <span>
                  {language.name} ({language.shortName})
                </span>
              </div>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => removeLanguage(language)}
              >
                <Trash size={14} /> Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
UpdateTenantLanguageSettingsForm.displayName = "UpdateTenantLanguageSettingsForm";
