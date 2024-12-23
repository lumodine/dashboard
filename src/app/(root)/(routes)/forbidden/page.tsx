import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Forbidden",
  robots: "noindex, nofollow",
};

export default function ForbiddenPage() {
  return (
    <div className="grid h-screen px-4 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-4xl">Forbidden!</h1>

        <p className="my-4 text-muted-foreground">
          Sorry, you don&apos;t have permission to access this page.
        </p>
      </div>
    </div>
  );
}
