import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Button } from "../ui/Button";
import type {
  SkillsListResult,
  Skill,
  CurrentUserView,
  Country,
  UserProfileCardEditable,
  UserModel,
} from "../../types/types";
import type { AuthUpdateData } from "../../types/types";
import { validateImage } from "../../utils/validation";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import Avatar from "./Avatar";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { CountriesDropdown } from "./CountriesDropdown";
import { SkillsDropdown } from "./SkillsDropdown";
import UserSkills from "./UserSkills";
type Props = {
  onEditStop: () => void;
  userView: CurrentUserView;
  auth: UserModel["auth"];
};
export default function ProfileCardEdit({ onEditStop, userView, auth }: Props) {
  const {
    onUpdateUserProfile,
    onUpdateUserAuth,
    syncUserProfileCard,
    uploadAvatar,
    handleGetSkillesList: getSkilles,
  } = useAuth();

  const {
    id,
    displayName,
    photoURL,
    profession,
    bio,
    country,
    skills: userSkills,
    projects,
  } = userView;

  type FormState = Omit<CurrentUserView, "id" | "email" | "joinedTs"> & {
    avatarFile: File | null;
  };
  const [profileForm, setProfileForm] = useState<FormState>({
    displayName,
    profession,
    bio,
    country,
    skills: userSkills,
    photoURL,
    avatarFile: null,
    projects,
  });

  const [isLoading, setIsLoading] = useState(false);

  // avatar
  const [preview, setPreview] = useState<typeof photoURL>(photoURL);
  const avatarInput = useRef<HTMLInputElement>(null);

  // ------------------------------------------------------------------

  // user skills
  const userSkillsIds = new Set(
    Array.from(profileForm.skills).map((skill) => skill.id)
  );

  // skills
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);
  const [isMoreSkills, setIsMoreSkills] = useState(true);
  const [isSkillsListOpen, setIsSkillsListOpen] = useState(false);

  // paginated skills
  const [paginatedSkills, setPaginatedSkills] = useState<Skill[]>([]);
  const [lastPaginatedSkills, setLastPaginatedSkills] = useState<
    SkillsListResult["lastDoc"] | null
  >(null);

  // filtered skills
  const [skillsSearchKey, setSkillsSearchKey] = useState<string>("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  // ------------------------------------------------------------------

  // country
  const [counties, setCounties] = useState<Set<Country>>(new Set());
  const [searchCountryTerm, setsearchCountryTerm] = useState<string>("");
  const searchCountryValue =
    searchCountryTerm || profileForm.country?.name || "";

  const dropdownSkillsList = skillsSearchKey ? filteredSkills : paginatedSkills;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const profileData: UserProfileCardEditable = {
      profession: profileForm.profession,
      bio: profileForm.bio,
      country: profileForm.country,
      skills: profileForm.skills,
      projects: profileForm.projects,
    };

    const authData: AuthUpdateData = {
      displayName: profileForm.displayName,
      photoURL: profileForm.photoURL,
    };

    try {
      const avatarRes = await uploadAvatar(profileForm.avatarFile, id);
      await Promise.all([
        onUpdateUserProfile(id, profileData),
        onUpdateUserAuth(auth, {
          ...authData,
          photoURL: avatarRes ? avatarRes : profileForm.photoURL,
        }),
      ]);

      syncUserProfileCard(
        {
          ...authData,
          photoURL: avatarRes ? avatarRes : profileForm.photoURL,
        },
        profileData
      );
      setIsLoading(false);
      onEditStop();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  function handleChangeAvatarClick() {
    avatarInput.current?.click();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return null;
    const isValid = validateImage(file, ["image/png", "image/jpeg"], 2);
    if (!isValid) return null;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setProfileForm((prev) => ({
      ...prev,
      avatarFile: file,
    }));
  }

  function handleSelectedCounry(country: Country) {
    if (country) {
      setProfileForm((prev) => ({ ...prev, country }));
      setsearchCountryTerm("");
      setCounties(new Set());
    }
  }
  function handleCountrySearch(e: React.ChangeEvent<HTMLInputElement>) {
    setProfileForm((prev) => ({ ...prev, country: null }));
    setsearchCountryTerm(e.target.value);
  }

  async function handleSkillsOnScroll(e: React.UIEvent<HTMLUListElement>) {
    const ul = e.currentTarget;
    if (ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 10) {
      if (!isMoreSkills || isSkillsLoading) return;
      setIsLoading(true);
      try {
        setIsSkillsLoading(true);
        const data = await getSkilles(10, lastPaginatedSkills);
        setLastPaginatedSkills(data.lastDoc);
        setIsMoreSkills(data.hasMore);
        setPaginatedSkills((prev) => [...prev, ...data.items]);
        setIsSkillsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  }
  function handleSkillsFocus() {
    setIsSkillsListOpen(true);
  }

  function handleSkillClick(skill: Skill) {
    if (!skill) return;
    setProfileForm((prev) => {
      const newSkillSet = new Set([...prev.skills, skill]);
      return { ...prev, skills: newSkillSet };
    });
    setIsSkillsListOpen(false);
  }

  function handleSkillDelete(skill: Skill) {
    setProfileForm((prev) => {
      const newSkillSet = new Set(prev.skills);
      newSkillSet.delete(skill);
      return { ...prev, skills: newSkillSet };
    });
  }

  function handleSkillsSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSkillsSearchKey(e.currentTarget.value);
  }
  type RestCountryItem = {
    flags: {
      png: string;
      svg: string;
      alt: string;
    };
    name: {
      common: string;
      official: string;
      nativeName?: Record<
        string,
        {
          official: string;
          common: string;
        }
      >;
    };
  };
  useEffect(() => {
    if (searchCountryTerm?.length > 2) {
      fetch(
        `https://restcountries.com/v3.1/name/${searchCountryTerm}?fields=name,flags`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const countiesFormatedData: Set<Country> = new Set();
          data.forEach((item: RestCountryItem) => {
            countiesFormatedData.add({
              name: item.name.official,
              flags: item.flags.svg,
              alt: item.flags.alt,
            });
          });
          setCounties(countiesFormatedData);
        });
    }
  }, [searchCountryTerm]);

  useEffect(() => {
    async function loadSkillsFromDB() {
      try {
        setIsSkillsLoading(true);
        const data = await getSkilles(10);
        setLastPaginatedSkills(data.lastDoc);
        setIsMoreSkills(data.hasMore);
        setPaginatedSkills(data.items);
        setIsSkillsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    loadSkillsFromDB();
  }, []);

  useEffect(() => {
    async function skillsLiveSearch(key: string) {
      try {
        if (key.length > 1) {
          const term = key.trim().toLowerCase();
          const q = query(
            collection(db, "skills"),
            orderBy("nameToLower"),
            startAt(term),
            endAt(term + "\uf8ff")
          );

          const snap = await getDocs(q);

          const docs = snap.docs.map((doc) => {
            const data = doc.data();
            return {
              id: data.id,
              name: data.name,
              nameToLower: data.nameToLower,
            };
          });

          setFilteredSkills(docs);
        }
      } catch (err) {
        console.log(err);
      }
    }
    skillsLiveSearch(skillsSearchKey);
    console.log(filteredSkills);
  }, [skillsSearchKey]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          photoURL={photoURL}
          displayName={displayName}
          preview={preview}
        />
        <Button type="button" onClick={handleChangeAvatarClick}>
          Change Avatar
        </Button>
        <Input
          ref={avatarInput}
          onChange={handleAvatarChange}
          type="file"
          accept="image/png, image/jpeg"
          hidden
        />
      </div>
      <div className="mb-2 mt-2">
        <Label htmlFor="displayName">Name</Label>
        <Input
          id="displayName"
          type="text"
          value={profileForm.displayName}
          onChange={(e) =>
            setProfileForm((prev) => ({ ...prev, displayName: e.target.value }))
          }
          name="displayName"
        />
      </div>

      <div className="mb-2">
        <Label htmlFor="profession">Profession</Label>
        <Input
          id="profession"
          type="text"
          value={profileForm.profession ?? ""}
          onChange={(e) =>
            setProfileForm((prev) => ({ ...prev, profession: e.target.value }))
          }
          name="profession"
        />
      </div>

      <div className="mb-2">
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          className="border border-gray-200 rounded-md w-full px-3"
          id="bio"
          value={profileForm.bio ?? ""}
          onChange={(e) =>
            setProfileForm((prev) => ({ ...prev, bio: e.target.value }))
          }
          name="bio"
        />
      </div>

      <div className="mb-2">
        <Label htmlFor="country">Country</Label>
        <div className="relative">
          {profileForm.country && (
            <img
              className="absolute top-1/2 -translate-y-1/2 left-[10px] h-[12px] aspect-video object-cover"
              src={profileForm.country.flags}
              alt={profileForm.country.alt}
            />
          )}
          <Input
            type="search"
            id="country"
            className={profileForm.country ? "pl-[40px] pr-2" : ""}
            value={searchCountryValue}
            onChange={handleCountrySearch}
          />
          {counties && (
            <CountriesDropdown
              items={counties}
              handleSelectedCounry={handleSelectedCounry}
            />
          )}
        </div>
      </div>
      {dropdownSkillsList && (
        <div className="mb-2 relative">
          <Label htmlFor="skills">Skills</Label>
          <Input
            type="search"
            id="skills"
            value={skillsSearchKey}
            placeholder="Start type to search new skills"
            onChange={handleSkillsSearch}
            onFocus={handleSkillsFocus}
            name="skills"
          />
          {isSkillsListOpen && (
            <SkillsDropdown
              onScroll={handleSkillsOnScroll}
              skills={dropdownSkillsList}
              userSkillsIds={userSkillsIds}
              handleSkillClick={handleSkillClick}
            />
          )}
          {profileForm.skills.size > 0 && (
            <UserSkills
              skills={profileForm.skills}
              handleSkillDelete={handleSkillDelete}
            />
          )}
        </div>
      )}
      <div className="flex gap-2">
        <Button
          variant={isLoading ? "primaryDisabled" : "primary"}
          className="w-[50%]"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading" : "Save"}
        </Button>
        <Button
          variant="default"
          className="w-[50%]"
          type="button"
          onClick={onEditStop}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
