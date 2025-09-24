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
    <footer className="relative w-full bg-gradient-to-b from-black via-[#0a0016] to-black text-gray-300 px-6 py-10 overflow-hidden">

      {/* Bottom Bar */}
      <div className="relative z-10 mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BharatNetra. All rights reserved. | Built with ❤️ for India’s Cyber Defense
      </div>
    </footer>
  );
};

export default Footer;
