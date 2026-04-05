import { Hero } from "../components/Homepage/Hero/Hero";
import heroImage from "../assets/images/hero-image.png";

export default function Homepage() {
  return (
    <>
      <Hero
        title="Connect, Collaborate, Code"
        description={[
          "Join the developer community",
          "Share your projects, find collaborators, and grow your network",
        ]}
        actions={[
          {
            path: "/register",
            label: "Join Now",
            variant: "primary",
          },
          {
            path: "/login",
            label: "Sign In",
            variant: "default",
          },
        ]}
        image={{
          src: heroImage,
          alt: "Some text",
        }}
      />
    </>
  );
}
