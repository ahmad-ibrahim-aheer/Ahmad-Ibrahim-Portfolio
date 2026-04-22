import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS = [
  {
    title: 'Architecting a Multi-Tenant SaaS with Node.js & React',
    excerpt: 'Deep dive into handling secure tenant isolation, dynamic routing, and shared databases in a modern Node backend.',
    date: 'Oct 15, 2026',
    readTime: '8 min read',
    category: 'Architecture'
  },
  {
    title: 'State Management in 2026: Beyond Redux',
    excerpt: 'Exploring modern approaches to React state using Zustand, Context, and Server Components for optimal performance.',
    date: 'Sep 28, 2026',
    readTime: '6 min read',
    category: 'Frontend'
  },
  {
    title: 'Database Strategies for Rapid App Prototypes',
    excerpt: 'When launching an MVP, schema agility is key. This article details our shift towards using Document DBs like MongoDB early on for flexibility.',
    date: 'Sep 05, 2026',
    readTime: '10 min read',
    category: 'Database'
  }
];

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader title="Technical Writing" subtitle="Insights & Articles" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, idx) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-none"
            >
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                  <span>{post.category}</span>
                  <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold dark:text-white text-zinc-900 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs text-zinc-500 font-medium">
                    {post.readTime}
                  </span>
                  <Link to="/blog" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 glass-card text-zinc-900 dark:text-white rounded-xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
