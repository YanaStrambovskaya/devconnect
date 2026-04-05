import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";
import type { UserModel, UserProfileEntity } from "../types/types";
import {
  configurateUserProfile,
  createEmptyProfile,
  getUserProfileById,
} from "./helpers";

export async function logInUser(
  email: string,
  password: string
): Promise<UserModel | null> {
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const profile = await getUserProfileById(cred.user.uid);
    if (profile) {
      return {
        auth: cred.user,
        profile: profile,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function resetUserPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function logOutUser() {
  return signOut(auth);
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<UserModel | null> {
  if (!email && !password) {
    throw new Error("email and password are required");
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    const userRef = doc(db, "users", cred.user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await updateProfile(cred.user, {
        displayName: name,
      });

      const profile = createEmptyProfile();

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        displayName: name,
        email: cred.user.email,
        photoURL: "",
        provider: "password",
        ...profile,
      });
      return {
        auth: cred.user,
        profile: profile,
      };
    } else {
      return null;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      console.log(err.name);
    }
    return null;
  }
}

export async function loginWithGoogle(): Promise<UserModel | null> {
  try {
    const cred = await signInWithPopup(auth, googleProvider);

    const userRef = doc(db, "users", cred.user.uid);
    // Create user`s link
    const snap = await getDoc(userRef);
    // check if user already exist (“Get user document from DB”)
    let profile: UserProfileEntity;
    if (!snap.exists()) {
      // if user is new

      profile = createEmptyProfile();

      await setDoc(userRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || "",
        photoURL: cred.user.photoURL,
        provider: "google",
        ...profile,
      });
    } else {
      profile = configurateUserProfile(snap);
    }
    return {
      auth: cred.user,
      profile: profile,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
