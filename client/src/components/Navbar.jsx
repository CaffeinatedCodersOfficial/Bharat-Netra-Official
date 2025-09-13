import React, { useEffect, useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLoggedIn, userData, backendUrl, setIsLoggedIn } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight * 2.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstName =
    isLoggedIn && userData?.name
      ? userData.name.charAt(0).toUpperCase()
      : "U";

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div
      className={`w-full fixed top-0 z-50 flex justify-between items-center px-6 md:px-14 h-[80px] transition-all duration-300
      ${scrolled ? "border-b border-white/20 backdrop-blur-md bg-black/40" : ""}`}
    >
      {/* Logo */}
      <h1 className="font-bruno text-2xl md:text-xl bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent">
        BharatNetra
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-center items-center gap-8 text-white">
        <a href="#home">
          <li className="text-lg cursor-pointer hover:text-[#880bd1] transition">Home</li>
        </a>
        <a href="#about">
          <li className="text-lg cursor-pointer hover:text-[#880bd1] transition">About</li>
        </a>
        <a href="#stats">
          <li className="text-lg cursor-pointer hover:text-[#880bd1] transition">Stats</li>
        </a>
        <a href="#team">
          <li className="text-lg cursor-pointer hover:text-[#880bd1] transition">Team</li>
        </a>

        {/* User Dropdown */}
        {isLoggedIn && firstName && (
          <li
            className="relative flex flex-col"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-2 justify-center w-12 h-12 rounded-full bg-white text-black cursor-pointer hover:opacity-75">
              {firstName}
            </div>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-12 w-48 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-white flex flex-col z-50">
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-white/20 transition-all rounded-t-xl"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-3 hover:bg-white/20 transition-all text-left rounded-b-xl"
                >
                  Logout
                </button>
              </ul>
            )}
          </li>
        )}
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
        <ul className="flex flex-col items-start px-6 py-6 gap-6 text-lg text-white">
          <li className="cursor-pointer hover:text-[#880bd1] transition">Home</li>
          <li className="cursor-pointer hover:text-[#880bd1] transition">About</li>
          <li className="cursor-pointer hover:text-[#880bd1] transition">Stats</li>
          <li className="cursor-pointer hover:text-[#880bd1] transition">Team</li>

          {/* Mobile User Options */}
          {isLoggedIn && firstName && (
            <>
              <li className="cursor-pointer hover:text-[#880bd1] transition">{firstName}</li>
              <Link to="/dashboard" className="cursor-pointer hover:text-[#880bd1] transition">
                Dashboard
              </Link>
              <button onClick={logout} className="cursor-pointer hover:text-[#880bd1] transition">
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
