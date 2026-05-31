import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import PromoBanner from "../components/PromoBanner";
import PageBottomStrip from "../components/PageBottomStrip";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <PromoBanner />
      <BestSeller />
      <PageBottomStrip />
    </div>
  );
};

export default Home;
