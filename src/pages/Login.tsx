import { Form } from "../components/Login/Form";
import { Lock, Mail } from "lucide-react";
import type {
  AuthButtonConfigType,
  AuthSwitchConfigType,
  InputConfig,
} from "../types/types";
import AuthLayout from "../components/Auth/AuthLayout";
import { loginWithGoogle } from "../services/auth";
import { Title } from "../components/ui/Title";
import { LineSeparator } from "../components/ui/LineSeparator";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { GoogleIcon } from "../components/icons/GoogleIcon";
import { GithubIcon } from "../components/icons/GithubIcon";
import { AuthSwitch } from "../components/Auth/AuthSwitch";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

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
  const authSwitchConfig: AuthSwitchConfigType = {
    className: "text-center",
    text: "Don`t have an account?",
    to: "/register",
    linkText: "Sign Up",
    variant: "primaryLink",
  };
  async function handleGoogleAuth() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    }
  }
  async function handleGitHubAuth() {
    await loginWithGoogle();
  }

  const socialAuthConfig: AuthButtonConfigType = [
    {
      title: "Login with Google",
      action: handleGoogleAuth,
      Icon: GoogleIcon,
    },
    {
      title: "Login with GitHub",
      action: handleGitHubAuth,
      Icon: GithubIcon,
    },
  ];
  return (
    <AuthLayout>
      <div className="space-y-3">
        <Title className="text-center" level={1}>
          Welcome Back
        </Title>
        <p className="text-center">Log in to your account</p>
        <div className="text-center">
          <Button as={Link} variant="primaryLink" to="/forgot-password">
            Forgot the Password?
          </Button>
        </div>
        <Form inputConfig={inputConfig} />
      </div>
      <LineSeparator>OR</LineSeparator>
      <SocialAuthButtons buttons={socialAuthConfig}></SocialAuthButtons>
      <AuthSwitch config={authSwitchConfig} />
    </AuthLayout>
  );
}
