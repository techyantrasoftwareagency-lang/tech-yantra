'use client';

import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Eye, Gauge } from 'lucide-react';

const getWeatherGradient = (main) => {
  switch (main.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return 'weather-gradient-sunny';
    case 'clouds':
      return 'weather-gradient-cloudy';
    case 'rain':
    case 'thunderstorm':
      return 'weather-gradient-rainy';
    default:
      return 'weather-gradient-night';
  }
};

const getWeatherIcon = (main) => {
  switch (main.toLowerCase()) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
    case 'drizzle':
      return '🌧️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      return '❄️';
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return '🌫️';
    default:
      return '🌡️';
  }
};

export default function CurrentWeather({ data }) {
  const gradient = getWeatherGradient(data.weather[0].main);
  const icon = getWeatherIcon(data.weather[0].main);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${gradient} rounded-2xl p-8 md:p-12 text-white mb-8 shadow-2xl fade-in`}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Main Weather Info */}
        <div>
          <h2 className="text-4xl font-bold mb-2">{data.name}</h2>
          <p className="text-white text-opacity-80 mb-6">Coordinates: {data.coord.lat.toFixed(2)}°N, {data.coord.lon.toFixed(2)}°E</p>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-8xl">{icon}</div>
            <div>
              <div className="text-6xl font-bold">{Math.round(data.main.temp)}°C</div>
              <p className="text-xl capitalize mt-2 text-white text-opacity-90">{data.weather[0].description}</p>
              <p className="text-sm text-white text-opacity-70 mt-1">
                Feels like {Math.round(data.main.feels_like)}°C
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-morphism rounded-lg p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={20} className="text-blue-200" />
              <span className="text-sm text-white text-opacity-70">Humidity</span>
            </div>
            <p className="text-3xl font-bold">{data.main.humidity}%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-morphism rounded-lg p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wind size={20} className="text-blue-200" />
              <span className="text-sm text-white text-opacity-70">Wind</span>
            </div>
            <p className="text-3xl font-bold">{data.wind.speed.toFixed(1)} m/s</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-morphism rounded-lg p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Gauge size={20} className="text-blue-200" />
              <span className="text-sm text-white text-opacity-70">Pressure</span>
            </div>
            <p className="text-3xl font-bold">{data.main.pressure} hPa</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-morphism rounded-lg p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-2">
              <Eye size={20} className="text-blue-200" />
              <span className="text-sm text-white text-opacity-70">Visibility</span>
            </div>
            <p className="text-3xl font-bold">{(data.visibility / 1000).toFixed(1)} km</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
