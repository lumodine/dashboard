import {ChevronLeft} from "lucide-react";
import Link from "next/link";

export const BackButton = () => {
  return (
    <Link className="inline-flex gap-1 items-center" href={"/"}>
      <ChevronLeft /> Back
    </Link>
  );
};
BackButton.displayName = "BackButton";
