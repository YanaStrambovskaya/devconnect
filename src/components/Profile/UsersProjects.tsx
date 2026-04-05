import type { Project } from "../../types/types";
import Panel from "../Layout/Panel";

export default function UsersProjects({
  projects,
}: {
  projects: Set<Project>;
}) {
  const gridColsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };
  const colAmount = projects.size >= 3 ? 3 : (projects.size as 1 | 2 | 3);

  return (
    <div className={`grid ${gridColsMap[colAmount]} gap-5`}>
      {Array.from(projects).map((panel) => {
        const { id, title, description, technologies, links } = panel;
        return (
          <Panel key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div>
              Used Technologies:&nbsp;
              {technologies.map((tech, i) => (
                <span
                  key={`${id}-${i}`}
                  className="bg-gray-200 border border-gray-300 p-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div>
              Project Links:&nbsp;
              {links.map((link, i) => (
                <div key={`${id}-${i}`}>
                  <span>{link.title}</span>
                  <a href={link.url}>Link</a>
                </div>
              ))}
            </div>
          </Panel>
        );
      })}
    </div>
  );
}
