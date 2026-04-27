// import { serverTimestamp } from "firebase/firestore";
import type { UserBasicProfile } from "../types/types";

export const createEmptyProfile = (): UserBasicProfile => ({
  projects: [],
  profession: "",
  aboutMe: "",
  country: null,
  skills: [],
  githubLink: "",
  linkedinLink: "",
  socialLink1: "",
  socialLink2: "",
  socialLink3: "",
  websiteLink: "",
  joinedTs: Date.now(),
});

// export const configurateUserProfile = (data: DocumentData): UserBasicProfile => ({
//   projects: data.projects ?? null,
//   profession: data.profession ?? null,
//   aboutMe: data.aboutMe ?? null,
//   country: data.country ?? null,
//   skills: data.skills ?? null,
//   joinedTs: data.joinedTs,
// });

// export const getUserProfileById = async (
//   id: string
// ): Promise<UserBasicProfile | null> => {
//   const userRef = doc(db, "users", id);
//   const userSnap = await getDoc(userRef);
//   if (userSnap.exists()) {
//     const data = userSnap.data();

//     const profile = configurateUserProfile(data);
//     return profile;
//   } else {
//     return null;
//   }
// };
