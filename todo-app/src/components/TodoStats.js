'use client';

import { motion } from 'framer-motion';

export default function TodoStats({ active, completed, total }) {
  const stats = [
    { label: 'Total', value: total, color: 'from-blue-500 to-blue-600', icon: '📊' },
    { label: 'Active', value: active, color: 'from-yellow-500 to-yellow-600', icon: '⏳' },
    { label: 'Completed', value: completed, color: 'from-green-500 to-green-600', icon: '✅' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <span className="text-4xl">{stat.icon}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
