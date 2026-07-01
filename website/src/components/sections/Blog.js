'use client';

import { motion } from 'framer-motion';

const posts = [
  {
    title: 'Why 2026 Belongs to AI-Native Products',
    excerpt: 'How AI-first architecture is rewriting the rules of software development and what it means for your business.',
    date: 'Jan 15, 2026',
    readTime: '5 min read',
  },
  {
    title: 'The Cost Anatomy of a Custom Software Project',
    excerpt: 'A transparent breakdown of where every rupee goes in custom development, from discovery to deployment.',
    date: 'Jan 8, 2026',
    readTime: '8 min read',
  },
  {
    title: 'Designing Dashboards People Actually Use',
    excerpt: 'The mental model behind dashboards that drive decisions, not confusion. Case studies included.',
    date: 'Dec 28, 2025',
    readTime: '6 min read',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thoughts on technology, product, and building for scale.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
              <span>{post.date}</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition">{post.title}</h3>
            <p className="text-gray-600">{post.excerpt}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
