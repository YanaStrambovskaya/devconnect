import {
  doc,
  getDoc,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import type { UserProfileEntity } from "../types/types";
import { db } from "../lib/firebase";

export const createEmptyProfile = (): UserProfileEntity => ({
  projects: new Set(),
  profession: null,
  bio: null,
  country: null,
  skills: new Set(),
  joinedTs: serverTimestamp(),
});

export const configurateUserProfile = (
  data: DocumentData
): UserProfileEntity => ({
  projects: data.projects ?? null,
  profession: data.profession ?? null,
  bio: data.bio ?? null,
  country: data.country ?? null,
  skills: data.skills ?? null,
  joinedTs: data.joinedTs,
});

export const getUserProfileById = async (
  id: string
): Promise<UserProfileEntity | null> => {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data();

    const profile = configurateUserProfile(data);
    return profile;
  } else {
    return null;
  }
};
