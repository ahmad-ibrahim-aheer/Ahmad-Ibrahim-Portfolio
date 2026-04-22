import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { GraduationCap, Code2, Rocket, Briefcase } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'BS Computer Science • University of Sargodha (2024–2028)',
  },
  {
    icon: Code2,
    title: 'Focus',
    desc: 'Web Development, heavily invested in React ecosystem.',
  },
  {
    icon: Rocket,
    title: 'Next Step',
    desc: 'Expanding into Mobile App Development to build cross-platform solutions.',
  },
  {
    icon: Briefcase,
    title: 'Goal',
    desc: 'Building scalable SaaS platforms and high-performance user interfaces.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader title="About Me" subtitle="Who I Am" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed"
          >
            <p>
              I am a passionate <strong className="text-zinc-900 dark:text-white font-medium">Web Developer</strong> with a strong foundation in modern web technologies. My journey in computer science began with a curiosity for how things work on the internet, which quickly evolved into a dedicated pursuit of software engineering.
            </p>
            <p>
              Currently midway through my Bachelor's in Computer Science at the University of Sargodha, I bridge the gap between academic theory and practical, real-world application. I specialize in building web applications from the ground up, utilizing <strong className="text-zinc-900 dark:text-white font-medium">React</strong> for dynamic frontends and <strong className="text-zinc-900 dark:text-white font-medium">Node.js</strong> for backend logic.
            </p>
            <p>
              I believe in writing clean, maintainable code and am constantly exploring new technologies. My immediate focus is mastering advanced web patterns while progressively stepping into the world of Mobile App Development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
