import { motion } from 'motion/react';

interface Props {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm mb-3"
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="h-1 w-24 bg-blue-600 rounded-full mt-6 origin-left"
      />
    </div>
  );
}
