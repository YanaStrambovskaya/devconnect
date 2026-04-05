import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { auth, db, storage } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  registerUser,
  logInUser,
  logOutUser,
  resetUserPassword,
} from "../services/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  type AuthUpdateData,
  type UserModel,
  type SkillsListResult,
  type UserProfileEntity,
  type UserProfileCardEditable,
} from "../types/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  getSkillesList,
  updateUserAuthDocument,
  updateUserProfileDocument,
} from "../services/services";

export function AuthProvider({ children }: PropsWithChildren) {
  const [userEntity, setCurrentUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (name: string, email: string, password: string) => {
    const user = await registerUser(name, email, password);
    setCurrentUser(user);
    return user;
  };

  const login = async (email: string, password: string) => {
    const user = await logInUser(email, password);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    return logOutUser();
  };

  const syncUserProfileCard = (
    userDocData: AuthUpdateData,
    userProfileData: UserProfileCardEditable
  ) => {
    setCurrentUser((prev) => {
      if (prev) {
        return {
          ...prev,
          auth: { ...prev.auth, ...userDocData },
          profile: { ...prev.profile, ...userProfileData },
        };
      } else return null;
    });
  };

  const resetPassword = (email: string) => {
    return resetUserPassword(email);
  };

  const onUpdateUserProfile = (
    userId: string,
    updateProps: UserProfileCardEditable
  ) => {
    return updateUserProfileDocument(userId, updateProps);
  };

  const onUpdateUserAuth = (
    auth: UserModel["auth"],
    updateProps: AuthUpdateData
  ) => {
    return updateUserAuthDocument(auth, updateProps);
  };

  const uploadAvatar = async (file: File | null, userId: string) => {
    if (!file) return null;
    // const storage = getStorage();
    const storageRef = ref(storage, `avatars/${userId}`);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
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
      userEntity,
      signUp,
      login,
      logout,
      resetPassword,
      loading,
      onUpdateUserProfile,
      onUpdateUserAuth,
      syncUserProfileCard,
      uploadAvatar,
      handleGetSkillesList,
    }),
    [userEntity, loading]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            const profile: UserProfileEntity = {
              projects: data.projects || null,
              profession: data.profession || null,
              bio: data.bio || null,
              country: data.country || null,
              skills: data.skills || null,
              joinedTs: data.joinedTs,
            };

            const currentUser = {
              auth: user,
              profile: profile,
            };
            setCurrentUser(currentUser);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
