import { useState, type FormEvent } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import type { FormState, InputConfig } from "../../types/types";
import FormGroup from "../ui/FormGroup";

export function Form({ inputConfig }: { inputConfig: InputConfig[] }) {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const { email, password } = formState;
      await login(email, password);
      setFormState({ email: "", password: "" });
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
                value={formState[name]}
                icon={icon}
                className="input-with-icon"
              />
              <Label htmlFor={id} variant="srOnly">
                {label}
              </Label>
            </FormGroup>
          );
        })}
        <Button
          type="button"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Log In"}
        </Button>
      </form>
      {error ? <p>{error}</p> : ""}
    </>
  );
}
