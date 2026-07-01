'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function Error({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-6 py-4 rounded-lg max-w-2xl mx-auto mb-8 flex items-start gap-4"
    >
      <AlertCircle className="flex-shrink-0 mt-0.5" size={24} />
      <div>
        <h3 className="font-bold mb-1">Error</h3>
        <p>{message}</p>
      </div>
    </motion.div>
  );
}
