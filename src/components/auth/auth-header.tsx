import Image from "next/image";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header>
      <Link
        className="flex gap-2 items-center justify-center"
        href={process.env.NEXT_PUBLIC_LANDING_URL!}
        target="_blank"
      >
        <Image
          alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`}
          height={50}
          loading="lazy"
          src="https://cdn.lumodine.com/public/logo.jpg?v=1"
          width={50}
        />
        <b>{process.env.NEXT_PUBLIC_APP_NAME}</b>
      </Link>
    </header>
  );
};
AuthHeader.displayName = "AuthHeader";
