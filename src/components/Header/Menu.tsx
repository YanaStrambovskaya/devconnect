import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import UserProfileIcon from "./UserProfileIcon";

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

  const { currentUserEntity } = useAuth();
  return (
    <nav className="flex gap-10 items-center justify-between md:justify-end">
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
      {currentUserEntity && <UserProfileIcon />}
    </nav>
  );
}
