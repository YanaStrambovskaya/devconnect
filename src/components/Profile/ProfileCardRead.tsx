import { Divider } from "../ui/Divider";
import { Calendar, Mail, MapPin } from "lucide-react";
import { formateDate } from "../../utils/formateDate";
import { Button } from "../ui/Button";
import Avatar from "./Avatar";
import type { CurrentUserView } from "../../types/types";
import { Label } from "../ui/Label";
import UserSkills from "./UserSkills";

type Props = {
  onEditStart: () => void;
  userView: CurrentUserView;
};
export default function ProfileCardRead({ onEditStart, userView }: Props) {
  const {
    displayName,
    email,
    joinedTs,
    photoURL,
    profession,
    bio,
    country,
    skills,
  } = userView;
  const hasSkills = skills.size > 0;
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <Avatar photoURL={photoURL} displayName={displayName} />
      </div>
      <div className="flex flex-col items-center gap-2">
        {displayName && <div className="text-3xl">{displayName}</div>}
        {profession && <div className="text-sm">{profession}</div>}
        {bio && <div className="text-3xl">{bio}</div>}
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Mail size={18} />
          {email}
        </div>
        {country && (
          <div className="flex gap-2">
            <MapPin size={18} />
            <img className="h-[12px]" src={country.flags} alt={country.alt} />
            <span>{country.name}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Calendar size={18} />
          <div data-value={joinedTs}>{formateDate(joinedTs)}</div>
        </div>
      </div>

      {hasSkills && (
        <>
          <Divider className="Divider-2" />
          <div className="mb-2">
            <Label htmlFor="skills">Skills</Label>
            <UserSkills skills={skills} />
          </div>
        </>
      )}
      <Divider />
      <Button onClick={onEditStart} className="w-full">
        Edit Profile
      </Button>
    </>
  );
}
