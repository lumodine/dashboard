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
                                                <BreadcrumbLink href={item.href}>
                                                    {item.title}
                                                </BreadcrumbLink>
                                            )
                                            : (
                                                <BreadcrumbPage>
                                                    {item.title}
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
