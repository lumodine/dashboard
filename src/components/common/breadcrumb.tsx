import {Home, LucideIcon} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type AppBreadcrumbProps = {
  items: {
    icon?: LucideIcon;
    title: string;
    href?: string;
  }[];
};

export const AppBreadcrumb = ({items}: AppBreadcrumbProps) => {
  const count = items?.length || 0;

  if (count == 0) {
    return null;
  }

  items.unshift({
    icon: Home,
    title: "Ana sayfa",
    href: "/",
  });

  return (
    <section className="container py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item: any, itemIndex: number) => {
            const isLast = count === itemIndex;

            return (
              <>
                <BreadcrumbItem key={itemIndex} title={item.title}>
                  {item.href ? (
                    <BreadcrumbLink className="flex items-center gap-1" href={item.href}>
                      {item.icon && <item.icon size={16} />}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="flex items-center gap-1">
                      {item.icon && <item.icon size={16} />} {item.title}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
};
AppBreadcrumb.displayName = "AppBreadcrumb";
