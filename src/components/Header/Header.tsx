//
import { Container } from "../Layout/Container";
import { HeaderContainer } from "./HeaderContainer";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

export function Header() {
  return (
    <HeaderContainer>
      <Container className="flex justify-between">
        <Logo></Logo>
        <Menu></Menu>
      </Container>
    </HeaderContainer>
  );
}
