import React from "react";
import Hero from "../components/Hero";
import Terminal from "../components/Terminal";
import About from "../components/About";
import Team from "../components/Team";
import StatSection from "../components/StatSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="w-full min-h-[200vh] h-auto">
      {/* Sticky scroll section */}
      <div className="relative h-[200vh]">
        {/* Hero stays fixed at top */}
        <div id="home" className="sticky top-0 h-[100vh] z-10">
          <Hero />
        </div>

        {/* Terminal comes in as you scroll */}
        <div className="sticky top-[50vh] h-[50vh] z-50">
          <Terminal />
        </div>
      </div>

      {/* More content after */}
      <div id="about" className="h-[100vh] mt-[25vh] flex items-center justify-center">
        <About/>
      </div>
      <div id="stats" className="h-auto flex items-center justify-center">
        <StatSection/>
      </div>
      <div id="team" className="h-auto flex items-center justify-center">
        <Team/>
      </div>
      <div className="h-auto flex items-center justify-center">
        <Footer/>
      </div>
    </div>
  );
};

export default HomePage;
