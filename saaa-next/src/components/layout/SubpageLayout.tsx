import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/ui/Hero";
import type { ReactNode } from "react";

type SubpageLayoutProps = {
  title: ReactNode;
  description: string;
  bgImage?: string;
  imageAlt?: string;
  children: ReactNode;
};

export function SubpageLayout({
  title,
  description,
  bgImage = "/images/hero2.jpg",
  imageAlt = "SAAA",
  children,
}: SubpageLayoutProps) {
  return (
    <SiteLayout variant="subpage">
      <Hero title={title} description={description} bgImage={bgImage} imageAlt={imageAlt} />
      <main>{children}</main>
    </SiteLayout>
  );
}
