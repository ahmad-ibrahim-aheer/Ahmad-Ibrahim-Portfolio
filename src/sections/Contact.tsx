import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { Mail, Github, Linkedin, Instagram, Phone } from 'lucide-react';

const SOCIALS = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/ahmad-ibrahim-aheer/',
    color: 'hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/ahmad-ibrahim-78385a326/',
    color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/ahmad_ibrahim_aheer/',
    color: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10',
  },
  {
    name: 'WhatsApp',
    icon: Phone,
    href: 'https://wa.me/923086772082',
    color: 'hover:text-[#25D366] hover:bg-[#25D366]/10',
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background flourishes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl text-center pointer-events-none">
        <div className="w-full aspect-square bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <SectionHeader title="Let's Connect" subtitle="Get in touch" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto"
        >
          Whether you have a question, a project opportunity, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="flex justify-center mb-16"
        >
           <a
              href="mailto:malikahmadibrahim332@gmail.com"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-all shadow-xl focus:ring-4 focus:ring-zinc-500/20"
            >
              <Mail className="w-5 h-5" />
              Say Hello
           </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`p-4 glass-card rounded-2xl transition-all duration-300 ${social.color} text-zinc-500 dark:text-zinc-400`}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
