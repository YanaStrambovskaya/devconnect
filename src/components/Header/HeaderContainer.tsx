import type { PropsWithChildren } from "react";
// import styles from "./Header.module.scss";

export function HeaderContainer({ children }: PropsWithChildren) {
  return (
    <header className="h-[100px] flex items-center shadow">{children}</header>
  );
}
