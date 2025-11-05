import React from "react";

const Hero = () => {
  return (
    <section className="bg-indigo-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="my-8">
          <h1 className="border-b-3 border-white inline-block text-4xl font-extrabold text-white pb-4 sm:text-5xl md:text-6xl">
            Never Ending Rush <br />
            of Music at Your Disposal
          </h1>
          <p className="text-white text-lg font-medium mt-6">
            Search your way through our collection of music
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
