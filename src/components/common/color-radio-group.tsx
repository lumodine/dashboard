"use client";

import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export type ColorRadioGroupProps = {
  colors: any[];
  defaultValue?: string;
};

export const ColorRadioGroup = ({colors, defaultValue}: ColorRadioGroupProps) => {
  return (
    <RadioGroup
      className="flex items-center justify-center flex-wrap gap-2"
      defaultValue={defaultValue}
      name="color"
    >
      {colors.map((color: any, colorIndex: number) => (
        <Label key={colorIndex} className="cursor-pointer hover:scale-95" htmlFor={color}>
          <div
            className={`flex flex-col items-center justify-center gap-3 bg-gray-100 rounded-lg p-4 theme-${color}`}
          >
            <div className="p-6 rounded-full bg-primary w-10 h-10" />
            <div className="flex items-center gap-1">
              <RadioGroupItem id={color} value={color} />
            </div>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
};
ColorRadioGroup.displayName = "ColorRadioGroup";
