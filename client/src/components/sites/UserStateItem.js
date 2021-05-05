import React, { useEffect, useState, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";

const UserStateItem = ({ userState }) => {
 const siteContext = useContext(SiteContext);

 const [stateMapView, setStateMapView] = useState(false);

 const { setCurrentUserState, setCurrentContent } = siteContext;
 const authContext = useContext(AuthContext);
 const { user } = authContext;
 const { _id } = user;
 return (
  <div>
   {stateMapView === true ? (
    <div>
     {userState.vals.map(({ key, val }) => (
      <button
       onClick={() =>
        setCurrentContent({
         contentId: userState._id,
         type: "userState",
         key: { key },
         content: val,
        })
       }
       className='btn btn-sm btn-dark'>
       {key}
      </button>
     ))}
    </div>
   ) : (
    <div>
     <button
      className='btn btn-dark btn-sm'
      onClick={() => {
       setStateMapView((prevState) => !prevState);
       setCurrentUserState(userState);
      }}>
      {Object.keys(userState.userState)[0]}
     </button>
    </div>
   )}
  </div>
 );
};

export default UserStateItem;
