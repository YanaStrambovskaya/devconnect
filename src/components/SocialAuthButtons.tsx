import { Button } from "./ui/Button";
import type { AuthButtonConfigType } from "../types/types";
type Props = {
  buttons: AuthButtonConfigType;
};
export default function SocialAuthButtons({ buttons }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {buttons.map(({ title, action, Icon }, i) => {
        return (
          <Button
            key={i}
            onClick={action}
            className="w-full flex items-center justify-center gap-1"
          >
            <Icon className="h-[20px]" />
            {title}
          </Button>
        );
      })}
    </div>
  );
}
