import { Container } from "../../Layout/Container";
import { Title } from "../../ui/Title";
import { Button, buttonStyles } from "../../ui/Button";
import { Link } from "react-router-dom";
import type { VariantProps } from "class-variance-authority";
import { useAuth } from "../../../contexts/useAuth";

type HeroAction = {
  path: string;
  label: string;
  variant: VariantProps<typeof buttonStyles>["variant"];
};

type HeroImage = {
  src: string;
  alt: string;
};

type HeroProps = {
  title: string;
  description: string[];
  actions: HeroAction[];
  image: HeroImage;
};

export function Hero({ title, description, actions, image }: HeroProps) {
  const { currentUserEntity } = useAuth();

  const content = currentUserEntity
    ? {
        title: currentUserEntity.displayName
          ? `Welcome back, ${currentUserEntity.displayName}`
          : "Welcome back",
        description: [
          "Discover developers, share projects, and keep growing your network.",
          "Jump back in and explore the community.",
        ],
        actions: [
          { path: "/feed", label: "Go to Feed", variant: "primary" },
          { path: "/profile", label: "View Profile", variant: "default" },
        ] as HeroAction[],
      }
    : {
        title,
        description,
        actions,
      };

  return (
    <section>
      <Container>
        <div className="flex items-center gap-5">
          <div className="flex w-[50%] flex-col gap-10">
            <Title level={1} className="text-blue-900">
              {content.title}
            </Title>

            <Description
              description={content.description}
              className="text-xl"
            />

            <div className="flex gap-5">
              <Actions actions={content.actions} />
            </div>
          </div>

          <div className="w-[50%]">
            <img src={image.src} alt={image.alt} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Description({
  description,
  className,
}: {
  description: string[];
  className: string;
}) {
  return (
    <div>
      {description.map((text, index) => (
        <p key={index} className={className}>
          {text}
        </p>
      ))}
    </div>
  );
}

function Actions({ actions }: { actions: HeroAction[] }) {
  return (
    <>
      {actions.map(({ variant, path, label }) => (
        <Button key={path} as={Link} to={path} variant={variant}>
          {label}
        </Button>
      ))}
    </>
  );
}
