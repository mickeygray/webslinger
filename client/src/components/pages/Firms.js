import React, { useContext } from "react";
import FirmList from "../firms/FirmList";
import FirmCreator from "../firms/FirmCreator";

const Firms = () => {
  return (
    <div>
      <FirmCreator />
      <FirmList />
    </div>
  );
};

export default Firms;
