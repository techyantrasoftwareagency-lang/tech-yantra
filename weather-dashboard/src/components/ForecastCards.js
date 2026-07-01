'use client';

import { motion } from 'framer-motion';

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
    case 'fog':
      return '🌫️';
    default:
      return '🌡️';
  }
};

const ForecastCards = ({ data }) => {
  // Process forecast data to get one entry per day (every 8 entries since forecast is 5-day, 3-hour intervals)
  const dailyForecasts = [];
  const seen = new Set();

  data.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toLocaleDateString();

    if (!seen.has(day)) {
      seen.add(day);
      dailyForecasts.push(forecast);
    }
  });

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.slice(0, 5).map((forecast, idx) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const icon = getWeatherIcon(forecast.weather[0].main);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-morphism rounded-lg p-4 text-white text-center backdrop-blur-md border border-slate-500 hover:border-blue-400 transition cursor-pointer"
            >
              <p className="font-semibold text-lg mb-3">{dayName}</p>
              <p className="text-4xl mb-3">{icon}</p>
              <p className="text-2xl font-bold mb-2">{Math.round(forecast.main.temp)}°C</p>
              <p className="text-sm text-gray-300 mb-3 capitalize">{forecast.weather[0].description}</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>💨 {forecast.wind.speed.toFixed(1)} m/s</p>
                <p>💧 {forecast.main.humidity}%</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCards;
