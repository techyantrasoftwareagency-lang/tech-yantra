'use client';

import { motion } from 'framer-motion';
import { Code, Zap, BarChart3, Smartphone } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Bespoke applications built to your exact specifications. From MVP to enterprise scale.',
  },
  {
    icon: Zap,
    title: 'AI Integration',
    description: 'Leverage cutting-edge AI & ML to automate processes and unlock new capabilities.',
  },
  {
    icon: BarChart3,
    title: 'Data Dashboards',
    description: 'Real-time analytics dashboards that turn data into actionable insights.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile solutions for iOS and Android.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          End-to-end software solutions tailored to accelerate your business.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition"
            >
              <Icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
