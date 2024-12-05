import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <Link href={process.env.NEXT_PUBLIC_LANDING_URL!} target="_blank">
        <Image
          alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`}
          className="rounded-full"
          height={80}
          loading="lazy"
          src="https://cdn.lumodine.com/public/logo.jpg"
          width={80}
        />
      </Link>
    </header>
  );
};
