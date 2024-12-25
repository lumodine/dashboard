import Link from "next/link";
import {Building2, Save, TableOfContents} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import contentService from "@/services/content.service";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

type FormGroupProps = {
  tenant: any;
  item: any;
};

const FormGroup = ({tenant, item}: FormGroupProps) => {
  return (
    <div className="border p-4 mt-4 flex flex-col gap-2">
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
                  name="descriptions"
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

type TenantTranslateAllContentsPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantTranslateAllContentsPage({
  params,
}: TenantTranslateAllContentsPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: content}] = await Promise.all([
    tenantService.getById(tenantId),
    contentService.getAllTranslatableContents(tenantId),
  ]);

  return (
    <>
      <Hero
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Translate all contents"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: TableOfContents,
            title: "Translate all contents",
          },
        ]}
      />

      <section className="container">
        <form>
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
                return <FormGroup key={categoryIndex} item={category} tenant={tenant} />;
              })}
            </TabsContent>
            <TabsContent value="products">
              {content.products.map((product: any, productIndex: number) => {
                return <FormGroup key={productIndex} item={product} tenant={tenant} />;
              })}
            </TabsContent>
            <TabsContent value="tags">
              {content.tags.map((tag: any, tagIndex: number) => {
                return <FormGroup key={tagIndex} item={tag} tenant={tenant} />;
              })}
            </TabsContent>
            <TabsContent value="announcements">
              {content.announcements.map((announcement: any, announcementIndex: number) => {
                return <FormGroup key={announcementIndex} item={announcement} tenant={tenant} />;
              })}
            </TabsContent>
            <TabsContent value="tenantBranches">
              {content.tenantBranches.map((tenantBranch: any, tenantBranchIndex: number) => {
                return <FormGroup key={tenantBranchIndex} item={tenantBranch} tenant={tenant} />;
              })}
            </TabsContent>
          </Tabs>

          <Button className="w-full sticky left-0 bottom-5 my-5">
            <Save /> Save
          </Button>
        </form>
      </section>
    </>
  );
}
