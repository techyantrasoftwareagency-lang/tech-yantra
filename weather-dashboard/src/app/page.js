'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastCards from '@/components/ForecastCards';
import DetailedStats from '@/components/DetailedStats';
import SearchBar from '@/components/SearchBar';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherRes = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      setWeather(weatherRes.data);
      setLocation(city);

      // Fetch 5-day forecast
      const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      setForecast(forecastRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && API_KEY) {
      fetchWeather(location);
    }
  }, [mounted]);

  if (!mounted) {
    return <Loading />;
  }

  if (!API_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-6 py-4 rounded-lg max-w-md"
        >
          <h2 className="font-bold mb-2">API Key Missing</h2>
          <p className="text-sm mb-4">
            Please add your OpenWeatherMap API key to the .env.local file.
          </p>
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-300 hover:text-red-100 underline text-sm"
          >
            Get a free API key here
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-gray-400">Real-time weather updates for any location</p>
        </motion.div>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeather} loading={loading} />

        {/* Error State */}
        {error && <Error message={error} />}

        {/* Loading State */}
        {loading && <Loading />}

        {/* Weather Content */}
        {weather && forecast && !loading && (
          <>
            {/* Current Weather */}
            <CurrentWeather data={weather} />

            {/* Detailed Stats */}
            <DetailedStats data={weather} />

            {/* 5-Day Forecast */}
            <ForecastCards data={forecast} />
          </>
        )}
      </div>
    </main>
  );
}
