import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";

export const metadata: Metadata = {
  title: "SAAA — Singapore Aircargo Agents Association",
  description:
    "Representing over 200 member companies, SAAA is the trusted voice of Singapore's airfreight industry.",
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <SiteNav variant="home" />
      <main>
        <HomePageContent />
      </main>
      <SiteFooter variant="home" />
    </>
  );
}
