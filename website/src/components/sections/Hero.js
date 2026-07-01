'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          AI-Native Products Built<br />
          <span className="gradient-text">Just for You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          We build custom software, AI-powered dashboards, and scalable SaaS products that drive real business impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="#contact" className="btn btn-primary">
            Start Your Project
          </Link>
          <Link href="#portfolio" className="btn btn-secondary">
            See Our Work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-white rounded-lg shadow-lg p-8"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <p className="text-gray-600 mt-2">Projects Delivered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">30+</div>
              <p className="text-gray-600 mt-2">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">8+</div>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
