import React from "react";
import { ShieldCheck, Cpu, Lock, Terminal } from "lucide-react";

const About = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-black via-[#0a0016] to-black text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,11,209,0.2),transparent_70%)]"></div>

      {/* Title */}
      <h1 className="text-5xl font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent text-center mb-10">
        About BharatNetra
      </h1>

      {/* Subtitle */}
      <p className="max-w-3xl text-center text-lg text-gray-300 leading-relaxed mb-16">
        <span className="text-[#880bd1] font-semibold">BharatNetra</span> is a 
        next-generation cyber intelligence platform designed to 
        empower the <span className="text-white font-semibold">Cyber Cell of India</span>.  
        Our mission is to provide powerful tools that safeguard digital 
        infrastructure, strengthen national security, and support 
        real-time cyber defense.
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {[
          { icon: ShieldCheck, title: "Cyber Defense", desc: "Advanced tools to detect, monitor, and prevent cyber threats in real-time." },
          { icon: Cpu, title: "AI-Powered Insights", desc: "Leverage artificial intelligence to analyze patterns and predict potential breaches." },
          { icon: Terminal, title: "Investigation Tools", desc: "Forensics-ready utilities to assist in tracking digital footprints and evidence gathering." },
          { icon: Lock, title: "Data Protection", desc: "Strong encryption and secure access management for sensitive information." },
        ].map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              className="group relative p-6 bg-black/40 border-2 border-transparent rounded-2xl transition-all duration-300 transform hover:scale-105 hover:border-[#880bd1] hover:opacity-100 cursor-pointer overflow-hidden"
            >
              {/* Diagonal glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#880bd1]/30 via-transparent to-[#880bd1]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

              <div className="relative z-10">
                <Icon className="w-10 h-10 text-[#880bd1] mb-4 transition-colors duration-300 group-hover:text-white" />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm">{tool.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
