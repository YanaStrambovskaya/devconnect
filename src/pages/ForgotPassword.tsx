import { Form } from "../components/ForgotPassword/Form";
import { Mail } from "lucide-react";
import type { AuthSwitchConfigType, InputConfig } from "../types/types";
import AuthLayout from "../components/Auth/AuthLayout";
import { Title } from "../components/ui/Title";
import { AuthSwitch } from "../components/Auth/AuthSwitch";

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
  const authSwitchConfig: AuthSwitchConfigType = {
    linkText: "Login",
    to: "/login",
    variant: "primaryLink",
  };
  return (
    <AuthLayout>
      <Title className="text-center" level={1}>
        Password Reset
      </Title>
      <Form inputConfig={inputConfig} />
      <AuthSwitch config={authSwitchConfig} />
    </AuthLayout>
  );
}
