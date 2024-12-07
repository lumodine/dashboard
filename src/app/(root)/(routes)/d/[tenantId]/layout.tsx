import {notFound} from "next/navigation";
import React from "react";
import tenantService from "@/services/tenant.service";
import { IframeReloadProvider } from "@/contexts/iframeReloadContext";

type TenantLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function TenantLayout({children, params}: Readonly<TenantLayoutProps>) {
  const {tenantId} = await params;
  const tenant = await tenantService.getById(tenantId);

  if (!tenant.success) {
    return notFound();
  }

  return <IframeReloadProvider>{children}</IframeReloadProvider>;
}
