import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components";
import { ThemeProvider } from "@/contexts/theme-context";
import { ScrollProvider } from "@/contexts/scroll-context";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollSpy } from "@/components/scroll-spy";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Wesley Junior · Fullstack Developer",
  description: "Portfólio do Desenvolvedor Fullstack Wesley Junior",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${syne.variable}`}>
        <ThemeProvider>
          <ScrollProvider>
            <CustomCursor />
            <ScrollProgress />
            <SmoothScroll />
            <Header />
            <main data-scroll-container>{children}</main>
            <ScrollSpy />
          </ScrollProvider>
        </ThemeProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
