import { useState, type FormEvent } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import type { FormState, InputConfig } from "../../types/types";
import FormGroup from "../ui/FormGroup";
import { FormMessage } from "../FormMessage";

export function Form({ inputConfig }: { inputConfig: InputConfig[] }) {
  const { state } = useLocation();
  const [formState, setFormState] = useState<FormState>({
    email: state?.email ?? "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(state?.error || "");
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
      console.error(err);
      if (err instanceof Error) {
        if (err.message === "Firebase: Error (auth/invalid-credential).")
          setError("Wrong Password");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form id="registration-form" onSubmit={handleSubmit}>
        {error ? (
          <FormMessage variant="error" className="mb-2 text-center">
            {error}
          </FormMessage>
        ) : (
          ""
        )}
        {inputConfig.map(({ name, id, type, label, icon }) => {
          return (
            <FormGroup key={id}>
              <Input
                type={type}
                id={id}
                name={name}
                required
                placeholder={`Enter you ${name}`}
                onChange={handleOnChange}
                value={formState[name]}
                icon={icon}
                className="input-with-icon disabled:opacity-15"
              />
              <Label htmlFor={id} variant="srOnly">
                {label}
              </Label>
            </FormGroup>
          );
        })}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Log In"}
        </Button>
      </form>
    </>
  );
}
