"use client";

import React, {forwardRef, useState} from "react";
import {Check, EyeIcon, EyeOffIcon, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {cn} from "@/utils/shadcn";

const Icon = (value: boolean) => {
  return value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />;
};

const Color = (value: boolean) => {
  return value ? "text-green-600" : "text-rose-600";
};

const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({className, ...props}, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState("");
    const [criteria, setCriteria] = useState({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setPassword(value);

      setCriteria({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[@$!%*?&]/.test(value),
      });
    };

    return (
      <div>
        <div className="relative">
          <Input
            ref={ref}
            className={cn("pr-10", className)}
            defaultValue={password}
            pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$"}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            {...props}
          />
          <Button
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </div>
        <ul className="mt-3 text-sm">
          <li className={`flex items-center ${Color(criteria.minLength)}`}>
            <span className="mr-1">{Icon(criteria.minLength)}</span>
            <span className="text-xs">At least 8 characters</span>
          </li>
          <li className={`flex items-center ${Color(criteria.uppercase)}`}>
            <span className="mr-1">{Icon(criteria.uppercase)}</span>
            <span className="text-xs">At least one uppercase letter</span>
          </li>
          <li className={`flex items-center ${Color(criteria.lowercase)}`}>
            <span className="mr-1">{Icon(criteria.lowercase)}</span>
            <span className="text-xs">At least one lowercase letter</span>
          </li>
          <li className={`flex items-center ${Color(criteria.number)}`}>
            <span className="mr-1">{Icon(criteria.number)}</span>
            <span className="text-xs">At least one number</span>
          </li>
          <li className={`flex items-center ${Color(criteria.specialChar)}`}>
            <span className="mr-1">{Icon(criteria.specialChar)}</span>
            <span className="text-xs">At least one special character (@, $, !, %, *, ?, &)</span>
          </li>
        </ul>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export {PasswordInput};
