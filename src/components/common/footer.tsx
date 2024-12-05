import Link from "next/link";

export const Footer = () => {
  const startYear = 2024;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const year = startYear === currentYear ? startYear : `${startYear}-${currentYear}`;

  return (
    <footer className="my-12">
      <div className="container flex flex-col items-center justify-center gap-6">
        <p className="text-xs">
          &copy; {year} &#x2022;{" "}
          <Link className="underline" href={process.env.NEXT_PUBLIC_LANDING_URL!} target="_blank">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>{" "}
          &#x2022; Tüm hakları saklıdır
        </p>
      </div>
    </footer>
  );
};
Footer.displayName = "Footer";
