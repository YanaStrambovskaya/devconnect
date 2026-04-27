import { useState, type PropsWithChildren } from "react";
import type {
  Project,
  ProjectsContextType,
  ProjectsViewMode,
  UserProfileCardEditable,
} from "../types/types";
import { ProjectsContext } from "./ProjectsContext";
import { useCurrentUserEntity } from "../hooks/useCurrentUserEntity";
import { useAuth } from "./useAuth";

export function ProjectsProvider({ children }: PropsWithChildren) {
  const [currentViewMode, setCurrentViewMode] =
    useState<ProjectsViewMode>("list");
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const { id: userId, projects: userProjects } = useCurrentUserEntity();
  const { onUpdateUserProfile, syncUserProfile } = useAuth();

  // function changeViewMode(value: ProjectsViewMode) {
  //   setCurrentViewMode(value);
  // }
  function selectProject(project: Project | null) {
    setCurrentProject(project);
  }
  async function onAddProject(project: Project) {
    const updatedUserProjects = [...userProjects, project];
    const profileData: Partial<UserProfileCardEditable> = {
      projects: updatedUserProjects,
    };
    syncUserProfile(profileData);
    try {
      await onUpdateUserProfile(userId, profileData);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  async function onDeleteProject(project: Project) {
    const ProjectFormsSet = userProjects.filter((u) => u.id !== project.id);
    const profileData = {
      projects: ProjectFormsSet,
    };
    syncUserProfile(profileData);
    try {
      await onUpdateUserProfile(userId, profileData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function onUpdateProject(project: Project) {
    const updatedProjects = userProjects.map((p) => {
      return p.id === project.id ? { ...p, ...project } : p;
    });

    const profileData = {
      projects: updatedProjects,
    };
    syncUserProfile(profileData);
    try {
      await onUpdateUserProfile(userId, profileData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  function openList() {
    setCurrentProject(null);
    setCurrentViewMode("list");
  }
  function openCreate() {
    setCurrentProject(null);
    setCurrentViewMode("create");
  }
  function openRead(project: Project) {
    setCurrentViewMode("read");
    setCurrentProject(project);
  }
  function openEdit(project: Project) {
    setCurrentViewMode("edit");
    setCurrentProject(project);
  }

  const value: ProjectsContextType = {
    projects: userProjects,
    onAddProject,
    onDeleteProject,
    onUpdateProject,
    selectProject,
    currentProject,
    openList,
    openCreate,
    openRead,
    openEdit,
    currentViewMode,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}
