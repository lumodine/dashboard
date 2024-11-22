import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/utils/shadcn";

export type HeroProps = {
    supTitle?: string;
    title: string;
    description?: string;
    image?: string;
};

export const Hero = ({ supTitle, title, description, image }: HeroProps) => {
    const hasImage = !!image;

    return (
        <section className="bg-primary py-3">
            <div className="container">
                <div
                    className={
                        cn(
                            "p-4 grid gap-4 md:gap-8 xl:gap-20 md:items-center",
                            hasImage && "md:grid-cols-2"
                        )
                    }
                >
                    <div>
                        {
                            supTitle && (
                                <Badge variant="secondary" className="mb-2">
                                    {supTitle}
                                </Badge>
                            )
                        }
                        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                            {title}
                        </h1>
                        {
                            description && (
                                <p className="mt-3 text-lg text-white">
                                    {description}
                                </p>
                            )
                        }
                    </div>
                    {
                        hasImage && (
                            <div className="relative ms-4">
                                <Image
                                    src={image}
                                    alt={`${title} image`}
                                    width={500}
                                    height={300}
                                    loading="lazy"
                                    className="rounded-md"
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};
