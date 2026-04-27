import type { VariantProps } from "class-variance-authority";
import type { ModalConfigType } from "../types/types";
import { Button, buttonStyles } from "./ui/Button";
import { useModal } from "../contexts/useModal";
type Props<T> = {
  modalSize: ModalConfigType["size"];
  btnSize: VariantProps<typeof buttonStyles>["size"];
  title: string;
  content: string;
  onDelete: (value: T) => void;
  item: T;
};
export function DeleteBtn<T>({
  modalSize,
  btnSize = "sm",
  title,
  content,
  onDelete,
  item,
}: Props<T>) {
  const { onOpen, onClose } = useModal();
  function handleDelete() {
    onDelete(item);
    onClose();
  }
  const modalConfig: ModalConfigType = {
    size: modalSize,
    title,
    content,
    footer: (
      <>
        <Button size="sm" variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </>
    ),
  };
  return (
    <Button
      variant="default"
      size={btnSize}
      // onClick={() => onDeleteProject(currentProject)}
      onClick={() => onOpen(modalConfig)}
    >
      Delete
    </Button>
  );
}
