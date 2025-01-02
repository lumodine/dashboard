import {Building2, Users} from "lucide-react";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import tenantService from "@/services/tenant.service";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import userService from "@/services/user.service";
import {TenantUserList} from "@/components/tenant/tenant-user-list";
import {TenantUserCreateForm} from "@/components/tenant/tenant-user-create-form";

type TenantUsersPageProps = {
  params: Promise<{
    tenantId: string;
  }>;
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function TenantUsersPage({params, searchParams}: TenantUsersPageProps) {
  const {tenantId} = await params;
  const {tab} = await searchParams;

  const [{data: tenant}, {data: users}] = await Promise.all([
    tenantService.getById(tenantId),
    userService.getAll(tenantId),
  ]);

  const basePath = `/d/${tenant._id}/users`;

  return (
    <>
      <Hero
        description={"Manage user accounts and authorization for your team."}
        supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>}
        title={"Users"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: Building2,
            title: tenant.name,
            href: `/d/${tenantId}`,
          },
          {
            icon: Users,
            title: "Users",
          },
        ]}
      />

      <section className="container">
        <Tabs className="w-full" defaultValue={tab || "users"}>
          <TabsList>
            <TabsTrigger asChild value="users">
              <Link href={basePath}>Users</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="add-user">
              <Link href={`${basePath}?tab=add-user`}>Add user</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <TenantUserList tenant={tenant} users={users} />
          </TabsContent>
          <TabsContent value="add-user">
            <TenantUserCreateForm tenant={tenant} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
