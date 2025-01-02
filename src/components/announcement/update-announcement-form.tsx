"use client";

import {toast} from "react-toastify";
import {Save} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {formatDate} from "@/utils/date";
import {useIframeReloadContext} from "@/contexts/iframeReloadContext";
import {SubmitButton} from "@/components/common/submit-button";
import updateAnnouncement from "@/actions/announcement/updateAnnouncement";

export type UpdateAnnouncementFormProps = {
  tenant: any;
  announcement: any;
};

export const UpdateAnnouncementForm = ({tenant, announcement}: UpdateAnnouncementFormProps) => {
  const {reloadIframe} = useIframeReloadContext();

  const clientAction = async (formData: FormData) => {
    const response = await updateAnnouncement(
      tenant._id,
      tenant.languages,
      announcement._id,
      formData,
    );

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
    <form action={clientAction} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Title (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = announcement.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`titles-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName} (*)
                </Label>
                <Input
                  required
                  defaultValue={item?.title}
                  id={`titles-${language.language._id}`}
                  name="titles"
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Description</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const item = announcement.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`descriptions-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName}
                </Label>
                <Input
                  defaultValue={item?.description}
                  id={`descriptions-${language.language._id}`}
                  name="descriptions"
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-xs">(*) Required field</span>

      <div className="flex flex-col sm:flex-row justify-between gap-1">
        <span className="text-muted-foreground text-xs">
          <b>Creation date</b>: {formatDate(announcement.createdAt)}
        </span>
        <span className="text-muted-foreground text-xs">
          <b>Update date</b>: {formatDate(announcement.updatedAt)}
        </span>
      </div>

      <SubmitButton>
        <Save /> Save
      </SubmitButton>
    </form>
  );
};
UpdateAnnouncementForm.displayName = "UpdateAnnouncementForm";
