import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import type { AuthSwitchConfigType } from "../../types/types";

export function AuthSwitch({ config }: { config: AuthSwitchConfigType }) {
  const { className, text, to, variant, linkText } = config;
  return (
    <div className="flex justify-center items-center gap-1">
      {text && <p className={className}>{text}</p>}
      <Button as={Link} to={to} variant={variant}>
        {linkText}
      </Button>
    </div>
  );
}
