import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Shield,
  FileText,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-black via-[#0a0016] to-black text-gray-300 px-6 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(136,11,209,0.15),transparent_70%)]"></div>
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Brand / About */}
        <div>
          <h2 className="text-3xl font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent mb-4">
            BharatNetra
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            A next-generation cyber intelligence platform empowering the{" "}
            <span className="text-white font-semibold">Law Enforcement Agencies </span>  
            with real-time defense, investigation, and protection tools.
          </p>
          <p className="text-sm text-gray-500">
            Our mission: safeguard India’s digital ecosystem against cyber threats and empower investigators with AI-driven intelligence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#about" className="hover:text-[#880bd1] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-[#880bd1] transition-colors">
                Our Team
              </a>
            </li>
            <li>
              <a href="#stats" className="hover:text-[#880bd1] transition-colors">
                Cyber Crime Stats
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#880bd1] transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources / Legal */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#880bd1]" />
              <a href="#privacy" className="hover:text-[#880bd1] transition">
                Privacy Policy
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#880bd1]" />
              <a href="#terms" className="hover:text-[#880bd1] transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#docs" className="hover:text-[#880bd1] transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#support" className="hover:text-[#880bd1] transition">
                Support Center
              </a>
            </li>
          </ul>
        </div>

        {/* Connect / Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to our newsletter for the latest cyber security insights.
          </p>
          <form className="flex items-center mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-md w-full bg-black/40 border border-[#880bd1]/40 focus:outline-none focus:ring-1 focus:ring-[#880bd1] text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#880bd1] text-white rounded-r-md hover:bg-[#6a0fa3] transition text-sm"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-black/40 border border-[#880bd1]/40 hover:bg-[#880bd1] hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-black/40 border border-[#880bd1]/40 hover:bg-[#880bd1] hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-black/40 border border-[#880bd1]/40 hover:bg-[#880bd1] hover:text-white transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@bharatnetra.in"
              className="p-3 rounded-full bg-black/40 border border-[#880bd1]/40 hover:bg-[#880bd1] hover:text-white transition"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            📍 New Delhi, India <br /> ✉ contact@bharatnetra.in
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BharatNetra. All rights reserved. | Built with ❤️ for India’s Cyber Defense
      </div>
    </footer>
  );
};

export default Footer;
