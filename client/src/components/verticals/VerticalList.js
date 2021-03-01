import React, { useContext, useEffect } from "react";
import VerticalContext from "../../context/vertical/verticalContext";
import VerticalItem from "./VerticalItem";
import Spinner from "../layout/Spinner";

const VerticalList = () => {
  const verticalContext = useContext(VerticalContext);
  const { verticals, loading, getVerticals } = verticalContext;

  useEffect(() => {
    getVerticals();
  }, []);

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
