import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import PageItem from "./PageItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const PageList = () => {
  const siteContext = useContext(SiteContext);
  const { pages, loading, getPages } = siteContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;

  return (
    <div>
      {pages !== null && !loading ? (
        pages.map((page) => <PageItem page={page} key={page._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PageList;
