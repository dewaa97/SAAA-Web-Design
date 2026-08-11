import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import type { NavVariant } from "@/lib/content/navigation";

type SiteLayoutProps = {
  variant?: NavVariant;
  children: React.ReactNode;
};

export function SiteLayout({ variant = "subpage", children }: SiteLayoutProps) {
  return (
    <>
      <SiteNav variant={variant} />
      {children}
      <SiteFooter variant={variant === "home" ? "home" : "subpage"} />
    </>
  );
}
