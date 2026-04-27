import { useState } from "react";
import { useProjects } from "../../../hooks/useProjects";
// import { useAuth } from "../../../contexts/useAuth";
import type { Project } from "../../../types/types";
import { Button } from "../../ui/Button";
import FormControl from "../../ui/FormControl";
import { SkillsProfileEditFormGroup } from "../card/edit/SkillsProfileEditFormGroup";
import { uploadProjectPreview } from "../../../services/services";
import { useAuth } from "../../../contexts/useAuth";
import { ProjectsHeader } from "./ProjectsHeader";
import { ImageUploader } from "../ImageUploader";

export function ProjectForm() {
  const {
    onAddProject,
    onUpdateProject,
    openList,
    currentProject,
    currentViewMode,
    selectProject,
  } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUserEntity } = useAuth();

  type NewProject = Project & { previewFile: File | null };

  const [projectForm, setProjectForm] = useState<NewProject>({
    id: currentProject?.id ?? "",
    previewUrl: currentProject?.previewUrl ?? "",
    previewFile: null,
    title: currentProject?.title ?? "",
    description: currentProject?.description ?? "",
    technologies: currentProject?.technologies ?? [],
    githubLink: currentProject?.githubLink ?? "",
    websiteLink: currentProject?.websiteLink ?? "",
  });

  const projectId =
    currentViewMode === "create" ? crypto.randomUUID() : projectForm.id;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (currentViewMode === "create") {
        setProjectForm((prev) => ({ ...prev, id: projectId }));
      }

      let previewUrl = projectForm.previewUrl;
      if (projectForm.previewFile) {
        const uploadedUrl = await uploadProjectPreview(
          projectForm.previewFile,
          currentUserEntity!.id,
          projectId
        );
        previewUrl = uploadedUrl ?? "";
      }

      const formData = {
        id: projectId,
        previewUrl,
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies,
        githubLink: projectForm.githubLink,
        websiteLink: projectForm.websiteLink,
      };
      if (currentViewMode === "edit") {
        await onUpdateProject(formData);
      } else {
        await onAddProject(formData);
      }
      selectProject(null);
      openList();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOnFormElementChange(
    filedName: Extract<keyof Project, string>
  ) {
    return (value: string) =>
      setProjectForm((prev) => ({ ...prev, [filedName]: value }));
  }
  function handleUpdateProfileForm<K extends keyof NewProject>(key: K) {
    return (data: NewProject[K]) =>
      setProjectForm((prev) => ({ ...prev, [key]: data }));
  }

  return (
    <>
      <ProjectsHeader
        text={
          currentViewMode === "edit"
            ? "Edit Your Project"
            : "Create Your Project"
        }
      />
      <form onSubmit={handleSubmit}>
        <ImageUploader
          alt="Preview"
          value={projectForm.previewUrl}
          updateState={handleUpdateProfileForm("previewFile")}
          className="rounded-md w-full aspect-video object-cover my-3"
          fallback={
            <div className="rounded-md text-md w-full aspect-video my-3 bg-taupe-200 flex items-center justify-center">
              No Image
            </div>
          }
        />
        <FormControl
          label="Enter the project title"
          required={true}
          value={projectForm.title}
          id="title"
          type="text"
          maxLength={60}
          onChange={handleOnFormElementChange("title")}
          name="title"
        />
        <FormControl
          label="Enter the description"
          value={projectForm.description}
          id="description"
          type="textarea"
          rows={5}
          onChange={handleOnFormElementChange("description")}
          name="description"
        />

        {/* githubLink */}
        <FormControl
          label="GitHub Link"
          value={projectForm.githubLink}
          id="githubLink"
          type="text"
          onChange={handleOnFormElementChange("githubLink")}
          name="githubLink"
        />
        {/* websiteLink */}
        <FormControl
          label="websiteLink"
          value={projectForm.websiteLink}
          id="websiteLink"
          type="text"
          onChange={handleOnFormElementChange("websiteLink")}
          name="websiteLink"
        />

        {/* Skills */}
        <SkillsProfileEditFormGroup
          userSkills={projectForm.technologies}
          updateState={handleUpdateProfileForm("technologies")}
        />

        <div className="flex justify-end gap-1">
          <Button
            disabled={isLoading}
            variant={isLoading ? "primaryDisabled" : "primary"}
            size="sm"
            type="submit"
          >
            {isLoading ? "Loading" : "Save"}
          </Button>
          <Button variant="default" size="sm" onClick={openList}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
