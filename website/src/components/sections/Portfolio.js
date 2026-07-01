'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'FinPulse — Trading Dashboard',
    category: 'Dashboards',
    description: 'Real-time trading analytics with custom charts, alerts, and portfolio management.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'MediCare AI Triage',
    category: 'AI Projects',
    description: 'ML-powered patient triage system for clinics and hospitals.',
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Brewline — Cafe Ordering App',
    category: 'Mobile Apps',
    description: 'Cross-platform Flutter app for cafe orders, loyalty programs, and table booking.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    title: 'Atlas LMS',
    category: 'SaaS Products',
    description: 'Modern learning platform with live classes, assessments, and progress tracking.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Nova Couture',
    category: 'E-commerce',
    description: 'Premium fashion e-commerce with headless commerce and AI recommendations.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    title: 'Helix — DevOps Console',
    category: 'Dashboards',
    description: 'Unified DevOps dashboard aggregating CI/CD, logs, and uptime across clusters.',
    color: 'from-slate-500 to-slate-600',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A selection of projects we've built for companies like yours.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${project.color} rounded-lg p-6 text-white cursor-pointer hover:shadow-xl transition transform hover:scale-105`}
          >
            <div className="text-sm font-semibold opacity-90 mb-2">{project.category}</div>
            <h3 className="text-xl font-bold mb-3">{project.title}</h3>
            <p className="text-sm opacity-95">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
