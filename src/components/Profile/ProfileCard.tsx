import { useState } from "react";
import ProfileCardEdit from "./ProfileCardEdit";
import ProfileCardRead from "./ProfileCardRead";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuth } from "../../contexts/useAuth";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const userView = useCurrentUser();
  const { userEntity } = useAuth();

  return (
    <>
      {isEditing ? (
        <ProfileCardEdit
          auth={userEntity!.auth}
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
