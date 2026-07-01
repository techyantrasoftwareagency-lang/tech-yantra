'use client';

import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Eye, Wind } from 'lucide-react';

const DetailedStats = ({ data }) => {
  const stats = [
    {
      label: 'Temperature Range',
      value: `${Math.round(data.main.temp_min)}° - ${Math.round(data.main.temp_max)}°C`,
      icon: Sun,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Feels Like',
      value: `${Math.round(data.main.feels_like)}°C`,
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Dew Point',
      value: `${(data.main.temp - (100 - data.main.humidity) / 5).toFixed(1)}°C`,
      icon: CloudRain,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Wind Gust',
      value: `${(data.wind.gust || data.wind.speed).toFixed(1)} m/s`,
      icon: Wind,
      color: 'from-teal-500 to-green-500',
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white text-opacity-80">{stat.label}</h3>
              <Icon size={20} className="text-white text-opacity-70" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DetailedStats;
