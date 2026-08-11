import type { ReactNode } from "react";

type SubpageHeroProps = {
  title: ReactNode;
  description: string;
  imageAlt?: string;
};

export function SubpageHero({
  title,
  description,
  imageAlt = "SAAA",
}: SubpageHeroProps) {
  return (
    <section className="hero">
      <img src="/images/hero2.jpg" alt={imageAlt} className="hero-bg" />
      <div className="hero-fade" />
      <div className="container">
        <div className="hero-grid">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
