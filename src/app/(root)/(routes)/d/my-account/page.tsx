import Link from "next/link";
import {User} from "lucide-react";
import {AppBreadcrumb} from "@/components/common/breadcrumb";
import {Hero} from "@/components/common/hero";
import authService from "@/services/auth.service";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UpdateUserInfoForm} from "@/components/user/update-user-info-form";
import {UpdateUserEmailForm} from "@/components/user/update-user-email-form";
import {UpdateUserPasswordForm} from "@/components/user/update-user-password-form";

export default async function MyAccountPage() {
  const {data: user} = await authService.getMe();

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
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
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
