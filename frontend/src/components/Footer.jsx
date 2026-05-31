import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 sm:py-16">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="inline-flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold tracking-tight">NEXUS</span>
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 mt-1"></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium fashion for everyday elegance. Curated styles that fit real life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/collection" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link to="/collection?category=MEN" className="hover:text-white transition-colors">Men's</Link></li>
              <li><Link to="/collection?category=WOMEN" className="hover:text-white transition-colors">Women's</Link></li>
              <li><Link to="/collection?category=KIDS" className="hover:text-white transition-colors">Kids</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Delivery Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">📱</span>
                <span>+91 7973208007</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">✉️</span>
                <a href="mailto:contact@nexus.com" className="hover:text-white transition-colors">contact@nexus.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 text-sm text-gray-400">
          <p>© 2025 NEXUS - All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
