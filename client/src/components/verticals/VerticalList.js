import React, { useContext, useEffect } from "react";
import VerticalContext from "../../context/vertical/verticalContext";
import VerticalItem from "./VerticalItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";

const VerticalList = () => {
  const verticalContext = useContext(VerticalContext);
  const { verticals, loading, getVerticals } = verticalContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    getVerticals(_id);
  }, []);

  console.log(verticals);

  return (
    <div>
      {verticals !== null && !loading ? (
        verticals.map((vert) => <VerticalItem vert={vert} key={vert._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default VerticalList;
