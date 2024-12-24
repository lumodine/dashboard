"use client";

import React, {forwardRef, useState} from "react";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/shadcn";

const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({className, ...props}, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          className={cn("pr-10", className)}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <Button
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          size="sm"
          type="button"
          variant="ghost"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeIcon aria-hidden="true" className="h-4 w-4" />
          ) : (
            <EyeOffIcon aria-hidden="true" className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export {PasswordInput};
