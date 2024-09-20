import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function RatingInput() {
  const numbers = Array.from({ length: 5 }, (_, idx) => {
    let value = idx + 1;

    return value.toString();
  });
  console.log(numbers);
  return (
    <div className="max-w-xs">
      <Label htmlFor="rating">rating</Label>
      <Select name="rating" value={numbers[0]}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        {/* <SelectContent id="rating">{numbers.map()}</SelectContent> */}
      </Select>
    </div>
  );
}
export default RatingInput;
