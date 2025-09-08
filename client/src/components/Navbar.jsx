import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight * 2.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[80px] fixed top-0 z-50 flex justify-between items-center px-14 transition-all duration-300
        ${scrolled ? "border-b border-white/20 backdrop-blur-md bg-black/40" : ""}
      `}
    >
      <h1 className="font-bruno text-xl bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent">
        BharatNetra
      </h1>
      <ul className="flex justify-center items-center gap-10">
        <li className="text-lg cursor-pointer">Home</li>
        <li className="text-lg cursor-pointer">About</li>
        <li className="text-lg cursor-pointer">Tools</li>
        <li className="text-lg cursor-pointer">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
