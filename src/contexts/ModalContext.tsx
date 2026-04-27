import { createContext } from "react";
import type { ModalContextType } from "../types/types";

export const ModalContext = createContext<ModalContextType | null>(null);
