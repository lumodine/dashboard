"use client";

import React from "react";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export type FontRadioGroupProps = {
  fonts: any[];
  defaultValue?: string;
};

export const FontRadioGroup = ({fonts, defaultValue}: FontRadioGroupProps) => {
  return (
    <RadioGroup
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center flex-wrap gap-2"
      defaultValue={defaultValue || fonts[0]}
      name="font"
    >
      {fonts.map((font: any, fontIndex: number) => (
        <React.Fragment key={fontIndex}>
          <link href={`https://cdn.lumodine.com/public/fonts/${font}.css`} rel="stylesheet" />
          <Label className="cursor-pointer hover:scale-95" htmlFor={font}>
            <div className="flex flex-col items-center justify-center gap-3 bg-gray-100 rounded-lg p-4">
              <div className={`flex flex-col items-start justify-center gap-1 font-${font}`}>
                <span className="text-4xl">Lorem</span>
                <span className="text-2xl">Lorem</span>
                <span className="text-xl">Lorem</span>
                <span className="text-lg">Lorem</span>
                <span className="text-sm">Lorem</span>
                <span className="text-xs">Lorem</span>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem id={font} value={font} />
              </div>
            </div>
          </Label>
        </React.Fragment>
      ))}
    </RadioGroup>
  );
};
FontRadioGroup.displayName = "FontRadioGroup";
