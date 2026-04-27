import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { DropdownList } from "../ui/DropdownList";
import { useCurrentUserEntity } from "../../hooks/useCurrentUserEntity";
import { LogOut, User } from "lucide-react";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { UserImg } from "./UserImg";

export default function UserProfileIcon() {
  const { logout } = useAuth();
  const navigation = useNavigate();
  const location = useLocation();
  const isFrofilePage = location.pathname === "/profile";

  async function hangLogout() {
    try {
      await logout();
      navigation("/login");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  function handleToggle() {
    setIsProfileDropdownOpen((prev) => !prev);
  }
  function handleCloseDropdown() {
    setIsProfileDropdownOpen(false);
  }
  const className =
    "w-full flex gap-1 items-center border-0 bg-white rounded-none";
  const items = [
    <Button
      size="sm"
      variant={isFrofilePage ? "defaultDisabled" : "default"}
      className={className}
      as={Link}
      to="/profile"
    >
      <User size={18} /> <span>Profile</span>
    </Button>,
    <Button size="sm" className={className} onClick={hangLogout}>
      <LogOut size={18} /> <span>Logout</span>
    </Button>,
  ];
  const { photoURL, displayName } = useCurrentUserEntity();
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div ref={parentRef} className="relative">
        <div
          className="w-[30px] h-[30px] bg-gray-400 rounded-full cursor-pointer"
          onClick={handleToggle}
        >
          <UserImg url={photoURL} alt={displayName} />
        </div>
        {isProfileDropdownOpen && (
          <DropdownList
            parentRef={parentRef}
            className="w-[180px] right-0 top-[40px]"
            items={items}
            getKey={(_, i) => i}
            renderItem={(u) => u}
            onClose={handleCloseDropdown}
          ></DropdownList>
        )}
      </div>
    </>
  );
}
