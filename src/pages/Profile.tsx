import Panel from "../components/Layout/Panel";
import ProfileCard from "../components/Profile/card/ProfileCard";
import { ProjectsProvider } from "../contexts/ProjectsProvider";
import UsersProjects from "../components/Profile/projects/UsersProjects";

export default function Profile() {
  return (
    <div className="container flex gap-[50px]">
      <div className="sticky top-0 w-[30%] max-w-[300px] shrink-0">
        <Panel>
          <ProfileCard />
        </Panel>
      </div>
      <div className="grow sticky top-0">
        <ProjectsProvider>
          <UsersProjects />
        </ProjectsProvider>
      </div>
    </div>
  );
}
