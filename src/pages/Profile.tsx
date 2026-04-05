import { useAuth } from "../contexts/useAuth";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Panel from "../components/Layout/Panel";
import ProfileCard from "../components/Profile/ProfileCard";
import UsersProjects from "../components/Profile/UsersProjects";

export default function Profile() {
  const [error, setError] = useState("");
  const { userEntity } = useAuth();
  const projects = userEntity?.profile.projects || null;
  const navigation = useNavigate();

  const { logout } = useAuth();
  //   const { currentUser, logout } = useAuth();
  async function hangLogout() {
    setError("");
    try {
      await logout();
      navigation("/login");
    } catch {
      setError("Failed to logout");
    }
  }
  function hangDelete() {}
  function handleAddProject() {}
  return (
    <div className="container flex gap-[50px]">
      <div className="sticky top-0 w-[30%] max-w-[300px] shrink-0">
        <Panel>
          <ProfileCard />
        </Panel>
      </div>
      <div className="grow">
        <h1 className="mb-2 text-3xl">My Projects</h1>
        {projects ? (
          <UsersProjects projects={projects} />
        ) : (
          <div className="flex flex-col items-center justify-center border border-gray-300 rounded-md min-h-[200px]">
            <p className="text-gray-500 text-sm mb-2">
              You do not have projects
            </p>
            <Button variant="primary" onClick={handleAddProject}>
              Add Your First Project
            </Button>
          </div>
        )}

        <Button variant="primary" onClick={hangLogout}>
          Logout
        </Button>
        <Button variant="danger" onClick={hangDelete}>
          Delete Profile
        </Button>
        <Button variant="default" onClick={hangDelete}>
          Delete Profile
        </Button>
        {error ? <p>{error}</p> : ""}
      </div>
    </div>
  );
}
