import { Link } from "react-router-dom";
import { Button, buttonStyles } from "../ui/Button";
import type { VariantProps } from "class-variance-authority";

type AuthSwitchProps = {
  text?: string;
  linkText: string;
  to: string;
  className?: string;
  variant: VariantProps<typeof buttonStyles>["variant"];
};
export function AuthSwitch({
  className = "",
  text,
  linkText,
  to,
  variant,
}: AuthSwitchProps) {
  return (
    <div className="flex justify-center gap-1">
      {text && <p className={className}>{text}</p>}
      <Button as={Link} to={to} variant={variant}>
        {linkText}
      </Button>
    </div>
  );
}
