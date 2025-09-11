import React from "react";
import { Shield, TrendingUp, Lock, AlertTriangle } from "lucide-react";

const StatSection = () => {
  const stats = [
    {
      icon: Shield,
      title: "65,893",
      desc: "Total cyber crime cases in 2022",
    },
    {
      icon: TrendingUp,
      title: "24.4%",
      desc: "Increase from 2021",
    },
    {
      icon: Lock,
      title: "64.8%",
      desc: "Cases linked to fraud",
    },
    {
      icon: AlertTriangle,
      title: "13.5%",
      desc: "Phishing & identity theft cases",
    },
    {
      icon: Shield,
      title: "10.3%",
      desc: "Cases specifically targeting women",
    },
    {
      icon: TrendingUp,
      title: "45%",
      desc: "Cases pending investigation",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-black via-[#0a0016] to-black text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,11,209,0.15),transparent_70%)]"></div>

      {/* Title */}
      <h1 className="text-5xl font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent text-center mb-6">
        Cyber Crime in India (2022)
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mb-16">
        Statistical highlights of cyber crime incidents reported across India
        (NCRB 2022 data).
      </p>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="group relative p-8 bg-black/40 border-2 border-transparent rounded-2xl transition-all duration-300 transform hover:scale-105 hover:border-[#880bd1] cursor-pointer overflow-hidden"
            >
              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#880bd1]/30 via-transparent to-[#880bd1]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

              <div className="relative z-10 flex flex-col items-start">
                <Icon className="w-12 h-12 text-[#880bd1] mb-4 transition-colors duration-300 group-hover:text-white" />
                <h3 className="text-4xl font-bold text-[#880bd1] group-hover:text-white transition-colors duration-300">
                  {stat.title}
                </h3>
                <p className="text-gray-300 mt-2">{stat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatSection;
