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
};

export default async function TenantUsersPage({params}: TenantUsersPageProps) {
  const {tenantId} = await params;
  const [{data: tenant}, {data: users}] = await Promise.all([
    tenantService.getById(tenantId),
    userService.getAll(tenantId),
  ]);

  return (
    <>
      <Hero supTitle={<Link href={`/d/${tenant._id}`}>{tenant.name}</Link>} title={"Users"} />

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
        <Tabs className="w-full" defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="create-user">Add user</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <TenantUserList tenant={tenant} users={users} />
          </TabsContent>
          <TabsContent value="create-user">
            <TenantUserCreateForm tenant={tenant} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
