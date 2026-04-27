import type { Skill } from "../../types/types";
import { DropdownList } from "../ui/DropdownList";

type PropsType = {
  skills: Skill[];
  userSkillsIds: Set<string>;
  onSkillClick: (skill: Skill) => void;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => Promise<void>;
  onClose: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
};
export function SkillsDropdown({
  skills,
  userSkillsIds,
  onSkillClick,
  onScroll,
  onClose,
  parentRef,
}: PropsType) {
  return (
    <DropdownList
      parentRef={parentRef}
      onClose={onClose}
      onScroll={onScroll}
      items={skills}
      getKey={(skills) => skills.id}
      renderItem={(s) => (
        <div
          onClick={() => onSkillClick(s)}
          className={`${
            userSkillsIds.has(s.id)
              ? "pointer-events-none text-gray-500"
              : "cursor-pointer  hover:bg-gray-100"
          } py-3 px-3 border-b-gray-300`}
        >
          {s.name}
        </div>
      )}
    />
  );
}
