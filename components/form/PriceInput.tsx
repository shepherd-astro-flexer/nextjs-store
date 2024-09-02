import { Input } from "../ui/input";
import { Label } from "../ui/label";

const name = "price";
type PriceInputProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: PriceInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {name}
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        defaultValue={defaultValue || 100}
        min={0}
        required
      />
    </div>
  );
}
export default PriceInput;
