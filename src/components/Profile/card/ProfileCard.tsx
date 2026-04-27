import { useState } from "react";
import ProfileCardEdit from "./ProfileCardEdit";
import ProfileCardRead from "./ProfileCardRead";
import { useCurrentUserEntity } from "../../../hooks/useCurrentUserEntity";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const userView = useCurrentUserEntity();

  return (
    <>
      {isEditing ? (
        <ProfileCardEdit
          userView={userView}
          onEditStop={() => setIsEditing(false)}
        />
      ) : (
        <ProfileCardRead
          userView={userView}
          onEditStart={() => setIsEditing(true)}
        />
      )}
    </>
  );
}
