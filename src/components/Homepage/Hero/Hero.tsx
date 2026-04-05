// import styles from "./Hero.module.scss";
// import { Link } from "react-router-dom";
import { Container } from "../../Layout/Container";
import { Title } from "../../ui/Title";
import { Button, buttonStyles } from "../../ui/Button";
import { Link } from "react-router-dom";
import type { VariantProps } from "class-variance-authority";

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
  return (
    <section className="">
      <Container>
        <div className="flex gap-5">
          <div className="w-[50%] flex flex-col gap-10">
            <Title level={1} className="text-blue-900">
              {title}
            </Title>
            <Description description={description} className="text-xl" />
            <div className="flex gap-5">
              <Actions actions={actions} />
            </div>
          </div>
          <div className="w-[50%]">
            <img src={image.src} alt={image.src} />
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
      {description.map((el, i) => (
        <p key={i} className={className}>
          {el}
        </p>
      ))}
    </div>
  );
}
function Actions({ actions }: { actions: HeroAction[] }) {
  return (
    <>
      {actions.map(({ variant, path, label }) => {
        return (
          <Button key={path} as={Link} to={path} variant={variant}>
            {label}
          </Button>
        );
      })}
    </>
  );
}
