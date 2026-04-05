import { type InputConfig, Form } from "../components/Register/Form";
import { Lock, Mail, User } from "lucide-react";
import type { authSwitchConfigType } from "../types/types";
import AuthLayout from "../components/Auth/AuthLayout";

const inputConfig: InputConfig[] = [
  {
    name: "name",
    id: "name-input",
    type: "text",
    label: "Enter your name",
    icon: <User size={20} />,
  },
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
  {
    name: "confirmPassword",
    id: "confirm-password-input",
    type: "password",
    label: "Confirm your password",
    icon: <Lock size={20} />,
  },
];

export default function Register() {
  const authSwitchConfigConfig: authSwitchConfigType = {
    className: "text-center",
    text: "Already have an account?",
    to: "/login",
    linkText: "Log In",
    variant: "primaryLink",
  };
  return (
    <AuthLayout
      lineSeparator={true}
      socialAuthButtons={true}
      title="Join DevConnect"
      description="Sign up to connect with developers, share projects, and grow your
          network"
      form={<Form inputConfig={inputConfig} />}
      authSwitchConfig={authSwitchConfigConfig}
    ></AuthLayout>
  );
}
