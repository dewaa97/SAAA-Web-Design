import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ImddSidebarNav } from "@/components/imdd/ImddSidebarNav";
import { Hero } from "@/components/ui/Hero";
import type { ImddHubNavItem } from "@/lib/content/imdd";
import type { ReactNode } from "react";

type ImddLayoutProps = {
  activeNavId: string;
  hubNav: ImddHubNavItem[];
  title: ReactNode;
  description: string;
  bgImage?: string;
  children: ReactNode;
};

export function ImddLayout({
  activeNavId,
  hubNav,
  title,
  description,
  bgImage = "/images/project-imdd/hero-logistics.jpg",
  children,
}: ImddLayoutProps) {
  return (
    <SiteLayout variant="subpage">
      <Hero
        className="imdd-hero"
        title={title}
        description={description}
        bgImage={bgImage}
        imageAlt="Project IMDD — developing logistics talent"
        breadcrumb={
          <div className="imdd-breadcrumb">
            <Link href="/programmes">Programmes</Link>
            <span>/</span>
            <span>Project IMDD</span>
          </div>
        }
      />
      <div className="imdd-page-shell">
        <div className="container imdd-layout">
          <ImddSidebarNav items={hubNav} activeId={activeNavId} />
          <main className="imdd-main">{children}</main>
        </div>
      </div>
    </SiteLayout>
  );
}
