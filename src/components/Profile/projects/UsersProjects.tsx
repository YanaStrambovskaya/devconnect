import { useProjects } from "../../../hooks/useProjects";
import { Button } from "../../ui/Button";
import { ProjectsEmpty } from "./ProjectsEmpty";
import { ProjectsList } from "./ProjectsList";
// import { ProjectRead } from "./ProjectRead";
import { ProjectRead } from "./ProjectRead";
import { ProjectForm } from "./ProjectForm";
import { LineSeparator } from "../../ui/LineSeparator";
// import { useCurrentUserEntity } from "../../../hooks/useCurrentUserEntity";

export default function UsersProjects() {
  const { projects, currentViewMode, openCreate, currentProject } =
    useProjects();
  // const [isCreateProjectForm, setIsCreateProjectForm] = useState(false);

  if (currentViewMode === "create" || currentViewMode === "edit") {
    return <ProjectForm key={currentProject?.id ?? "create"}></ProjectForm>;
  }

  if (currentViewMode === "read") {
    return <ProjectRead></ProjectRead>;
  }
  return (
    <>
      <h1 className="mb-2 text-3xl">My Projects</h1>
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md min-h-[200px] p-5">
        {!projects.length ? <ProjectsEmpty /> : <ProjectsList />}
        {projects.length ? (
          <LineSeparator className="my-6"></LineSeparator>
        ) : (
          ""
        )}
        <Button variant="primary" size="md" onClick={() => openCreate()}>
          {!projects.length ? "Add Your First Project" : "Create New Project"}
        </Button>
      </div>
    </>
  );
}
