import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header>
            <Link href={process.env.NEXT_PUBLIC_LANDING_URL!} target="_blank">
                <Image
                    src="https://picsum.photos/80/80"
                    alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="rounded-full"
                />
            </Link>
        </header>
    );
};
