import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { ExternalLink, Github, CheckCircle2 } from 'lucide-react';

const FEATURED_PROJECT = {
  title: 'Multi-Tenant Team Workspace & Payroll SaaS',
  description: 'A comprehensive SaaS-style application designed for small to medium businesses to manage their workforce, projects, and payroll from a single scalable platform.',
  features: [
    'Multi-company workspace isolation',
    'Role-based access control (Admin vs. Employee)',
    'Jira-like time tracking & task logging',
    'Integrated Slack-style team chat',
    'Automated, dynamic payroll calculations',
    'Monthly invoice & report generation',
  ],
  stack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB'],
  liveUrl: 'https://core-flow-saas-app.vercel.app/',
  githubUrl: 'https://github.com/ahmad-ibrahim-aheer/',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
};

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <SectionHeader title="Featured Work" subtitle="Portfolio" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-[2rem] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 lg:h-auto overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent z-10" />
              <img
                src={FEATURED_PROJECT.image}
                alt={FEATURED_PROJECT.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20 flex gap-3 flex-wrap">
                {FEATURED_PROJECT.stack.slice(0, 3).map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">
                    {tech}
                  </span>
                ))}
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">
                  +{FEATURED_PROJECT.stack.length - 3}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="shrink-0 mb-6">
                <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-xs mb-2 block">
                  Featured Project
                </span>
                <h3 className="text-2xl lg:text-3xl font-display font-bold dark:text-white text-zinc-900">
                  {FEATURED_PROJECT.title}
                </h3>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                {FEATURED_PROJECT.description}
              </p>

              <div className="space-y-3 mb-10 text-sm md:text-base">
                {FEATURED_PROJECT.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-auto">
                <a
                  href={FEATURED_PROJECT.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-500/20 shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
                <a
                  href={FEATURED_PROJECT.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 glass-card text-zinc-900 dark:text-white rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
