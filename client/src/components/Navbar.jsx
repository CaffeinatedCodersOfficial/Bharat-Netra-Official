import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight * 2.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[80px] fixed top-0 z-50 flex justify-between items-center px-6 md:px-14 transition-all duration-300
        ${scrolled ? "border-b border-white/20 backdrop-blur-md bg-black/40" : ""}
      `}
    >
      {/* Logo */}
      <h1 className="font-bruno text-2xl md:text-xl bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent">
        BharatNetra
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-center items-center gap-10">
        <a href="#home"><li className="text-lg cursor-pointer hover:text-[#880bd1] transition">Home</li></a>
        <a href="#about"><li className="text-lg cursor-pointer hover:text-[#880bd1] transition">About</li></a>
        <a href="#stats"><li className="text-lg cursor-pointer hover:text-[#880bd1] transition">Stats</li></a>
        <a href="#team"><li className="text-lg cursor-pointer hover:text-[#880bd1] transition">Team</li></a>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white focus:outline-none"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[50%] bg-black/95 backdrop-blur-md border-l border-[#880bd1]/30 transform transition-transform duration-300 ease-in-out z-40
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 h-[80px] border-b border-gray-800">
          <h2 className="font-bruno text-xl bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent">
            BharatNetra
          </h2>
          <button onClick={() => setOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col items-start px-6 py-6 gap-6 text-lg">
          <li className="cursor-pointer hover:text-[#880bd1] transition">Home</li>
          <li className="cursor-pointer hover:text-[#880bd1] transition">About</li>
          <li className="cursor-pointer hover:text-[#880bd1] transition">Tools</li>
          <li className="cursor-pointer hover:text-[#880bd1] transition">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
