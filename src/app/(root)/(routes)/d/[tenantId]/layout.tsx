import tenantService from "@/services/tenant.service";
import { notFound } from "next/navigation";

type TenantLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tenantId: string,
  }>;
};

export default async function TenantLayout({
  children,
  params,
}: Readonly<TenantLayoutProps>) {
  const { tenantId } = await params;
  const tenant = await tenantService.getById(tenantId);

  if (!tenant.success) {
    return notFound();
  }

  return (
    <>
      {children}
    </>
  );
}
