"use client";

import {Save} from "lucide-react";
import {toast} from "react-toastify";
import {SubmitButton} from "../common/submit-button";
import {NotFound} from "../common/error";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import updateTranslateAllContents from "@/actions/content/updateTranslateAllContents";

type TranslateAllContentsFormGroupProps = {
  type: string;
  tenant: any;
  item: any;
};

const TranslateAllContentsFormGroup = ({
  type,
  tenant,
  item,
}: TranslateAllContentsFormGroupProps) => {
  return (
    <div className="border rounded-sm p-4 mt-4 flex flex-col gap-2">
      <Input defaultValue={item._id} name={`${type}_items`} type="hidden" />
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label>Title (*)</Label>
        </div>
        <div className="pl-3 mt-2 flex flex-col gap-2">
          {tenant.languages.map((language: any, languageIndex: number) => {
            const translation = item.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`titles-${item._id}-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName} (*)
                </Label>
                <Input
                  required
                  defaultValue={translation?.title}
                  id={`titles-${item._id}-${language.language._id}`}
                  name={`${type}[${item._id}][${language.language._id}][title]`}
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
            const translation = item.translations.find(
              (translation: any) => translation.language._id === language.language._id,
            );

            return (
              <div key={languageIndex}>
                <Label htmlFor={`descriptions-${item._id}-${language.language._id}`}>
                  {language.language.name} - {language.language.shortName}
                </Label>
                <Input
                  defaultValue={translation?.description}
                  id={`descriptions-${item._id}-${language.language._id}`}
                  name={`${type}[${item._id}][${language.language._id}][description]`}
                  type="text"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type TranslateAllContentsFormProps = {
  tenant: any;
  content: any;
};

const tabs = [
  {
    title: "Categories",
    type: "categories",
  },
  {
    title: "Products",
    type: "products",
  },
  {
    title: "Tags",
    type: "tags",
  },
  {
    title: "Announcements",
    type: "announcements",
  },
  {
    title: "Tenant Branches",
    type: "tenantBranches",
  },
];

const TranslateAllContentsForm = ({tenant, content}: TranslateAllContentsFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await updateTranslateAllContents(tenant._id, formData);

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
          required
          defaultValue={language.language._id}
          name="languages"
          type="hidden"
        />
      ))}

      <Tabs defaultValue={tabs[0].type}>
        <TabsList>
          {tabs.map((tab: any, tabIndex: number) => (
            <TabsTrigger key={tabIndex} value={tab.type}>
              {tab.title} ({content[tab.type]?.length || 0})
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab: any, tabIndex: number) => {
          const hasItems = content[tab.type]?.length > 0;

          return (
            <TabsContent key={tabIndex} value={tab.type}>
              {!hasItems && <NotFound title={"Items not found."} />}
              {hasItems && (
                <>
                  <Input required defaultValue={tab.type} name="type" type="hidden" />
                  {content[tab.type].map((item: any, itemIndex: number) => {
                    return (
                      <TranslateAllContentsFormGroup
                        key={`${tab.type}-${itemIndex}`}
                        item={item}
                        tenant={tenant}
                        type={tab.type}
                      />
                    );
                  })}

                  <SubmitButton className="w-full sticky left-0 bottom-5 my-5">
                    <Save /> Save
                  </SubmitButton>
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </form>
  );
};

export {TranslateAllContentsForm};
