import { useState, type PropsWithChildren } from "react";
import type { ModalConfigType, ModalContextType } from "../types/types";
import { ModalContext } from "./ModalContext";
import Modal from "../components/Modal";

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalConfig, setModalConfig] = useState<ModalConfigType | null>(null);
  function onClose() {
    setModalConfig(null);
  }
  function onOpen(config: ModalConfigType) {
    setModalConfig(config);
  }

  const value: ModalContextType = {
    modalConfig,
    onClose,
    onOpen,
  };
  console.log("modalConfig:", modalConfig);
  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalConfig && <Modal {...modalConfig} onClose={onClose}></Modal>}
    </ModalContext.Provider>
  );
}
