import tenantService from "@/services/tenant.service";
import Link from "next/link";

export default async function DashboardPage() {
    const tenantAll = await tenantService.getAll();

    return (
        <>
            <h1>DashboardPage</h1>
            {
                !tenantAll.success && (
                    <p>
                        organizayon bulunamadı!
                    </p>
                )
            }

            {
                tenantAll.data.map((tenant, index) => (
                    <Link
                        key={index}
                        href={`/${tenant._id}`}
                    >
                        {tenant.name} ({tenant.alias})
                    </Link>
                ))
            }
        </>
    );
}
