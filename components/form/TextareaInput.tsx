import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextareaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextareaInput({ name, defaultValue, labelText }: TextareaInputProps) {
  return (
    <div className="mt-2">
      <Label className="capitalize" htmlFor={name}>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className="leading-loose"
      />
    </div>
  );
}
export default TextareaInput;
