import { Button } from "../../../ui/Button";

export function ProfileCardEditButtonsGroup({
  onEditStop,
  isLoading,
}: {
  onEditStop: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex gap-2">
      <Button
        variant={isLoading ? "primaryDisabled" : "primary"}
        className="w-[50%]"
        size="sm"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Loading" : "Save"}
      </Button>
      <Button
        variant="default"
        className="w-[50%]"
        size="sm"
        type="button"
        onClick={onEditStop}
      >
        Cancel
      </Button>
    </div>
  );
}
