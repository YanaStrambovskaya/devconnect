import { Form } from "../components/Login/Form";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import type { authSwitchConfigType, InputConfig } from "../types/types";
import { Button } from "../components/ui/Button";
import AuthLayout from "../components/Auth/AuthLayout";

const inputConfig: InputConfig[] = [
  {
    name: "email",
    id: "email-input",
    type: "email",
    label: "Enter your email",
    icon: <Mail size={20} />,
  },
  {
    name: "password",
    id: "password-input",
    type: "password",
    label: "Enter your password",
    icon: <Lock size={20} />,
  },
];

export default function Login() {
  const authSwitchConfigConfig: authSwitchConfigType = {
    className: "text-center",
    text: "Don`t have an account?",
    to: "/register",
    linkText: "Sign Up",
    variant: "primaryLink",
  };
  return (
    <AuthLayout
      lineSeparator={true}
      socialAuthButtons={true}
      authSwitchConfig={authSwitchConfigConfig}
      title="Welcome Back"
      description="Log in to your account"
      forgotPassword={
        <div className="text-center">
          <Button as={Link} variant="primaryLink" to="/forgot-password">
            Forgot the Password?
          </Button>
        </div>
      }
      form={<Form inputConfig={inputConfig} />}
    ></AuthLayout>
  );
}
