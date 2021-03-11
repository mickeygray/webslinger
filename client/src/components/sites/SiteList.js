import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import SiteItem from "./SiteItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const SiteList = () => {
  const siteContext = useContext(SiteContext);
  const { sites, loading, getSites } = siteContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    if (user) {
      getSites(_id);
    }
  }, [user, authContext]);

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
