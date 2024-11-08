import { UserMenu } from "./user-menu";
import { Navigation } from "./navigation";
import { TenantSwitcher } from "./tenant-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigations = [
  {
    title: "İçerik",
    url: "#",
    items: [
      {
        title: "Kategoriler",
        url: "#",
      },
      {
        title: "Ürün birimleri",
        url: "#",
      },
      {
        title: "Ürünler",
        url: "#",
      },
    ],
  },
  {
    title: "Sistem",
    url: "#",
    items: [
      {
        title: "Diller",
        url: "#",
      },
      {
        title: "Para birimleri",
        url: "#",
      },
      {
        title: "QR",
        url: "#",
      },
    ],
  },
];

export type DashboardSidebarProps = {
  tenant: any;
  tenants: any[];
  user: any;
};

export const DashboardSidebar = async ({
  tenant,
  tenants,
  user
}: DashboardSidebarProps) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TenantSwitcher
          tenant={tenant}
          tenants={tenants}
        />
      </SidebarHeader>
      
      <SidebarContent>
        {
          tenant && (
            <Navigation items={navigations} />
          )
        }
      </SidebarContent>

      <SidebarFooter>
        <UserMenu user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
};
