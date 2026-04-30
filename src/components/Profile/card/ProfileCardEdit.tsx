import { useState } from "react";
import { useAuth } from "../../../contexts/useAuth";
import type {
  CurrentUserEntity,
  UserProfileCardEditable,
} from "../../../types/types";
import { SkillsProfileEditFormGroup } from "./edit/SkillsProfileEditFormGroup";
import { CounrtyProfileEditFormGroup } from "./edit/CounrtyProfileEditFormGroup";
import { ProfileCardEditButtonsGroup } from "./edit/ProfileCardEditButtonsGroup";
import { uploadAvatar } from "../../../services/services";
import { ImageUploader } from "../ImageUploader";
import FormControl from "../../ui/FormControl";
import { getLetters } from "../../../utils/getLetters";
import { auth } from "../../../lib/firebase";
type Props = {
  onEditStop: () => void;
  userView: CurrentUserEntity;
};
export default function ProfileCardEdit({ onEditStop, userView }: Props) {
  const { onUpdateUserProfile, syncUserProfile } = useAuth();

  const {
    id,
    displayName,
    photoURL,
    profession,
    aboutMe,
    country,
    skills: userSkills,
    projects,
    githubLink,
    linkedinLink,
    socialLink1,
    socialLink2,
    socialLink3,
    websiteLink,
  } = userView;

  type FormState = Omit<CurrentUserEntity, "id" | "email" | "joinedTs"> & {
    avatarFile: File | null;
  };
  const [profileForm, setProfileForm] = useState<FormState>({
    displayName,
    profession,
    aboutMe,
    country,
    skills: userSkills,
    photoURL,
    avatarFile: null,
    projects,
    githubLink,
    socialLink1,
    socialLink2,
    socialLink3,
    websiteLink,
    linkedinLink,
  });

  function handleUpdateProfileForm<K extends keyof FormState>(key: K) {
    return (data: FormState[K]) =>
      setProfileForm((prev) => ({ ...prev, [key]: data }));
  }

  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("auth user:", auth.currentUser);
      console.log("uid:", auth.currentUser?.uid);
      const avatarRes = await uploadAvatar(profileForm.avatarFile, id);

      const profileData: UserProfileCardEditable = {
        githubLink: profileForm.githubLink,
        linkedinLink: profileForm.linkedinLink,
        profession: profileForm.profession,
        aboutMe: profileForm.aboutMe,
        country: profileForm.country,
        skills: profileForm.skills,
        projects: profileForm.projects,
        displayName: profileForm.displayName,
        socialLink1: profileForm.socialLink1,
        socialLink2: profileForm.socialLink2,
        socialLink3: profileForm.socialLink3,
        websiteLink: profileForm.websiteLink,
        photoURL: avatarRes ? avatarRes : profileForm.photoURL,
      };

      await Promise.all([onUpdateUserProfile(id, profileData)]);

      syncUserProfile(profileData);
      setIsLoading(false);
      onEditStop();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setIsLoading(false);
      }
    }
  }

  function handleOnFormElementChange(
    filedName: Extract<keyof FormState, string>
  ) {
    return (value: string) =>
      setProfileForm((prev) => ({ ...prev, [filedName]: value }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <ImageUploader
        alt={displayName}
        value={profileForm.photoURL}
        updateState={handleUpdateProfileForm("avatarFile")}
        className="rounded-full w-[150px] aspect-square object-cover"
        fallback={
          <div className="rounded-full text-5xl w-[150px] h-[150px] bg-taupe-200 flex items-center justify-center">
            {getLetters(displayName)}
          </div>
        }
      ></ImageUploader>

      {/* displayName */}
      <FormControl
        label="Full Name"
        value={profileForm.displayName}
        id="displayName"
        required
        type="text"
        onChange={handleOnFormElementChange("displayName")}
        name="displayName"
      />

      {/* profession */}
      <FormControl
        label="Job Title"
        value={profileForm.profession}
        id="profession"
        type="text"
        onChange={handleOnFormElementChange("profession")}
        name="profession"
      />

      {/* aboutMe */}
      <FormControl
        label="About Me"
        value={profileForm.aboutMe}
        id="aboutMe"
        type="textarea"
        maxLength={260}
        rows={5}
        onChange={handleOnFormElementChange("aboutMe")}
        name="aboutMe"
      />

      {/* githubLink */}
      <FormControl
        label="GitHub Profile"
        value={profileForm.githubLink}
        id="githubLink"
        type="text"
        onChange={handleOnFormElementChange("githubLink")}
        name="githubLink"
      />

      {/* linkedinLink */}
      <FormControl
        label="LinkedIn Profile"
        value={profileForm.linkedinLink}
        id="linkedinLink"
        type="text"
        onChange={handleOnFormElementChange("linkedinLink")}
        name="linkedinLink"
      />
      {/* websiteLink */}
      <FormControl
        label="Personal Website"
        value={profileForm.websiteLink}
        id="websiteLink"
        type="text"
        onChange={handleOnFormElementChange("websiteLink")}
        name="websiteLink"
      />
      {/* socialLink1 */}
      <FormControl
        label="Additional Social Link"
        value={profileForm.socialLink1}
        id="socialLink1"
        type="text"
        onChange={handleOnFormElementChange("socialLink1")}
        name="socialLink1"
      />
      {/* socialLink2 */}
      <FormControl
        label="Additional Social Link"
        value={profileForm.socialLink2}
        id="socialLink2"
        type="text"
        onChange={handleOnFormElementChange("socialLink2")}
        name="socialLink2"
      />
      {/* socialLink3 */}
      <FormControl
        label="Additional Social Link"
        value={profileForm.socialLink3}
        id="socialLink3"
        type="text"
        onChange={handleOnFormElementChange("socialLink3")}
        name="socialLink3"
      />

      {/* Country */}
      <CounrtyProfileEditFormGroup
        updateState={handleUpdateProfileForm("country")}
        countryData={profileForm.country}
      />

      {/* Skills */}
      <SkillsProfileEditFormGroup
        userSkills={profileForm.skills}
        updateState={handleUpdateProfileForm("skills")}
      />
      <ProfileCardEditButtonsGroup
        isLoading={isLoading}
        onEditStop={onEditStop}
      />
    </form>
  );
}
