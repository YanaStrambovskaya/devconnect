import {
  useState,
  type HTMLInputTypeAttribute,
  type ReactNode,
  type FormEvent,
} from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/useAuth";
import FormGroup from "../ui/FormGroup";

export type FormState = {
  email: string;
  password: string;
};
export type InputConfig = {
  name: keyof FormState;
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  icon: ReactNode;
};

export function Form({ inputConfig }: { inputConfig: InputConfig[] }) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { resetPassword } = useAuth();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setEmail(value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      await resetPassword(email);
      setSuccess("Check you mailbox for further instructions");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form id="registration-form" onSubmit={handleSubmit}>
        {inputConfig.map(({ name, id, type, label, icon }) => {
          return (
            <FormGroup key={id}>
              <Input
                type={type}
                id={id}
                name={name}
                placeholder={`Enter you ${name}`}
                onChange={handleOnChange}
                value={email}
                icon={icon}
                className="input-with-icon"
              />
              <Label htmlFor={id} variant="srOnly">
                {label}
              </Label>
            </FormGroup>
          );
        })}
        <Button variant="primary" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Reset Password"}
        </Button>
      </form>
      {error ? <p>{error}</p> : ""}
      {success ? <p>{success}</p> : ""}
    </>
  );
}
