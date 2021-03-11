import React, { useContext, useEffect } from "react";
import FirmContext from "../../context/firm/firmContext";
import FirmItem from "./FirmItem";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
const FirmList = () => {
  const firmContext = useContext(FirmContext);
  const { firms, loading, getFirms } = firmContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  useEffect(() => {
    if (user) getFirms(_id);
  }, [user, authContext]);

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
