import { NavLink } from "react-router-dom";

export function Menu() {
  const getItemClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-[var(--primary-color-hover)] ${
      isActive ? "text-[var(--primary-color)]" : ""
    }`;

  const menuLinks = [
    { path: "/", label: " Home", end: true },
    { path: "/feed", label: "Feed", end: true },
    { path: "/developers", label: "Developers", end: true },
    { path: "/projects", label: "Projects", end: true },
    { path: "/jobs", label: "Jobs", end: true },
  ];
  return (
    <nav className="flex gap-10 items-center">
      {menuLinks.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={getItemClass}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
