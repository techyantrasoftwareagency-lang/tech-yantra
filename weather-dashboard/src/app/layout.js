import './globals.css';

export const metadata = {
  title: 'Weather Dashboard - Real-time Weather Updates',
  description: 'Get real-time weather data, forecasts, and detailed weather insights for any location worldwide.',
  keywords: 'weather, forecast, dashboard, temperature, real-time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {children}
      </body>
    </html>
  );
}
