import { Form } from "../components/ForgotPassword/Form";
import { Mail } from "lucide-react";
import type { authSwitchConfigType, InputConfig } from "../types/types";
import AuthLayout from "../components/Auth/AuthLayout";

const inputConfig: InputConfig[] = [
  {
    name: "email",
    id: "email-input",
    type: "email",
    label: "Enter your email",
    icon: <Mail size={20} />,
  },
];

export default function ForgotPassword() {
  const authSwitchConfig: authSwitchConfigType = {
    linkText: "Login",
    to: "/login",
    variant: "primaryLink",
  };
  return (
    <AuthLayout
      title="Password Reset"
      form={<Form inputConfig={inputConfig} />}
      authSwitchConfig={authSwitchConfig}
    />
  );
}
