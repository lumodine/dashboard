import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, LucideIcon } from "lucide-react";

export type AppBreadcrumbProps = {
    items: {
        icon?: LucideIcon;
        title: string;
        href?: string;
    }[];
};

export const AppBreadcrumb = ({ items }: AppBreadcrumbProps) => {
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
                    {
                        items.map((item: any, itemIndex: number) => {
                            const isLast = count === itemIndex;

                            return (
                                <>
                                    <BreadcrumbItem key={itemIndex}>
                                        {
                                            item.href
                                                ? (
                                                    <BreadcrumbLink
                                                        href={item.href}
                                                        className="flex items-center gap-1"
                                                    >
                                                        {
                                                            item.icon && (
                                                                <item.icon size={16} />
                                                            )
                                                        } {item.title}
                                                    </BreadcrumbLink>
                                                )
                                                : (
                                                    <BreadcrumbPage
                                                        className="flex items-center gap-1"
                                                    >
                                                        {
                                                            item.icon && (
                                                                <item.icon size={16} />
                                                            )
                                                        } {item.title}
                                                    </BreadcrumbPage>
                                                )
                                        }
                                    </BreadcrumbItem>
                                    {
                                        !isLast && (
                                            <BreadcrumbSeparator />
                                        )
                                    }
                                </>
                            );
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </section>
    );
};
AppBreadcrumb.displayName = "AppBreadcrumb";
