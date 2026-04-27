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
import { FormMessage } from "../FormMessage";

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
        if (err.message === "EMAIL_ALREADY_IN_USE") {
          navigate("/login", {
            state: {
              error: "An account with this email already exists.",
              email: formState.email,
            },
          });
          return;
        }
        setError("Something went wrong. Try one more time later");
      }
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="" id="registration-form" onSubmit={handleSubmit}>
        {success && (
          <FormMessage variant="success" className="mb-2 text-center">
            {success}
          </FormMessage>
        )}
        {error && (
          <FormMessage variant="error" className="mb-2 text-center">
            {error}
          </FormMessage>
        )}

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
    </>
  );
}
