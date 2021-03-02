import React from "react";
import SiteList from "../sites/SiteList";
import SiteCreator from "../sites/SiteCreator";

const Home = () => {
  return (
    <div>
      <div>
        <SiteCreator />
        <SiteList />
      </div>
    </div>
  );
};

export default Home;
