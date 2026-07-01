import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-8">
        <div>
          <h3 className="font-bold text-xl mb-4">Tech Yantra</h3>
          <p className="text-gray-400 text-sm">Building AI-native products and custom software solutions.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#services" className="hover:text-white">Services</Link></li>
            <li><Link href="#portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link href="#blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="#" className="hover:text-white">About</Link></li>
            <li><Link href="#" className="hover:text-white">Careers</Link></li>
            <li><Link href="#" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Get in Touch</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <div className="flex gap-2 items-center">
              <Mail size={16} />
              <span>hello@techyantra.com</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2026 Tech Yantra. All rights reserved.</p>
      </div>
    </footer>
  );
}
