import { useProjects } from "../../../hooks/useProjects";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectsList() {
  const { projects } = useProjects();
  // const gridColsMap = {
  //   1: "grid-cols-1",
  //   2: "grid-cols-2",
  //   3: "grid-cols-3",
  // };
  // const colAmount = projects.length >= 3 ? 3 : (projects.length as 1 | 2 | 3);
  return (
    <div className={`grid grid-cols-2 gap-5`}>
      {projects.map((project) => {
        return (
          <ProjectPreview key={project.id} project={project}></ProjectPreview>
        );
      })}
    </div>
  );
}
