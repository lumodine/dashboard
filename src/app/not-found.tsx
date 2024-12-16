import {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: "noindex, nofollow",
};

export default function NotFoundPage() {
  return (
    <div className="grid h-screen px-4 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-4xl">Page not found!</h1>

        <p className="my-4 text-muted-foreground">
          Sorry, we couldn't find the page you were looking for.
        </p>

        <Link href={"/d"}>
          <Button variant={"default"}>Go to home page</Button>
        </Link>
      </div>
    </div>
  );
}
