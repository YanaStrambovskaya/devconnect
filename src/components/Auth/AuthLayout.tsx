import heroImage from "../../assets/images/hero-image.png";
import type { ReactNode } from "react";
import { Container } from "../Layout/Container";
import { Title } from "../ui/Title";
import { LineSeparator } from "../ui/LineSeparator";
import SocialAuthButtons from "../SocialAuthButtons";
import { AuthSwitch } from "./AuthSwitch";
import { loginWithGoogle } from "../../services/auth";
import type { authSwitchConfigType } from "../../types/types";

type Props = {
  lineSeparator?: boolean;
  form: ReactNode;
  title: string;
  description?: string;
  authSwitchConfig: authSwitchConfigType;
  forgotPassword?: ReactNode;
  socialAuthButtons?: boolean;
};
export default function AuthLayout({
  lineSeparator = false,
  socialAuthButtons = false,
  form,
  title,
  description,
  authSwitchConfig,
  forgotPassword,
}: Props) {
  async function handleGoggleAuth() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    }
  }
  async function handleGitHubAuth() {
    await loginWithGoogle();
  }
  return (
    <Container>
      <div className="flex gap-20">
        <div className="flex flex-col gap-8 grow basis-0">
          <Title className="text-center" level={1}>
            {title}
          </Title>
          {description && <p className="text-center">{description}</p>}
          {forgotPassword && forgotPassword}
          {form}
          {lineSeparator && <LineSeparator>OR</LineSeparator>}
          {socialAuthButtons && (
            <SocialAuthButtons
              actions={{ google: handleGoggleAuth, gitHub: handleGitHubAuth }}
            ></SocialAuthButtons>
          )}
          <AuthSwitch
            className={authSwitchConfig.className}
            text={authSwitchConfig.text}
            to={authSwitchConfig.to}
            linkText={authSwitchConfig.linkText}
            variant={authSwitchConfig.variant}
          />
        </div>
        <div className="flex flex-col grow basis-0 sticky top-10 self-start">
          <img src={heroImage} className="hidden lg:block w-full" alt="" />
        </div>
      </div>
    </Container>
  );
}
