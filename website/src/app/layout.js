import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Tech Yantra - Software Development Agency',
  description: 'Building AI-native products and custom software solutions for forward-thinking businesses.',
  keywords: 'software development, AI, custom software, SaaS, dashboards',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
