"use client";

import {Save} from "lucide-react";
import {SubmitButton} from "../common/submit-button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import updateTranslateAllContents from "@/actions/content/updateTranslateAllContents";

type TranslateAllContentsFormGroupProps = {
  type: string;
  order: number;
  tenant: any;
  item: any;
};

const TranslateAllContentsFormGroup = ({
  type,
  order,
  tenant,
  item,
}: TranslateAllContentsFormGroupProps) => {
  return (
    <div className="border rounded-sm p-4 mt-4 flex flex-col gap-2">
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
                  name={`${type}[${order}][item][${item._id}][language][${language.language._id}][title]`}
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
                  name={`${type}[${order}][item][${item._id}][language][${language.language._id}][description]`}
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

const TranslateAllContentsForm = ({tenant, content}: TranslateAllContentsFormProps) => {
  const clientAction = async (formData: FormData) => {
    await updateTranslateAllContents(tenant._id, formData);
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categories ({content.categories.length})</TabsTrigger>
          <TabsTrigger value="products">Products ({content.products.length})</TabsTrigger>
          <TabsTrigger value="tags">Tags ({content.tags.length})</TabsTrigger>
          <TabsTrigger value="announcements">
            Announcements ({content.announcements.length})
          </TabsTrigger>
          <TabsTrigger value="tenantBranches">
            Tenant Branches ({content.tenantBranches.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          {content.categories.map((category: any, categoryIndex: number) => {
            return (
              <TranslateAllContentsFormGroup
                key={`categories-${categoryIndex}`}
                item={category}
                order={categoryIndex + 1}
                tenant={tenant}
                type={"categories"}
              />
            );
          })}
        </TabsContent>
        <TabsContent value="products">
          {content.products.map((product: any, productIndex: number) => {
            return (
              <TranslateAllContentsFormGroup
                key={`products-${productIndex}`}
                item={product}
                order={productIndex + 1}
                tenant={tenant}
                type={"products"}
              />
            );
          })}
        </TabsContent>
        <TabsContent value="tags">
          {content.tags.map((tag: any, tagIndex: number) => {
            return (
              <TranslateAllContentsFormGroup
                key={`tags-${tagIndex}`}
                item={tag}
                order={tagIndex + 1}
                tenant={tenant}
                type={"tags"}
              />
            );
          })}
        </TabsContent>
        <TabsContent value="announcements">
          {content.announcements.map((announcement: any, announcementIndex: number) => {
            return (
              <TranslateAllContentsFormGroup
                key={`announcements-${announcementIndex}`}
                item={announcement}
                order={announcementIndex + 1}
                tenant={tenant}
                type={"announcements"}
              />
            );
          })}
        </TabsContent>
        <TabsContent value="tenantBranches">
          {content.tenantBranches.map((tenantBranch: any, tenantBranchIndex: number) => {
            return (
              <TranslateAllContentsFormGroup
                key={`tenantBranches-${tenantBranchIndex}`}
                item={tenantBranch}
                order={tenantBranchIndex + 1}
                tenant={tenant}
                type={"tenantBranches"}
              />
            );
          })}
        </TabsContent>
      </Tabs>

      <SubmitButton className="w-full sticky left-0 bottom-5 my-5">
        <Save /> Save
      </SubmitButton>
    </form>
  );
};

export {TranslateAllContentsForm};
