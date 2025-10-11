import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Header } from "@/components";
import { ThemeProvider } from "@/contexts/theme-context";
import { ScrollProvider } from "@/contexts/scroll-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfólio | Wesley Junior",
  description: "Portfólio do Desenvolvedor Fullstack Wesley Junior",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ScrollProvider>
            <SmoothScroll />
            <Header />
            <main data-scroll-container>{children}</main>
          </ScrollProvider>
        </ThemeProvider>
        <div id="modal-root"></div> 
      </body>
    </html>
  );
}
