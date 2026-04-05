import { useAuth } from "../contexts/useAuth";
import { type CurrentUserView } from "../types/types";

export const useCurrentUser = (): CurrentUserView => {
  const { userEntity } = useAuth();
  if (!userEntity) {
    throw new Error("User does not exist");
  }
  const { auth, profile } = userEntity;
  if (!auth.displayName || !auth.email || !profile.joinedTs) {
    throw new Error(
      "Invalid user data - displayName, email,  or joinedTs is not provided"
    );
  }
  return {
    // required
    id: auth.uid,
    displayName: auth.displayName,
    email: auth.email,
    joinedTs: profile.joinedTs,

    // optional
    photoURL: auth.photoURL || null,
    profession: profile.profession || null,
    bio: profile.bio || null,
    country: profile.country || null,

    // collections
    skills: profile.skills,
    projects: profile.projects,
  };
};
