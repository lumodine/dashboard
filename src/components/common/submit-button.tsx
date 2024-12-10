import {LoaderCircle} from "lucide-react";
import {useFormStatus} from "react-dom";
import React from "react";
import {Button, ButtonProps} from "@/components/ui/button";
import {cn} from "@/utils/shadcn";

export type SubmitButtonProps = {
  children: React.ReactNode;
} & ButtonProps;

export function SubmitButton({children, variant, className}: SubmitButtonProps) {
  const {pending} = useFormStatus();

  return (
    <Button className={cn("w-full", className)} disabled={pending} type="submit" variant={variant}>
      {children} {pending && <LoaderCircle className="animate-spin" />}
    </Button>
  );
}
SubmitButton.displayName = "SubmitButton";
