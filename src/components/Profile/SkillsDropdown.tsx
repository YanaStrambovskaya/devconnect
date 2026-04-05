import type { Skill } from "../../types/types";
import { DropdownList } from "../ui/DropdownList";

type PropsType = {
  skills: Skill[];
  userSkillsIds: Set<string>;
  handleSkillClick: (skill: Skill) => void;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => Promise<void>;
};
export function SkillsDropdown({
  skills,
  userSkillsIds,
  handleSkillClick,
  onScroll,
}: PropsType) {
  return (
    <DropdownList
      onScroll={onScroll}
      items={skills}
      getKey={(skills) => skills.id}
      renderItem={(s) => (
        <div
          onClick={() => handleSkillClick(s)}
          className={`${
            userSkillsIds.has(s.id)
              ? "eventpointer-events-none text-gray-500"
              : "cursor-pointer  hover:bg-gray-100"
          } py-3 px-3 border-b-gray-300`}
        >
          {s.name}
        </div>
      )}
    />
  );
}
