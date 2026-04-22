import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Blog } from '../sections/Blog';
import { Contact } from '../sections/Contact';
import { useSEO } from '../hooks/useSEO';

export function Home() {
  useSEO({
    title: 'Ahmad Ibrahim | Portfolio',
    description: 'Portfolio of Ahmad Ibrahim, a Web Developer specializing in React.js, Next.js, and Node.js. Based in Pakistan, currently studying at the University of Sargodha.',
    keywords: 'Ahmad Ibrahim, Web Developer, React, Node.js, Next.js, Portfolio, Frontend, Backend, Pakistan'
  });

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
