import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tourbière Lab — éclairage tente 120×60",
  description:
    "Simulateur PPFD, DLI et coût électrique pour carnivores sous tente Vivosun 120×60×150.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <TooltipProvider delay={200}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
