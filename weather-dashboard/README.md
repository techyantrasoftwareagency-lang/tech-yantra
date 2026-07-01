# Weather Dashboard

A beautiful, responsive weather dashboard built with **Next.js 14**, **React 18**, **Tailwind CSS**, and powered by the **OpenWeatherMap API**.

## ✨ Features

✅ **Real-time Weather Data** - Current conditions for any city worldwide
✅ **5-Day Forecast** - Daily weather predictions with trends
✅ **Detailed Statistics** - Temperature, humidity, wind, pressure, visibility
✅ **Beautiful UI** - Gradient backgrounds, glass morphism effects
✅ **Search Functionality** - Find weather for any city
✅ **Quick City Selection** - One-click access to popular cities
✅ **Responsive Design** - Works perfectly on mobile and desktop
✅ **Loading & Error States** - Smooth feedback for all scenarios
✅ **Weather Icons** - Emoji-based weather indicators
✅ **Smooth Animations** - Framer Motion transitions

## 🚀 Quick Start

### 1. Get API Key

Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up for a **free API key**.

### 2. Setup Environment

```bash
cd weather-dashboard
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 🌍 Deploy

### Deploy to Vercel (One-Click)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your repository
4. Set **Root Directory** to `weather-dashboard`
5. Add environment variable:
   - Key: `NEXT_PUBLIC_WEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
6. Click **Deploy**

✅ Your weather dashboard is live in 2 minutes!

### Deploy to Netlify

```bash
npm install -g netlify-cli
cd weather-dashboard
npm run build
netlify deploy --prod
```

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Main page (state & API logic)
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── SearchBar.js        # Search & quick city selector
│       ├── CurrentWeather.js   # Main weather display
│       ├── DetailedStats.js    # Temperature, humidity stats
│       ├── ForecastCards.js    # 5-day forecast
│       ├── Loading.js          # Loading spinner
│       └── Error.js            # Error message display
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🔑 API Reference

The dashboard uses OpenWeatherMap API endpoints:

### Current Weather

```
GET /weather?q={city}&appid={API_KEY}&units=metric
```

### 5-Day Forecast

```
GET /forecast?q={city}&appid={API_KEY}&units=metric
```

**Response includes:**
- Temperature (min, max, current, feels_like)
- Weather conditions (clear, clouds, rain, snow, etc.)
- Wind speed and direction
- Humidity and pressure
- Visibility and UV index
- Sunrise and sunset times

## 🎨 Customization

### Change Color Scheme

Edit `src/app/globals.css`:

```css
.weather-gradient-sunny {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### Add More Quick Cities

Edit `src/components/SearchBar.js`:

```javascript
const quickCities = ['New York', 'London', 'Tokyo', 'Dubai', 'Sydney', 'Paris', 'your-city'];
```

### Change Units (Celsius/Fahrenheit)

Edit `src/app/page.js`:

```javascript
// Change 'metric' to 'imperial' for Fahrenheit
units: 'imperial',
```

### Adjust Refresh Interval

Add to `page.js`:

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    fetchWeather(location);
  }, 5 * 60 * 1000); // 5 minutes
  return () => clearInterval(interval);
}, [location]);
```

## 📊 Data Points Displayed

### Current Weather Card
- Current temperature
- Weather description
- Feels-like temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- City coordinates

### Detailed Stats
- Min/Max temperature
- Feels-like temperature
- Dew point calculation
- Wind gust speed

### 5-Day Forecast
- Daily high/low temperatures
- Weather conditions
- Wind speed
- Humidity
- 24-hour predictions

## 🌐 Browser Compatibility

✅ Chrome / Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers  

## 🔧 Troubleshooting

### API Key not working?
- Verify key is correct on [OpenWeatherMap](https://openweathermap.org/api)
- Check that .env.local is in the root of weather-dashboard folder
- Free tier has rate limits (60 calls/minute)

### City not found?
- Use the exact city name (e.g., "New York" not "NY")
- Try the quick city buttons for pre-configured cities

### No data displayed?
- Check browser console for errors
- Verify internet connection
- Ensure API key is active

## 📚 Resources

- [OpenWeatherMap Docs](https://openweathermap.org/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## 💡 Future Enhancements

- [ ] Historical weather data
- [ ] Weather alerts and warnings
- [ ] Multiple location comparison
- [ ] Weather charts and graphs
- [ ] Hourly forecast details
- [ ] Air quality index (AQI)
- [ ] UV index warnings
- [ ] Severe weather notifications

## 📄 License

MIT - Free to use and modify

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review OpenWeatherMap API documentation
3. Check browser console for error messages

---

**Built with ❤️ using Next.js & React**
