'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-96"
    >
      <div className="text-center">
        <div className="mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
          />
        </div>
        <p className="text-gray-400 text-lg">Loading weather data...</p>
      </div>
    </motion.div>
  );
}
