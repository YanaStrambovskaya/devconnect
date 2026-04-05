import type { Skill } from "../../types/types";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
type PropsType = {
  skills: Set<Skill>;
  handleSkillDelete?: (skill: Skill) => void;
};
export default function UserSkills({ skills, handleSkillDelete }: PropsType) {
  return (
    <div className="flex gap-2 mt-2">
      {Array.from(skills).map((skill) => (
        <span
          key={skill.id}
          className="bg-gray-100 px-3 py-2 rounded-full flex gap-2 items-center text-xs"
        >
          <span>{skill.name}</span>
          {handleSkillDelete && (
            <Button
              type="button"
              variant="icon"
              onClick={() => handleSkillDelete(skill)}
            >
              <X size={12} />
            </Button>
          )}
        </span>
      ))}
    </div>
  );
}
