import { Button } from "./ui/Button";
type Props = {
  actions: {
    google: () => Promise<void>;
    gitHub: () => Promise<void>;
  };
};

export default function SocialAuthButtons({ actions }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Button onClick={actions.google} className="w-full">
        Sign Up with Google
      </Button>
      <Button onClick={actions.gitHub} className="w-full">
        Sign Up with GitHub
      </Button>
    </div>
  );
}
