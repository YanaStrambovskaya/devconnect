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
import { useNavigate } from "react-router-dom";
import FormGroup from "../ui/FormGroup";

export type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type InputConfig = {
  name: keyof FormState;
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  icon: ReactNode;
};

export function Form({ inputConfig }: { inputConfig: InputConfig[] }) {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      return setError("Password are not equal. Please check");
    }
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const { name, email, password } = formState;
      await signUp(name, email, password);
      setSuccess("User registered successfully.");
      setFormState({ name: "", email: "", password: "", confirmPassword: "" });
      navigate("/profile");
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
      <form className="" id="registration-form" onSubmit={handleSubmit}>
        {inputConfig.map(({ name, id, type, label, icon }) => {
          return (
            <FormGroup key={id}>
              <Input
                type={type}
                id={id}
                name={name}
                placeholder={`Enter you ${name}`}
                onChange={handleOnChange}
                value={formState[name]}
                icon={icon}
                variant="withIcon"
                className="input-with-icon"
              />
              <Label htmlFor={id} variant="srOnly">
                {label}
              </Label>
            </FormGroup>
          );
        })}
        <Button variant="primary" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      {success ? <p>{success}</p> : ""}
      {error ? <p>{error}</p> : ""}
    </>
  );
}
