import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';

const FULL_POSTS = [
  {
    id: 'multi-tenant-saas',
    title: 'Architecting a Multi-Tenant SaaS with Node.js & React',
    content: "Building a multi-tenant application demands careful consideration of data isolation, security, and scalability. In this article, I discuss how we implemented separate collections in MongoDB to act as tenant silos, ensuring data integrity while keeping everything cost-effective. We matched this backend with a highly modular React frontend using role-based routing.",
    date: 'Oct 15, 2026',
    readTime: '8 min read',
    category: 'Architecture'
  },
  {
    id: 'state-management',
    title: 'State Management in 2026: Beyond Redux',
    content: "The days of boilerplate-heavy Redux are evolving. Based on recent projects, I outline migrating to leaner state solutions such as Zustand for global state alongside native React Context. This shift provided a massive reduction in frontend overhead, yielding faster initial load times and much happier team developers.",
    date: 'Sep 28, 2026',
    readTime: '6 min read',
    category: 'Frontend'
  },
  {
    id: 'optimizing-sql',
    title: 'Database Strategies for Rapid App Prototypes',
    content: "When launching an MVP, schema agility is key. This article details our shift towards using Document DBs like MongoDB early on for flexibility, while planning the eventual boundaries for migrating strict transactional records to a relational engine. Learn the hybrid approach to scale both start-up speed and enterprise reliability.",
    date: 'Sep 05, 2026',
    readTime: '10 min read',
    category: 'Database'
  }
];

export function BlogPage() {
  useSEO({
    title: 'Articles & Writings | Ahmad Ibrahim',
    description: 'Read technical articles and insights by Ahmad Ibrahim on React, Node.js, SaaS Architecture, and modern web development methodologies.',
    keywords: 'Ahmad Ibrahim, Blog, Web Development Articles, React Tutorials, Node.js Architecture, Frontend, Backend, Programming'
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-zinc-900 dark:text-white mb-4">
            My <span className="text-gradient">Articles.</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A comprehensive archive of my technical writings and tutorials.
          </p>
        </motion.div>

        <div className="space-y-12">
          {FULL_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-8 md:p-10 rounded-[2rem]"
            >
               <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-zinc-900 mb-6">
                  {post.title}
                </h2>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
                   <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed">
                     {post.content}
                   </p>
                </div>
                
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-sm text-zinc-500 font-medium">
                    {post.readTime}
                  </span>
                </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
