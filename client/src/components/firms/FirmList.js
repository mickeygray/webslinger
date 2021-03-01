import React, { useContext, useEffect } from "react";
import FirmContext from "../../context/firm/firmContext";
import FirmItem from "./FirmItem";
import Spinner from "../layout/Spinner";

const FirmList = () => {
  const firmContext = useContext(FirmContext);
  const { firms, loading, getFirms } = firmContext;

  useEffect(() => {
    getFirms();
  }, []);

  return (
    <div>
      {firms !== null && !loading ? (
        firms.map((firm) => <FirmItem firm={firm} key={firm._id} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default FirmList;
