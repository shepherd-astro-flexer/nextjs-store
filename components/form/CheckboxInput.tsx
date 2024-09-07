"use client";

import { Checkbox } from "@/components/ui/checkbox";

type CheckBoxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckBoxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} />
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
        defaultChecked={defaultChecked}
      >
        {label}
      </label>
    </div>
  );
}
