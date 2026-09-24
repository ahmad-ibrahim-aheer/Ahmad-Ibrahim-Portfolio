import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { AIML, PHPLaravel } from "../sections/Expertise";
import { Blog } from "../sections/Blog";
import { Contact } from "../sections/Contact";
import { useSEO } from "../hooks/useSEO";
import { SITE } from "../data/site";
import { usePageNavigation } from "../hooks/usePageNavigation";

export function Home() {
  usePageNavigation();
  useSEO({
    title: SITE.title,
    description: SITE.description,
    keywords:
      "Ahmad Ibrahim, Web Developer, React, Node.js, Next.js, AI, Machine Learning, Python, PHP, Laravel, MySQL, PNY Training, NAVTEC, Portfolio, Pakistan",
  });

  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <AIML />
      <PHPLaravel />
      <Blog />
      <Contact />
    </main>
  );
}
