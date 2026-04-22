import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-6"
            >
              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Available for Summer 2026 Internships</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6"
            >
              Hi, I'm <br className="hidden md:block" />
              <span className="text-gradient">Ahmad Ibrahim.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              A Web Developer building scalable modern web applications. Currently weaving ideas into code at the University of Sargodha.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 focus:ring-4 focus:ring-blue-500/20"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:malikahmadibrahim332@gmail.com"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 glass-card text-zinc-900 dark:text-white rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Image/Avatar Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0 relative w-full"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full p-2 glass-panel">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay animate-pulse" />
              {/* Nature Image */}
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000&auto=format&fit=crop"
                alt="Nature Scene"
                className="w-full h-full object-cover rounded-full filter contrast-[1.05] drop-shadow-xl ring-4 ring-white/10 dark:ring-white/5"
              />
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-6 left-0 md:-left-4 glass-panel px-6 py-4 rounded-2xl hidden sm:block shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900/10 dark:bg-white/10 flex items-center justify-center">
                  <div className="w-5 h-5 bg-zinc-900 dark:bg-white mask-nextjs" style={{ maskImage: 'url(https://cdn.simpleicons.org/nextdotjs/000000)', WebkitMaskImage: 'url(https://cdn.simpleicons.org/nextdotjs/000000)', maskSize: 'contain', maskRepeat: 'no-repeat' }} />
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white text-zinc-900">Next.js</p>
                  <p className="text-xs text-zinc-500">Framework</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-0 right-0 md:-right-4 glass-panel px-6 py-4 rounded-2xl hidden sm:block shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#61DAFB]/20 flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#61DAFB] mask-react" style={{ maskImage: 'url(https://cdn.simpleicons.org/react/61DAFB)', WebkitMaskImage: 'url(https://cdn.simpleicons.org/react/61DAFB)', maskSize: 'contain', maskRepeat: 'no-repeat' }} />
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white text-zinc-900">React.js</p>
                  <p className="text-xs text-zinc-500">Frontend</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
