import type { VariantProps } from "class-variance-authority";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { type ComponentType, type HTMLInputTypeAttribute } from "react";
import { type ReactNode } from "react";
import type { buttonStyles } from "../components/ui/Button";

export type Skill = {
  id: string;
  name: string;
  nameToLower: string;
};
export type SkillsListResult = {
  items: Skill[];
  lastDoc?: QueryDocumentSnapshot<Skill> | null;
  hasMore: boolean;
};
export type ProjectLink = {
  title: string;
  url: string;
};
export type Project = {
  id: string;
  previewUrl: string;
  title: string;
  description: string;
  technologies: Skill[];
  githubLink: string;
  websiteLink: string;
};

export type Country = {
  flags: string;
  alt: string;
  name: string;
};

export type UserBasicProfile = {
  joinedTs: number;
  profession: string;
  aboutMe: string;
  country: Country | null;
  skills: Skill[];
  projects: Project[];
  githubLink: string;
  socialLink1: string;
  socialLink2: string;
  socialLink3: string;
  websiteLink: string;
  linkedinLink: string;
};

export type UserExtendedProfile = UserBasicProfile & {
  id: string;
  displayName: string;
  photoURL: string;
};

export type CurrentUserEntity = UserExtendedProfile & {
  email: string;
};

export type UserProfileCardEditable = Omit<
  UserExtendedProfile,
  "joinedTs" | "id"
>;
export type AuthContextType = {
  currentUserEntity: UserExtendedProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  onUpdateUserProfile: (
    userId: string,
    updateProps: Partial<UserProfileCardEditable>
  ) => Promise<void>;
  syncUserProfile: (userProfileData: Partial<UserProfileCardEditable>) => void;
  // uploadAvatar: (file: File | null, userId: string) => Promise<string | null>;
  handleGetSkillesList: (
    limitValue: number,
    lastDoc?: SkillsListResult["lastDoc"]
  ) => Promise<SkillsListResult>;
};

export type FormState = {
  email: string;
  password: string;
};
export type InputConfig = {
  name: keyof FormState;
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  icon: ReactNode;
};

export type AuthSwitchConfigType = {
  className?: string;
  text?: string;
  to: string;
  linkText: string;
  variant: VariantProps<typeof buttonStyles>["variant"];
};
export type ProjectsViewMode = "list" | "create" | "read" | "edit";
export type ProjectsContextType = {
  projects: Project[];
  onDeleteProject: (project: Project) => Promise<void>;
  onAddProject: (project: Project) => Promise<void>;
  selectProject: (projects: Project | null) => void;
  onUpdateProject: (projects: Project) => Promise<void>;
  currentProject: Project | null;
  currentViewMode: ProjectsViewMode;
  openList: () => void;
  openCreate: () => void;
  openRead: (project: Project) => void;
  openEdit: (project: Project) => void;
};

export type AuthButtonConfigType = {
  title: string;
  action: () => Promise<void>;
  Icon: ComponentType<{ className?: string }>;
}[];

export type ModalContextType = {
  modalConfig: ModalConfigType | null;
  onClose: () => void;
  onOpen: (config: ModalConfigType) => void;
};

export type ModalConfigType = {
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  title: string;
  content: ReactNode;
  footer: ReactNode;
};
