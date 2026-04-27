import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";
import { createEmptyProfile } from "./helpers";

export async function logInUser(
  email: string,
  password: string
): Promise<void> {
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // await getUserProfileById(cred.user.uid);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function resetUserPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function logOutUser() {
  signOut(auth);
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<void> {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    const profile = createEmptyProfile();

    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      displayName: name,
      photoURL: "",
      email: cred.user.email,
      provider: "password",
      ...profile,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        throw new Error("EMAIL_ALREADY_IN_USE");
      }
    }
    console.error(err);
    throw err;
  }
}

export async function deleteAccount() {
  const user = auth.currentUser;
  if (!user) return;
  const uid = user.uid;

  try {
    // 1. delete Firestore data
    await deleteDoc(doc(db, "users", uid));

    // 2. delete auth user
    await deleteUser(user);
  } catch (error) {
    console.error(error);
  }
}

export async function loginWithGoogle(): Promise<void> {
  try {
    const cred = await signInWithPopup(auth, googleProvider);

    const userRef = doc(db, "users", cred.user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const profile = createEmptyProfile();

      await setDoc(userRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || "",
        photoURL: cred.user.photoURL,
        provider: "google",
        ...profile,
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
