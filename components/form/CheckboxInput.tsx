"use client";

import { Checkbox } from "@/components/ui/checkbox";

type CheckBoxInput = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export function CheckboxDemo({
  name,
  label,
  defaultChecked = false,
}: CheckBoxInput) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} />
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        defaultChecked={defaultChecked}
      >
        {label}
      </label>
    </div>
  );
}
