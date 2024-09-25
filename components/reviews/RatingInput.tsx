"use client";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function RatingInput() {
  const numbers = Array.from({ length: 5 }, (_, idx) => {
    let value = idx + 1;

    return value.toString();
  }).reverse();

  return (
    <div className="max-w-xs">
      <Label htmlFor="rating" className="capitalize">
        rating
      </Label>
      <Select name="rating" defaultValue={numbers[0]}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {numbers.map((number) => {
              return (
                <SelectItem key={number} value={number}>
                  {number}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
export default RatingInput;
