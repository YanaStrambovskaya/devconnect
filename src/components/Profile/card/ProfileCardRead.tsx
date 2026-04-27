import { Divider } from "../../ui/Divider";
import { Calendar, Link, Mail, MapPin } from "lucide-react";
import { formateDate } from "../../../utils/formateDate";
import type { CurrentUserEntity } from "../../../types/types";
import { Label } from "../../ui/Label";
import UserSkills from "../UserSkills";
import { LinkedinIcon } from "../../icons/LinkedinIcon";
import { GithubIcon } from "../../icons/GithubIcon";
import ProfileCardReadRow from "./read/ProfileCardReadRow";
import { ProfileIconLinkRow } from "./read/ProfileIconLinkRow";
import ProfileCardReadButtonGroup from "./read/ProfileCardReadButtonGroup";
import { AvatarImg } from "../AvatarImg";

type Props = {
  onEditStart: () => void;
  userView: CurrentUserEntity;
};
export default function ProfileCardRead({ onEditStart, userView }: Props) {
  const {
    displayName,
    email,
    joinedTs,
    photoURL,
    profession,
    aboutMe,
    country,
    skills,
    githubLink,
    linkedinLink,
    socialLink1,
    socialLink2,
    socialLink3,
    websiteLink,
  } = userView;
  const hasSkills = skills?.length > 0;

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <AvatarImg alt={displayName} url={photoURL} />
      </div>
      <div className="flex flex-col gap-2">
        {displayName && (
          <ProfileCardReadRow className="text-2xl mt-4 font-semibold">
            {displayName}
          </ProfileCardReadRow>
        )}
        {profession && (
          <ProfileCardReadRow className="text-lg">
            {profession}
          </ProfileCardReadRow>
        )}
        {aboutMe && <ProfileCardReadRow>{aboutMe}</ProfileCardReadRow>}
      </div>

      <Divider />
      {githubLink && <ProfileIconLinkRow Icon={GithubIcon} href={githubLink} />}
      {linkedinLink && (
        <ProfileIconLinkRow Icon={LinkedinIcon} href={linkedinLink} />
      )}
      {socialLink1 && <ProfileIconLinkRow Icon={Link} href={socialLink1} />}
      {socialLink2 && <ProfileIconLinkRow Icon={Link} href={socialLink2} />}
      {socialLink3 && <ProfileIconLinkRow Icon={Link} href={socialLink3} />}
      {websiteLink && <ProfileIconLinkRow Icon={Link} href={websiteLink} />}

      <Divider />

      <div className="flex flex-col gap-2">
        {email && <ProfileIconLinkRow Icon={Mail} href={`mailto:${email}`} />}
        {country && (
          <div className="flex gap-2 items-center">
            <MapPin size={18} />
            <img
              className="h-[12px]"
              src={country.flags}
              onError={(e) => (e.currentTarget.style.display = "none")}
              alt={country.alt}
            />
            <span>{country.name}</span>
          </div>
        )}
        <ProfileCardReadRow>
          <Calendar size={18} />
          <div data-value={joinedTs}>{formateDate(joinedTs)}</div>
        </ProfileCardReadRow>
      </div>

      {hasSkills && (
        <>
          <Divider className="Divider-2" />
          <div className="mb-2">
            <Label htmlFor="skills">Skills</Label>
            <UserSkills items={skills} />
          </div>
        </>
      )}

      <Divider />

      <div className="flex flex-col gap-1">
        <ProfileCardReadButtonGroup onEditStart={onEditStart} />
      </div>
    </>
  );
}
