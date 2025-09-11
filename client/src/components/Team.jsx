import React from "react";
import { Linkedin } from "lucide-react";
import sumit from "../../public/Sumit.png"
import harsh from "../../public/Harsh.png"
import rohnish from "../../public/Rohnish.png"
import akarshit from "../../public/Akarshit.jpg"
const teamMembers = [ 
  {
    name: "Sumit Kumar",
    img: sumit,
    linkedin: "https://www.linkedin.com/in/sumit-kumar-545737378/",
  },
  {
    name: "Rohnish Srivastava",
    img: rohnish,
    linkedin: "https://www.linkedin.com/in/rohnish-srivastava/",
  },
  {
    name: "Harsh Dixit",
    img: harsh,
    linkedin: "https://www.linkedin.com/in/harsh-dixit-65820b311/",
  },
  {
    name: "Akarshit Kaushik",
    img: akarshit,
    linkedin: "https://www.linkedin.com/in/akarshit-kaushik-03a55b326/",
  },
];

const Team = () => {
  return (
    <section className="relative w-full h-auto flex flex-col items-center justify-start px-6 py-20 bg-gradient-to-b from-black via-[#0a0016] to-black text-white overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(136,11,209,0.15),transparent_70%)]"></div>

      {/* Title */}
      <h1 className="text-5xl font-bruno bg-gradient-to-r from-white via-[#880bd1] to-white bg-clip-text text-transparent text-center mb-14">
        Meet Our Team
      </h1>

      {/* Team Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl w-full">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-center p-6 bg-black/40 border-2 border-transparent rounded-2xl transition-all duration-300 transform hover:scale-105 hover:border-[#880bd1] cursor-pointer overflow-hidden"
          >
            {/* Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#880bd1]/30 via-transparent to-[#880bd1]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

            {/* Member Photo */}
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 object-cover rounded-full border-2 border-[#880bd1] mb-4 transition-transform duration-500 group-hover:scale-110"
            />

            {/* Member Info */}
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{member.role}</p>

            {/* LinkedIn Button */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#880bd1]/20 border border-[#880bd1] text-[#880bd1] font-medium text-sm transition-all duration-300 hover:bg-[#880bd1] hover:text-white"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
