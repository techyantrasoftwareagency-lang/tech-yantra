'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await onSearch(input);
      setInput('');
    }
  };

  const handleQuickCity = (city) => {
    onSearch(city);
  };

  const quickCities = ['New York', 'London', 'Tokyo', 'Dubai', 'Sydney', 'Paris'];

  return (
    <div className="mb-12">
      {/* Search Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSearch}
        className="mb-6"
      >
        <div className="flex gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-3.5 text-blue-400" size={20} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for a city..."
              className="w-full pl-12 pr-4 py-3 bg-slate-700 bg-opacity-50 backdrop-blur border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Search size={20} />
            Search
          </motion.button>
        </div>
      </motion.form>

      {/* Quick City Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        <span className="text-gray-400 text-sm mt-1">Popular cities:</span>
        {quickCities.map((city) => (
          <motion.button
            key={city}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuickCity(city)}
            className="px-3 py-1 bg-slate-700 bg-opacity-50 hover:bg-opacity-75 text-gray-300 hover:text-white text-sm rounded-full border border-slate-600 transition"
          >
            {city}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
