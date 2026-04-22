import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { Layout, Server, Database, GitBranch } from 'lucide-react';

const SKILLS = [
  {
    category: 'Frontend',
    icon: Layout,
    color: 'from-blue-500 to-cyan-500',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'from-purple-500 to-indigo-500',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT Auth'],
  },
  {
    category: 'Database',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Entity Framework', 'Mongoose'],
  },
  {
    category: 'Tools & DevOps',
    icon: GitBranch,
    color: 'from-orange-500 to-red-500',
    items: ['Git', 'GitHub', 'Postman', 'Docker (Basics)', 'Vercel', 'VS Code'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader title="Technical Arsenal" subtitle="Skills & Technologies" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skillSet, idx) => (
            <motion.div
              key={skillSet.category}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Subtle background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skillSet.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skillSet.color} p-[1px] mb-6 shadow-lg shadow-blue-500/10`}>
                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center">
                  <skillSet.icon className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />
                </div>
              </div>

              <h3 className="text-xl font-bold dark:text-white text-zinc-900 mb-4 font-display">
                {skillSet.category}
              </h3>

              <motion.ul 
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    }
                  }
                }}
              >
                {skillSet.items.map((item) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-500 transition-colors" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
