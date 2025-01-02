import Link from "next/link";
import {User} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import authService from "@/services/auth.service";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UpdateUserInfoForm} from "@/components/user/update-user-info-form";
import {UpdateUserEmailForm} from "@/components/user/update-user-email-form";
import {UpdateUserPasswordForm} from "@/components/user/update-user-password-form";

type MyAccountPageProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function MyAccountPage({searchParams}: MyAccountPageProps) {
  const {tab} = await searchParams;

  const {data: user} = await authService.getMe();

  const basePath = `/d/my-account`;

  return (
    <>
      <Hero
        supTitle={<Link href={"/d"}>{process.env.NEXT_PUBLIC_APP_NAME!}</Link>}
        title={"My account"}
      />

      <AppBreadcrumb
        items={[
          {
            icon: User,
            title: "My account",
          },
        ]}
      />

      <section className="container">
        <Tabs defaultValue={tab || "info"}>
          <TabsList>
            <TabsTrigger asChild value="info">
              <Link href={basePath}>Information</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="email">
              <Link href={`${basePath}?tab=email`}>Email</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="password">
              <Link href={`${basePath}?tab=password`}>Password</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <UpdateUserInfoForm user={user} />
          </TabsContent>
          <TabsContent value="email">
            <UpdateUserEmailForm user={user} />
          </TabsContent>
          <TabsContent value="password">
            <UpdateUserPasswordForm />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
