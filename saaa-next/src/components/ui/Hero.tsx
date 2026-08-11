import Image from "next/image";
import type { ReactNode } from "react";

type HeroProps = {
  title: ReactNode;
  description?: string;
  bgImage: string;
  imageAlt: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
  className?: string;
  priority?: boolean;
};

export function Hero({
  title,
  description,
  bgImage,
  imageAlt,
  actions,
  breadcrumb,
  className,
  priority = false,
}: HeroProps) {
  return (
    <section className={["hero", className].filter(Boolean).join(" ")}>
      <Image
        src={bgImage}
        alt={imageAlt}
        className="hero-bg"
        width={1920}
        height={1080}
        priority={priority}
        sizes="100vw"
        unoptimized
      />
      <div className="hero-fade" />
      <div className="container">
        <div className="hero-grid">
          <div>
            {breadcrumb}
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
            {actions ? <div className="hero-actions">{actions}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
