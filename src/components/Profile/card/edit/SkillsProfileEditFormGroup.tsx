import { useEffect, useRef, useState } from "react";
import FormGroup from "../../../ui/FormGroup";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import { SkillsDropdown } from "../../SkillsDropdown";
import UserSkills from "../../UserSkills";
import type { Skill, SkillsListResult } from "../../../../types/types";
import { useDebounce } from "../../../../hooks/useDebounce";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useAuth } from "../../../../contexts/useAuth";

type Props = {
  userSkills: Skill[];
  updateState: (data: Skill[]) => void;
};
export function SkillsProfileEditFormGroup({ updateState, userSkills }: Props) {
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const { handleGetSkillesList: getSkilles } = useAuth();

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
  const debouncedSkillsSearch = useDebounce(skillsSearchKey);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const dropdownSkillsList = skillsSearchKey ? filteredSkills : paginatedSkills;

  async function handleSkillsOnScroll(e: React.UIEvent<HTMLUListElement>) {
    const ul = e.currentTarget;
    if (ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 10) {
      if (!isMoreSkills || isSkillsLoading) return;
      //   setIsLoading(true);
      try {
        setIsSkillsLoading(true);
        const data = await getSkilles(10, lastPaginatedSkills);
        setLastPaginatedSkills(data.lastDoc);
        setIsMoreSkills(data.hasMore);
        setPaginatedSkills((prev) => [...prev, ...data.items]);
        setIsSkillsLoading(false);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
  function handleSkillsFocus() {
    setIsSkillsListOpen(true);
  }

  function onSkillClick(skill: Skill) {
    if (!skill || userSkillsIds.has(skill.id)) return;
    updateState([...userSkills, skill]);
    setIsSkillsListOpen(false);
    setSkillsSearchKey("");
  }

  function handleSkillDelete(skill: Skill) {
    const filteredSkills = userSkills.filter((s) => s.id !== skill.id);
    updateState([...filteredSkills]);
  }
  function handleSkillsSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSkillsSearchKey(e.currentTarget.value);
  }
  const userSkillsIds = new Set(
    Array.from(userSkills).map((skill) => skill.id)
  );

  useEffect(() => {
    async function skillsLiveSearch(key: string) {
      try {
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
            id: doc.id,
            name: data.name,
            nameToLower: data.nameToLower,
          };
        });

        setFilteredSkills(docs);
      } catch (err) {
        console.log(err);
      }
    }
    if (debouncedSkillsSearch.length > 1) {
      skillsLiveSearch(debouncedSkillsSearch);
    }
  }, [debouncedSkillsSearch]);

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
        setIsSkillsLoading(false);
      }
    }
    loadSkillsFromDB();
  }, []);
  return (
    <>
      {dropdownSkillsList && (
        <div ref={skillsRef}>
          <FormGroup className="relative">
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
                parentRef={skillsRef}
                onClose={() => setIsSkillsListOpen(false)}
                onScroll={handleSkillsOnScroll}
                skills={dropdownSkillsList}
                userSkillsIds={userSkillsIds}
                onSkillClick={onSkillClick}
              />
            )}
            {userSkills.length > 0 && (
              <UserSkills
                className="mt-2"
                items={userSkills}
                handleSkillDelete={handleSkillDelete}
              />
            )}
          </FormGroup>
        </div>
      )}
    </>
  );
}
