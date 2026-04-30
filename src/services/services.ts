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
import type { SkillsListResult, Skill, UserBasicProfile } from "../types/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../lib/firebase";

export async function updateUserProfileDocument(
  userId: string,
  updateProps: Partial<UserBasicProfile>
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
    // console.log(snap.docs);
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

export const uploadAvatar = async (file: File | null, userId: string) => {
  if (!file) return null;

  const storageRef = ref(storage, `users/${userId}/avatar.jpg`);

  await uploadBytes(storageRef, file, {
    contentType: file.type,
  });

  return await getDownloadURL(storageRef);
};

export const uploadProjectPreview = async (
  file: File | null,
  userId: string,
  projectId: string
) => {
  if (!file) return null;
  // const storage = getStorage();
  const storageRef = ref(
    storage,
    `users/${userId}/projects/${projectId}/preview.jpg`
  );

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
