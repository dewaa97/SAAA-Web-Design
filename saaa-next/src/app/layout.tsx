import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist } from "next/font/google";
import { defaultMetadata } from "@/lib/seo/metadata";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, spaceGrotesk.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
