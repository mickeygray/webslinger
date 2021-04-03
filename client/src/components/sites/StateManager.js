import { update } from "lodash";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useAppContext } from "../../context/site/SiteState";
const StateManager = () => {
 const {
  userState,
  createUserState,
  updateUserState,
  deleteUserState,
  content,
 } = useAppContext();

 const userArr = [];
 const userStr = "";
 const userNum = 0;
 const userObj = {};

 const [key, setKey] = useState("");
 const [element, setElement] = useState("");
 const [stateAdd, setStateAdd] = useState("");
 const [statePusher, setStatePusher] = useState("");
 const [newUserState, setUserState] = useState({});
 const [editState, setEditState] = useState(false);

 const addObjectKv = (stateAdd, key, element) => {
  let value;

  if (typeof userState[element] === "string") {
   value = "";
  } else if (typeof userState[element] === "number") {
   value = 0;
  }

  let newResults = {
   ...userState,
   [stateAdd]: Object.fromEntries([
    Object.entries(userState[stateAdd]).filter(
     (k, v) => k != undefined || v != undefined
    ),
    [element, value],
   ]),
  };

  delete newResults[element];

  setStateAdd("");
  setElement("");
  updateUserState(newResults);
 };

 const addArrEntry = (stateAdd, element) => {
  let newResults = {
   ...userState,
   [stateAdd]: [...userState[stateAdd], element],
  };

  delete newResults[element];
  setStateAdd("");
  setElement("");

  updateUserState(newResults);
 };

 const addArrElement = (key) =>
  setUserState(Object.assign({}, newUserState, { [key]: userArr }));

 const addStrElement = (key) =>
  setUserState(Object.assign({}, newUserState, { [key]: userStr }));

 const addNumElement = (key) =>
  setUserState(Object.assign({}, newUserState, { [key]: userNum }));

 const addObjElement = (key) =>
  setUserState(Object.assign({}, newUserState, { [key]: userObj }));

 const onChangeStateKey = (i, e) => {
  let result = Object.fromEntries(
   Object.keys(userState).map((x, index) =>
    index === i ? [e.target.value, userState[x]] : [x, userState[x]]
   )
  );

  updateUserState(result);
 };

 useEffect(() => {
  if (userState !== null) {
   setUserState(userState);
  }
 }, [userState, useAppContext]);

 console.log(content);
 return (
  <div className='card'>
   <div className='grid-2'>
    <div>
     <button onClick={() => setEditState((prevState) => !prevState)}>
      Update State
     </button>
     {editState === false ? (
      <div>
       {" "}
       <h5>Applied State: </h5>
       <ul>
        {userState != null ? (
         Object.keys(userState).map((k, i) => (
          <li key={i}>
           {stateAdd.length > 0 && stateAdd === k ? (
            <div>
             <input type='text' onChange={(e) => setKey(e.target.value)} />

             {Array.isArray(userState[stateAdd]) ? (
              <select
               name='statePusher'
               onChange={(e) => setElement(e.target.value)}>
               {Object.keys(userState)
                .filter((k) => !Array.isArray(userState[k]))
                .map((k, i) => (
                 <option key={i} value={k}>
                  {k}
                 </option>
                ))}
              </select>
             ) : (
              <select
               name='statePusher'
               onChange={(e) => setElement(e.target.value)}>
               {Object.keys(userState)
                .filter((k) => !Array.isArray(userState[k]))
                .map((k, i) => (
                 <option key={i} value={k}>
                  {k}
                 </option>
                ))}
              </select>
             )}

             <button
              onClick={() => {
               Array.isArray(userState[stateAdd])
                ? addArrEntry(stateAdd, element)
                : addObjectKv(stateAdd, key, element);
              }}>
              Add To State
             </button>
            </div>
           ) : (
            <div>
             {" "}
             {Array.isArray(userState[k]) ? (
              <button onClick={() => setStateAdd(k)}>{k}</button>
             ) : (
              ""
             )}
             {typeof userState[k] === "string" ? k : ""}{" "}
             {typeof userState[k] === "number" ? k : ""}{" "}
             {typeof userState[k] === "object" &&
             !Array.isArray(userState[k]) ? (
              <button onClick={() => setStateAdd(k)}>{k}</button>
             ) : (
              ""
             )}{" "}
            </div>
           )}
          </li>
         ))
        ) : (
         <li>No Current State</li>
        )}
       </ul>
      </div>
     ) : (
      <div>
       <h5>Update State: </h5>
       <ul>
        {userState != null ? (
         Object.keys(userState).map((k, i) => (
          <li key={i}>
           <span style={{ float: "right" }}>
            <a className='lead bg-light' onClick={() => deleteUserState(i)}>
             X
            </a>
           </span>
           <input
            type='text'
            placeholder={k}
            onChange={(e) => onChangeStateKey(i, e)}
           />
          </li>
         ))
        ) : (
         <li>No Current State</li>
        )}
       </ul>
      </div>
     )}
    </div>
    <div>
     <h5>
      Built State: <br />
      <ul>
       {" "}
       {userState !== null &&
       Object.keys(newUserState)
        .map((k) => k)
        .toString() ===
        Object.keys(userState)
         .map((k) => k)
         .toString() ? (
        <li>Current State Applied</li>
       ) : (
        Object.keys(newUserState).length > 0 &&
        Object.keys(newUserState).map((k, i) => <li key={i}>{k}</li>)
       )}
      </ul>
     </h5>
    </div>
   </div>

   <select name='statePusher' onChange={(e) => setStatePusher(e.target.value)}>
    <option value=''></option>
    <option value='array'>Add An Array</option>
    <option value='string'>Add A String</option>
    <option value='object'>Add An Object</option>
    <option value='number'>Add A Number</option>
   </select>
   {statePusher.length > 0 && (
    <div>
     <h5>Name Your State</h5>
     <input type='text' name='key' onChange={(e) => setKey(e.target.value)} />
     {statePusher === "array" && (
      <button
       className='btn btn-sm btn-dark'
       onClick={() => addArrElement(key)}>
       Add New Array To State
      </button>
     )}
     {statePusher === "string" && (
      <button
       className='btn btn-sm btn-dark'
       onClick={() => addStrElement(key)}>
       Add New String To State
      </button>
     )}
     {statePusher === "number" && (
      <button
       className='btn btn-sm btn-dark'
       onClick={() => addNumElement(key)}>
       Add New Number To State
      </button>
     )}
     {statePusher === "object" && (
      <button
       className='btn btn-sm btn-dark'
       onClick={() => addObjElement(key)}>
       Add New Object To State
      </button>
     )}
    </div>
   )}
   {Object.keys(newUserState).length > 0 && userState != null ? (
    <button
     className='btn btn-sm btn-dark'
     onClick={() => createUserState(newUserState)}>
     Add To User State
    </button>
   ) : (
    ""
   )}
   {Object.keys(newUserState).length > 0 && userState === null ? (
    <button
     className='btn btn-sm btn-dark'
     onClick={() => createUserState(newUserState)}>
     Create User State
    </button>
   ) : (
    ""
   )}
  </div>
 );
};

export default StateManager;
