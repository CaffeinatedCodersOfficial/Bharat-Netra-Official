import React from "react";

const tools = [
  "WHOIS Lookup",
  "IP Address Finder",
  "DNS Checker",
  "Domain Age",
  "SSL Checker",
  "Subdomain Finder",
  "Reverse IP Lookup",
  "Email Validator",
  "HTTP Headers",
  "Traceroute",
  "Blacklist Checker",
  "GeoIP Locator",
  "Ping Tool",
  "Port Scanner",
  "Hash Generator",
];

const Terminal = () => {
  return (
    <div className="w-full h-[80vh] max-w-6xl mx-auto bg-black/80 backdrop-blur-md text-green-300 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        {/* Mac buttons */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <p className="text-xs text-gray-400 font-mono">Hack Tools Terminal</p>
        <div className="w-12"></div>
      </div>

      {/* Body */}
      <div className="p-6 font-mono text-sm space-y-6 overflow-y-auto h-[calc(80vh-40px)]">
        {/* Hacker Intro */}
        <div className="space-y-2">
          <p className="text-green-400 animate-pulse">Initializing Hack Suite...</p>
          <p className="text-blue-400">> Establishing secure connection to Cyber Grid...</p>
          <p className="text-purple-400">> Access granted ✅</p>
          <p className="text-yellow-400">⚡ Welcome, Operator. Choose your hacking tool below:</p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/70 hover:border-green-400 transition duration-200 cursor-pointer"
            >
              <p className="text-green-300">{tool}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
