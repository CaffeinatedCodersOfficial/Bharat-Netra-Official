import React from "react";
import Hero from "../components/Hero";
import Terminal from "../components/Terminal";

const HomePage = () => {
  return (
    <div className="w-full">
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
      <div className="h-[100vh] flex items-center justify-center">
        <h1 className="text-4xl font-bold">Next Section</h1>
      </div>
    </div>
  );
};

export default HomePage;
