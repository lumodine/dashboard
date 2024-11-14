import tenantService from "@/services/tenant.service";
import { notFound } from "next/navigation";

type TenantLayoutProps = {
  children: React.ReactNode;
  params: {
    tenantId: string,
  };
};

export default async function TenantLayout({
  children,
  params,
}: Readonly<TenantLayoutProps>) {
  const { tenantId } = await params;
  const tenantAll = await tenantService.getAll();

  if (!tenantAll.success) {
    return notFound();
  }

  const tenant = tenantAll.data.find(tenant => tenant._id === tenantId);
  if (!tenant) {
    notFound();
  }

  return (
    <>
      {children}
    </>
  );
}
