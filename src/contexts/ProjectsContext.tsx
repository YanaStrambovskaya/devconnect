import { createContext } from "react";
import type { ProjectsContextType } from "../types/types";

export const ProjectsContext = createContext<ProjectsContextType | null>(null);
