import Panel from "../../Layout/Panel";
import { Button } from "../../ui/Button";
import { useProjects } from "../../../hooks/useProjects";
import type { Project } from "../../../types/types";
import UserSkills from "../UserSkills";
import { DeleteBtn } from "../../DeleteBtn";
import { LineSeparator } from "../../ui/LineSeparator";
import { ProjectImg } from "./ProjectImg";

export function ProjectPreview({ project }: { project: Project }) {
  const { openRead, openEdit, onDeleteProject } = useProjects();

  const { title, previewUrl, technologies, description } = project;

  return (
    <Panel className="h-full flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <ProjectImg url={previewUrl} alt={description}></ProjectImg>
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <UserSkills items={technologies}></UserSkills>
        <LineSeparator className="bg-gray-200 my-2"></LineSeparator>
        <div className="flex gap-2 justify-end">
          <Button variant="default" size="sm" onClick={() => openRead(project)}>
            View
          </Button>
          <Button variant="default" size="sm" onClick={() => openEdit(project)}>
            Edit
          </Button>
          <DeleteBtn
            modalSize="lg"
            btnSize="sm"
            title="Delete Project"
            content="This will permanently delete your project"
            onDelete={onDeleteProject}
            item={project}
          ></DeleteBtn>
        </div>
      </div>
    </Panel>
  );
}
