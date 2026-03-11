import { About, Hero, Skills, Projects, Contact, Footer } from "@/components";
import { GridBackground } from "@/components/grid-background";

export default function Home() {
  return (
    <>
      <GridBackground />
      <div className="relative z-10">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
