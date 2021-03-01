import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import SiteItem from "./SiteItem";
import Spinner from "../layout/Spinner";

const SiteList = () => {
  const siteContext = useContext(SiteContext);
  const { sites, loading, getSites } = siteContext;

  useEffect(() => {
    getSites();
  }, []);

  return (
    <div>
      {sites !== null && !loading ? (
        sites.map((site) => <SiteItem site={site} key={site._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default SiteList;
