import { useProjects } from "../../../hooks/useProjects";
import Panel from "../../Layout/Panel";
import { Button } from "../../ui/Button";
import UserSkills from "../UserSkills";
import { DeleteBtn } from "../../DeleteBtn";
import { ProjectImg } from "./ProjectImg";
import { ProfileIconLinkRow } from "../card/read/ProfileIconLinkRow";
import { GithubIcon } from "../../icons/GithubIcon";
import { Link } from "lucide-react";

export function ProjectRead() {
  const { currentProject, openList, onDeleteProject, openEdit } = useProjects();
  if (!currentProject) return;
  const {
    // id,
    previewUrl,
    title,
    description,
    technologies,
    githubLink,
    websiteLink,
  } = currentProject;

  return (
    <Panel className="flex flex-col gap-3">
      <ProjectImg className="h-auto" url={previewUrl} alt={title} />
      <h3 className="text-3xl">{title}</h3>
      <p>{description}</p>
      <div className="flex gap-2 items-center">
        <p className="font-semibold">Used Technologies:</p>
        <UserSkills items={technologies} />
      </div>
      {githubLink && <ProfileIconLinkRow Icon={GithubIcon} href={githubLink} />}
      {websiteLink && <ProfileIconLinkRow Icon={Link} href={websiteLink} />}
      <div className="flex justify-end">
        <Button variant="default" size="xs" onClick={openList}>
          Back
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => openEdit(currentProject)}
        >
          Edit
        </Button>
        <DeleteBtn
          modalSize="2xl"
          btnSize="sm"
          title="Delete Project"
          content="This will permanently delete your project"
          onDelete={onDeleteProject}
          item={currentProject}
        ></DeleteBtn>
      </div>
    </Panel>
  );
}
