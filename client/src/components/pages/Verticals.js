import React, { useContext } from "react";
import VerticalList from "../verticals/VerticalList";
import VerticalCreator from "../verticals/VerticalCreator";

const Verticals = () => {
  return (
    <div>
      <VerticalCreator />
      <VerticalList />
    </div>
  );
};

export default Verticals;
