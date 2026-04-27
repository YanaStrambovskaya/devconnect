import type { Skill } from "../../types/types";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
type PropsType = {
  items: Skill[];
  handleSkillDelete?: (skill: Skill) => void;
  className?: string;
};
export default function UserSkills({
  items,
  handleSkillDelete,
  className,
}: PropsType) {
  return (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      {Array.from(items).map((skill) => (
        <span
          key={skill.id}
          className="bg-gray-100  px-3 py-2 rounded-full gap-0.5 flex items-center text-md"
        >
          <span>{skill.name}</span>
          {handleSkillDelete && (
            <Button
              type="button"
              size="xxs"
              variant="icon"
              className="rounded-full"
              onClick={() => handleSkillDelete(skill)}
            >
              <X size={14} />
            </Button>
          )}
        </span>
      ))}
    </div>
  );
}
