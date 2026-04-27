import FormGroup from "./FormGroup";
import { Input } from "./Input";
import { Label } from "./Label";
import { Textarea } from "./Textarea";

type Props = {
  label: string;
  required?: boolean;
  value: string;
  name: string;
  type: string;
  id: string;
  rows?: number;
  maxLength?: number;
  labelType?: "hidden" | "visible";
  onChange: (value: string) => void;
};
export default function FormControl({
  label,
  labelType = "visible",
  value = "",
  name,
  id,
  type,
  rows,
  maxLength,
  required = false,
  onChange,
}: Props) {
  return (
    <FormGroup>
      <Label htmlFor={id} className={labelType === "hidden" ? "sr-only" : ""}>
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          required={required}
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          maxLength={maxLength}
        ></Textarea>
      ) : (
        <Input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={name}
          maxLength={maxLength}
        />
      )}
    </FormGroup>
  );
}
