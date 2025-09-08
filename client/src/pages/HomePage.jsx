import React from "react";
import Hero from "../components/Hero";
import Terminal from "../components/Terminal";
import About from "../components/About";

const HomePage = () => {
  return (
    <div className="w-full min-h-[200vh] h-auto">
      {/* Sticky scroll section */}
      <div className="relative h-[200vh]">
        {/* Hero stays fixed at top */}
        <div className="sticky top-0 h-[100vh] z-10">
          <Hero />
        </div>

        {/* Terminal comes in as you scroll */}
        <div className="sticky top-[50vh] h-[50vh] z-50">
          <Terminal />
        </div>
      </div>

      {/* More content after */}
      <div className="h-[100vh] mt-[25vh] flex items-center justify-center">
        <About/>
      </div>
    </div>
  );
};

export default HomePage;
