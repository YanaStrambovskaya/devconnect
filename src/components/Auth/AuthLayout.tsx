import heroImage from "../../assets/images/hero-image.png";
import type { PropsWithChildren } from "react";
import { Container } from "../Layout/Container";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container>
      <div className="flex gap-20">
        <div className="flex flex-col gap-8 grow basis-0">{children}</div>
        <div className="flex flex-col grow basis-0 sticky top-10 self-start">
          <img src={heroImage} className="hidden lg:block w-full" alt="" />
        </div>
      </div>
    </Container>
  );
}
