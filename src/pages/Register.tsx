import { type InputConfig, Form } from "../components/Register/Form";
import { GithubIcon, Lock, Mail, User } from "lucide-react";
import type {
  AuthButtonConfigType,
  AuthSwitchConfigType,
} from "../types/types";
import AuthLayout from "../components/Auth/AuthLayout";
import { loginWithGoogle } from "../services/auth";
import { LineSeparator } from "../components/ui/LineSeparator";
import { Title } from "../components/ui/Title";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { AuthSwitch } from "../components/Auth/AuthSwitch";
import { GoogleIcon } from "../components/icons/GoogleIcon";

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
  const authSwitchConfig: AuthSwitchConfigType = {
    className: "text-center",
    text: "Already have an account?",
    to: "/login",
    linkText: "Log In",
    variant: "primaryLink",
  };
  async function handleGoogleAuth() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function handleGitHubAuth() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const socialAuthConfig: AuthButtonConfigType = [
    {
      title: "Sign Up with Google",
      action: handleGoogleAuth,
      Icon: GoogleIcon,
    },
    {
      title: "Sign Up with GitHub",
      action: handleGitHubAuth,
      Icon: GithubIcon,
    },
  ];
  return (
    <AuthLayout>
      <Title className="text-center" level={1}>
        Join DevConnect
      </Title>
      <p className="text-center">
        Sign up to connect with developers, share projects, and grow your
        network
      </p>
      <Form inputConfig={inputConfig} />
      <LineSeparator>OR</LineSeparator>
      <SocialAuthButtons buttons={socialAuthConfig}></SocialAuthButtons>
      <AuthSwitch config={authSwitchConfig} />
    </AuthLayout>
  );
}
