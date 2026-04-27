//
import { Container } from "../Layout/Container";
import { HeaderContainer } from "./HeaderContainer";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

export function Header() {
  return (
    <HeaderContainer>
      <Container className="flex flex-col justify-between md:flex-row">
        <Logo></Logo>
        <Menu></Menu>
      </Container>
    </HeaderContainer>
  );
}
