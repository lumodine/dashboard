import {Plus} from "lucide-react";
import Link from "next/link";
import {Hero} from "@/components/common/hero";
import {TenantList} from "@/components/tenant/tenant-list";
import {Button} from "@/components/ui/button";
import tenantService from "@/services/tenant.service";

export default async function DashboardPage() {
  const {data: tenants} = await tenantService.getAll();

  return (
    <>
      <Hero title={process.env.NEXT_PUBLIC_APP_NAME!} />

      <main className="container my-4">
        <div className="inline-flex gap-2 justify-start items-center mb-3">
          <Link href={"/d/create"}>
            <Button size={"sm"}>
              <Plus size={14} /> Add new tenant
            </Button>
          </Link>
        </div>

        <TenantList tenants={tenants} />
      </main>
    </>
  );
}
