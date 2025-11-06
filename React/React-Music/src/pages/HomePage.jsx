import React from "react";
import Hero from "../components/ui/Hero";
import TopListings from "../components/ui/TopListings";
const HomePage = ({ token }) => {
  return (
    <>
      <Hero />
      <TopListings token={token} />
    </>
  );
};

export default HomePage;
