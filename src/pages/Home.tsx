import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { AIML, PHPLaravel } from '../sections/Expertise';
import { Blog } from '../sections/Blog';
import { Contact } from '../sections/Contact';
import { useSEO } from '../hooks/useSEO';

export function Home() {
  useSEO({
    title: 'Ahmad Ibrahim | Portfolio',
    description: 'Explore Ahmad Ibrahim’s work in web development, AI/ML, and PHP & Laravel, including machine learning projects and PNY Training under the NAVTEC program.',
    keywords: 'Ahmad Ibrahim, Web Developer, React, Node.js, Next.js, AI, Machine Learning, Python, PHP, Laravel, MySQL, PNY Training, NAVTEC, Portfolio, Pakistan'
  });

  return (
    <main>
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
