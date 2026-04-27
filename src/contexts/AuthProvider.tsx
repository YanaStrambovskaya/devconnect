import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, type Unsubscribe } from "firebase/auth";
import {
  registerUser,
  logInUser,
  // logOutUser,
  resetUserPassword,
  deleteAccount,
} from "../services/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  type SkillsListResult,
  type UserProfileCardEditable,
  type UserExtendedProfile,
} from "../types/types";

import {
  getSkillesList,
  updateUserProfileDocument,
} from "../services/services";

export function AuthProvider({ children }: PropsWithChildren) {
  const [currentUserEntity, setcurrentUserEntity] =
    useState<UserExtendedProfile | null>(null);

  const [loading, setLoading] = useState(true);

  function clearUserState() {
    setcurrentUserEntity(null);
    setLoading(false);
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await registerUser(name, email, password);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await logInUser(email, password);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // return logOutUser();
    } catch (err) {
      console.log(err);
      // throw error to the top level?
    }
  };

  const deleteUser = async () => {
    try {
      await deleteAccount();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const syncUserProfile = (
    userProfileData: Partial<UserProfileCardEditable>
  ) => {
    setcurrentUserEntity((prev) => {
      if (prev) {
        return { ...prev, ...userProfileData };
      } else return null;
    });
  };

  const resetPassword = (email: string) => {
    return resetUserPassword(email);
  };

  const onUpdateUserProfile = (
    userId: string,
    updateProps: Partial<UserProfileCardEditable>
  ) => {
    return updateUserProfileDocument(userId, updateProps);
  };

  const handleGetSkillesList = async (
    limitValue: number,
    lastDoc?: SkillsListResult["lastDoc"] | null
  ) => {
    const data = await getSkillesList(limitValue, lastDoc);
    return data;
  };

  const value = useMemo(
    () => ({
      currentUserEntity,
      signUp,
      login,
      logout,
      deleteUser,
      resetPassword,
      loading,
      onUpdateUserProfile,
      syncUserProfile,
      handleGetSkillesList,
    }),
    [currentUserEntity, loading]
  );

  useEffect(() => {
    // Auth = source of truth for session
    // detecting login/logout
    // loading Firestore profile
    // building your “app user”
    let unsubscribeProfile: Unsubscribe | null = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        clearUserState();
        return;
      }

      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      const userDocRef = doc(db, "users", user.uid);

      unsubscribeProfile = onSnapshot(userDocRef, (snap) => {
        if (!snap.exists()) {
          setcurrentUserEntity(null);
          setLoading(false);
          return;
        } else {
          const data = snap.data();

          if (data) {
            const profile: UserExtendedProfile = {
              githubLink: data.githubLink ?? "",
              linkedinLink: data.linkedinLink ?? "",
              id: data.uid ?? user.uid,
              displayName: data.displayName ?? "",
              photoURL: data.photoURL ?? "",
              projects: data.projects ?? [],
              profession: data.profession ?? "",
              aboutMe: data.aboutMe ?? null,
              country: data.country ?? null,
              skills: data.skills ?? [],
              socialLink1: data.socialLink1 ?? "",
              socialLink2: data.socialLink2 ?? "",
              socialLink3: data.socialLink3 ?? "",
              websiteLink: data.websiteLink ?? "",
              joinedTs: data.joinedTs,
            };
            setcurrentUserEntity(profile);
            // console.log(currentUserEntity);
          } else {
            clearUserState();
          }
          setLoading(false);
        }
      });
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
