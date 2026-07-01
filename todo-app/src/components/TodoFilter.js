'use client';

import { motion } from 'framer-motion';

const filters = [
  { value: 'all', label: 'All', icon: '📋' },
  { value: 'active', label: 'Active', icon: '⏳' },
  { value: 'completed', label: 'Completed', icon: '✅' },
];

export default function TodoFilter({ filter, onFilterChange }) {
  return (
    <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-2 flex-wrap">
      {filters.map((f) => (
        <motion.button
          key={f.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition ${
            filter === f.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
          }`}
        >
          <span>{f.icon}</span>
          {f.label}
        </motion.button>
      ))}
    </div>
  );
}
