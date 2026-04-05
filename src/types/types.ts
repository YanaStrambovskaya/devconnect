import type { VariantProps } from "class-variance-authority";
import { type User } from "firebase/auth";
import type {
  FieldValue,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { type HTMLInputTypeAttribute } from "react";
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
export type AuthUpdateData = {
  displayName: string;
  photoURL: string | null;
};
export type ProjectLink = {
  title: string;
  url: string;
};
export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
};

export type Country = {
  flags: string;
  alt: string;
  name: string;
};
export type UserProfileEntity = {
  projects: Set<Project>;
  profession: string | null;
  bio: string | null;
  country: Country | null;
  skills: Set<Skill>;
  joinedTs: Timestamp | FieldValue;
};

export type UserProfileCardEditable = Omit<UserProfileEntity, "joinedTs">;
export type UserModel = {
  auth: User;
  profile: UserProfileEntity;
};

export type CurrentUserView = {
  id: string;
  displayName: string;
  email: string;
  joinedTs: Timestamp | FieldValue;
  photoURL: string | null;
  profession: string | null;
  bio: string | null;
  country: Country | null;
  skills: Set<Skill>;
  projects: Set<Project>;
};

export type AuthContextType = {
  userEntity: UserModel | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserModel | null>;
  logout: () => Promise<void>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<UserModel | null>;
  resetPassword: (email: string) => Promise<void>;
  onUpdateUserProfile: (
    userId: string,
    updateProps: UserProfileCardEditable
  ) => Promise<void>;
  onUpdateUserAuth: (
    auth: UserModel["auth"],
    updateProps: AuthUpdateData
  ) => Promise<void>;
  syncUserProfileCard: (
    userDocData: AuthUpdateData,
    userProfileData: UserProfileCardEditable
  ) => void;
  uploadAvatar: (file: File | null, userId: string) => Promise<string | null>;
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

export type authSwitchConfigType = {
  className?: string;
  text?: string;
  to: string;
  linkText: string;
  variant: VariantProps<typeof buttonStyles>["variant"];
};
