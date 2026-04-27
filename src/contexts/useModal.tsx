import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
