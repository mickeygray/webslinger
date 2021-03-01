import React from "react";
import SiteList from "../sites/SiteList";
import SiteCreator from "../sites/SiteCreator";
import Hero from "../layout/Hero";
const Home = () => {
  return (
    <div>
      <Hero />
      <div>
        <SiteCreator />
        <SiteList />
      </div>
    </div>
  );
};

export default Home;
