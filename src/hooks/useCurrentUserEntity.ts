import { useAuth } from "../contexts/useAuth";
import { auth } from "../lib/firebase";
import { type CurrentUserEntity } from "../types/types";

export const useCurrentUserEntity = (): CurrentUserEntity => {
  const { currentUserEntity } = useAuth();
  const authUser = auth.currentUser;

  if (!currentUserEntity || !authUser) {
    throw new Error("User does not exist");
  }
  const {
    projects,
    profession,
    aboutMe,
    country,
    skills,
    displayName,
    photoURL,
    joinedTs,
    githubLink,
    linkedinLink,
    socialLink1,
    socialLink2,
    socialLink3,
    websiteLink,
  } = currentUserEntity;
  // console.log(authUser.email);
  // console.log(joinedTs);
  if (!authUser.email || !joinedTs) {
    throw new Error("Invalid user data - Email,  or joinedTs is not provided");
  }
  return {
    // required
    id: authUser.uid,
    email: authUser.email,
    joinedTs,
    displayName,

    // optional
    photoURL: photoURL ?? "",
    profession: profession ?? "",
    aboutMe: aboutMe ?? "",
    socialLink1: socialLink1 ?? "",
    socialLink2: socialLink2 ?? "",
    socialLink3: socialLink3 ?? "",
    websiteLink: websiteLink ?? "",
    country: country || null,
    githubLink,
    linkedinLink,

    // collections
    skills: skills,
    projects: projects,
  };
};
