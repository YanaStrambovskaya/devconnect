import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import type {
  AuthUpdateData,
  UserModel,
  SkillsListResult,
  Skill,
  UserProfileEntity,
} from "../types/types";
import { db } from "../lib/firebase";
import { updateProfile } from "firebase/auth";

export async function updateUserProfileDocument(
  userId: string,
  updateProps: Partial<UserProfileEntity>
): Promise<void> {
  if (!userId) {
    throw new Error("Id is required to update user");
  }
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, updateProps);
    }
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

export async function updateUserAuthDocument(
  auth: UserModel["auth"],
  updateProps: AuthUpdateData
): Promise<void> {
  if (!auth) {
    throw new Error("User is not passed");
  }
  try {
    await updateProfile(auth, updateProps);
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

export async function getSkillesList(
  limitValue: number,
  lastDoc?: QueryDocumentSnapshot<Skill> | null
): Promise<SkillsListResult> {
  try {
    const ref = collection(db, "skills") as CollectionReference<Skill>;
    const q = lastDoc
      ? query(ref, startAfter(lastDoc), limit(limitValue))
      : query(ref, limit(limitValue));
    const snap = await getDocs(q);
    console.log(snap.docs);
    return {
      items: snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      lastDoc: snap.docs.at(-1),
      hasMore: snap.docs.length === limitValue,
    };
  } catch (err) {
    console.log(err);
    return {
      items: [],
      lastDoc: null,
      hasMore: false,
    };
  }
}
