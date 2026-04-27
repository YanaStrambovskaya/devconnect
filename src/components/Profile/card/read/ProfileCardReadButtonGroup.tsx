import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/useAuth";
import type { ModalConfigType } from "../../../../types/types";
import { Button } from "../../../ui/Button";
import { useModal } from "../../../../contexts/useModal";

export default function ProfileCardReadButtonGroup({
  onEditStart,
}: {
  onEditStart: () => void;
}) {
  const { onOpen, onClose } = useModal();
  const { deleteUser } = useAuth();
  const navigation = useNavigate();
  const modalConfig: ModalConfigType = {
    size: "xl",
    title: "Delete Profile",
    content:
      "This will permanently delete all data at this location, including all nested data",
    footer: (
      <>
        <Button size="sm" variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" variant="danger" onClick={handleDeleteUser}>
          Delete
        </Button>
      </>
    ),
  };

  async function handleDeleteUser() {
    try {
      onClose();
      await deleteUser();
      navigation("/register");
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  return (
    <>
      <Button onClick={onEditStart} size="sm" className="w-full">
        Edit Profile
      </Button>
      <Button
        variant="danger"
        className="w-full"
        size="sm"
        type="button"
        onClick={() => onOpen(modalConfig)}
      >
        Delete Profile
      </Button>
    </>
  );
}
