'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="contact" className="section bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something Great</h2>
        <p className="text-xl mb-8 opacity-95">
          Whether you have a crystal-clear vision or just an idea, we're here to help you build software that matters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@techyantra.com"
            className="btn bg-white text-blue-600 hover:bg-gray-100 font-semibold"
          >
            Send us an Email
          </a>
          <a
            href="tel:+919876543210"
            className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600"
          >
            Call us Now
          </a>
        </div>

        <p className="mt-8 text-sm opacity-75">
          Average response time: 2 hours during business hours
        </p>
      </motion.div>
    </section>
  );
}
