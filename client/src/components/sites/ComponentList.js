import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import ComponentItem from "./ComponentItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const ComponentList = () => {
  const siteContext = useContext(SiteContext);
  const { components, loading, getComponents } = siteContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;

  return (
    <div>
      {components !== null && !loading ? (
        components.map((component) => (
          <ComponentItem component={component} key={component._id} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ComponentList;
