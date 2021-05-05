import React, { Fragment, useEffect, useState, useContext } from "react";
import { useAppContext } from "../../context/site/SiteState";
import AuthContext from "../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";
import { set } from "lodash";
const StateMgr = () => {
 const {
  userState,
  createUserState,
  updateUserState,
  deleteUserState,
  saveUserState,
  permDeleteUserState,
  content,
 } = useAppContext();
 const authContext = useContext(AuthContext);
 const siteContext = useContext(SiteContext);

 const { setCurrentUserState, currentUserState } = siteContext;

 useEffect(() => {
  if (currentUserState != null && userState === null) {
   setCurrStObj(currentUserState.userState);
   updateUserState(currentUserState.userState);
  } else if (currentUserState != null && userState != null) {
   setAlertState((prevState) => !prevState);
  }
 }, [currentUserState, userState]);
 const { user } = authContext;
 const { _id } = user;
 const [parentKey, setParentKey] = useState(null);

 const [key, setKey] = useState("");
 const [val, setVal] = useState("");
 const [parent, setParent] = useState("");

 const [currStObj, setCurrStObj] = useState({});
 const [flatStObj, setFlatStObj] = useState({});
 const [viewState, setViewState] = useState(false);
 const [saveState, setSaveState] = useState(false);
 const [alertState, setAlertState] = useState(false);

 const [savedState, setSavedState] = useState({
  ...userState,
  vals: [],
  userId: _id && _id,
 });
 const newVal = { n: "", valLength: "", key: "" };
 const { vals } = savedState;
 const onChangeSavedState = (i, e) => {
  let newVals = [...vals];

  newVals[i] = {
   ...newVals[i],
   [e.target.name]: e.target.value,
  };

  setSavedState({ ...savedState, vals: newVals });
 };

 const addSubKv = (key, val, parent, parentKey) => {
  let value;
  if (val === "string") {
   value = "";
  } else if (val === "number") {
   value = 0;
  } else if (val === "object") {
   value = {};
  } else if (val === "array") {
   value = [];
  } else if (val === "bool") {
   value = true;
  } else if (val === "null") {
   value = null;
  }

  if (Array.isArray(currStObj[`${parentKey}`][`${parent}`])) {
   key &&
    setCurrStObj((prevStyle) => ({
     ...prevStyle,
     [`${parentKey}`]: {
      ...prevStyle[`${parentKey}`],
      [`${parent}`]: [
       ...prevStyle[`${parentKey}`][`${parent}`],
       { [key]: value },
      ],
     },
    }));

   !key &&
    setCurrStObj((prevStyle) => ({
     ...prevStyle,
     [`${parentKey}`]: {
      ...prevStyle[`${parentKey}`],
      [`${parent}`]: [...prevStyle[`${parentKey}`][`${parent}`], value],
     },
    }));
  } else {
   setCurrStObj((prevStyle) => ({
    ...prevStyle,
    [`${parentKey}`]: {
     ...prevStyle[`${parentKey}`],
     [`${parent}`]: { ...prevStyle[`${parentKey}`][`${parent}`], [key]: value },
    },
   }));
  }
  setKey("");
  setVal("");
 };

 const addKv = (key, val) => {
  let value;
  if (val === "string") {
   value = "";
  } else if (val === "number") {
   value = 0;
  } else if (val === "object") {
   value = {};
  } else if (val === "array") {
   value = [];
  } else if (val === "bool") {
   value = true;
  } else if (val === "null") {
   value = null;
  }

  setCurrStObj((prevStyle) => ({
   ...prevStyle,
   [`${parentKey}`]: { ...prevStyle[`${parentKey}`], [`${key}`]: value },
  }));

  setKey("");
  setVal("");
 };

 const onChangeStateKey = (k, e) => {
  let result;

  if (Object.keys(userState).filter((ke) => ke === k).length > 0) {
   result = Object.fromEntries(
    Object.keys(userState).map((x) =>
     x === k ? [e.target.value, userState[x]] : [x, userState[x]]
    )
   );

   console.log(result);

   updateUserState(result);
   setCurrStObj(result);
   setParentKey(e.target.value);
  } else if (
   Object.keys(userState[`${parentKey}`]).filter((ke) => ke === k).length > 0
  ) {
   result = Object.fromEntries(
    Object.keys(userState[`${parentKey}`]).map((x) =>
     x === k
      ? [[e.target.value], userState[`${parentKey}`][x]]
      : [x, userState[`${parentKey}`][x]]
    )
   );

   updateUserState({ ...userState, [`${parentKey}`]: result });
   setCurrStObj({ ...currStObj, [`${parentKey}`]: result });
  } else if (Object.keys(flatStObj).filter((ke) => ke === k).length > 0) {
   const key = Object.keys(userState[`${parentKey}`]).filter((x) =>
    JSON.stringify(userState[`${parentKey}`][x]).includes(k)
   )[0];

   userState[`${parentKey}`][`${key}`][`${k}`] &&
    delete userState[`${parentKey}`][`${key}`][`${k}`];
   currStObj[`${parentKey}`][`${key}`][`${k}`] &&
    delete currStObj[`${parentKey}`][`${key}`][`${k}`];
   updateUserState({
    ...userState,
    [`${parentKey}`]: {
     ...userState[`${parentKey}`],
     [`${key}`]: {
      ...userState[`${parentKey}`][`${key}`],
      [e.target.value]: userState[`${parentKey}`][`${key}`][`${k}`],
     },
    },
   });
   setCurrStObj({
    ...currStObj,
    [`${parentKey}`]: {
     ...currStObj[`${parentKey}`],
     [`${key}`]: {
      ...currStObj[`${parentKey}`][`${key}`],
      [e.target.value]: currStObj[`${parentKey}`][`${key}`][`${k}`],
     },
    },
   });
  }
 };

 useEffect(() => {
  if (userState != null) {
   const flatState = Object.assign(
    {},
    ...(function _flatten(o) {
     return [].concat(
      ...Object.keys(o).map((k) =>
       typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
      )
     );
    })(userState)
   );

   setFlatStObj(flatState);
  }
 }, [userState]);

 return (
  <div>
   <div>
    {alertState === true ? (
     <div>
      Saved User State Being Inserted Into The Content Layer. Which state would
      you like active for forms?
      <div className='grid-3'>
       <button
        className='btn btn-sm btn-dark'
        onClick={() => {
         updateUserState(currentUserState.userState);
         setCurrStObj(currentUserState.userState);

         setAlertState((prevState) => !prevState);
         setCurrentUserState(null);
        }}>
        Saved State
       </button>
       <button
        className='btn btn-sm btn-dark'
        onClick={() => {
         setAlertState((prevState) => !prevState);
         setCurrentUserState(null);
        }}>
        Built State
       </button>
       <button
        onClick={() => {
         updateUserState({ ...userState, ...currentUserState.userState });
         setCurrStObj({ ...userState, ...currentUserState.userState });
         setAlertState((prevState) => !prevState);
         setCurrentUserState(null);
        }}
        className='btn btn-sm btn-dark'>
        Combine To One State
       </button>
      </div>
     </div>
    ) : (
     ""
    )}
   </div>
   <h5>Name Parent State</h5>
   <input type='text' onChange={(e) => setParentKey(e.target.value)} />

   {parentKey != null ? (
    <div>
     <h5>Parent Object Key</h5>
     <input type='text' value={key} onChange={(e) => setKey(e.target.value)} />
     <h5>Parent Object Value</h5>
     <select name='val' value={val} onChange={(e) => setVal(e.target.value)}>
      <option></option>
      <option value='string'>String</option>
      <option value='number'>Number</option>
      <option value='object'>Object</option>
      <option value='array'>Array</option>
      <option value='bool'>Boolean</option>
      <option value='null'>Null</option>
     </select>

     <button className='btn btn-dark btn-sm' onClick={() => addKv(key, val)}>
      Add Key Value Pair To Parent
     </button>
    </div>
   ) : (
    ""
   )}

   {Object.keys(currStObj).length > 0 ? (
    <div>
     {Object.keys(currStObj).map((k, i) => (
      <div key={i}>
       <h3>{k}</h3>

       <ul>
        {JSON.stringify(currStObj[k])
         .replaceAll('""', '"   "')
         .replaceAll("[]", "[   ]")
         .replaceAll("{}", "{  }")
         .split(",")

         .map((k, i) => (
          <li key={i}>{k}</li>
         ))}
       </ul>

       <h5>Select a Child</h5>
       <select
        name='parent'
        value={parent}
        onChange={(e) => setParent(e.target.value)}>
        <option></option>
        {currStObj != null &&
         Object.entries(currStObj[k])
          .filter((k) => typeof k[1] === "object")
          .map((k) => (
           <option key={k} value={k[0].replaceAll('"')}>
            {JSON.stringify(k[0]).replaceAll('"', "").slice(0, 1) +
             JSON.stringify(k[0])
              .replaceAll('"', "")
              .slice(1, JSON.stringify(k[0]).replaceAll('"', "").length)}
           </option>
          ))}
       </select>
       <h5>Name Child Key</h5>
       <input
        type='text'
        value={key}
        onChange={(e) => setKey(e.target.value)}
       />

       <h5>Select Child Value</h5>
       <select name='val' value={val} onChange={(e) => setVal(e.target.value)}>
        <option></option>
        <option value='string'>String</option>
        <option value='number'>Number</option>
        <option value='object'>Object</option>
        <option value='array'>Array</option>
        <option value='bool'>Boolean</option>
        <option value='null'>Null</option>
       </select>

       <button
        className='btn btn-dark btn-sm'
        onClick={() => addSubKv(key, val, parent, parentKey)}>
        Add Key Value Pair To Child
       </button>
      </div>
     ))}
    </div>
   ) : (
    ""
   )}
   <div>
    <h5>Update State: </h5>
    <button
     className='btn btn-dark'
     onClick={() => setViewState((prevState) => !prevState)}>
     View Key Editor
    </button>

    {viewState === true ? (
     <ul>
      {userState != null ? (
       [
        ...Object.keys(userState),
        ...Object.keys(userState[`${parentKey}`]),
        ...Object.keys(flatStObj),
       ].map((k, i) => (
        <li key={i}>
         <span style={{ float: "right" }}>
          <a
           className='lead bg-light'
           onClick={() => deleteUserState(parentKey, k)}>
           X
          </a>
         </span>
         <input
          type='text'
          placeholder={k}
          onChange={(e) => onChangeStateKey(k, e)}
         />
        </li>
       ))
      ) : (
       <li>No Current State</li>
      )}
     </ul>
    ) : (
     ""
    )}
   </div>
   {Object.keys(currStObj).length > 0 && userState != null ? (
    <button
     className='btn btn-sm btn-dark'
     onClick={() => createUserState(currStObj)}>
     Add To User State
    </button>
   ) : (
    ""
   )}
   {Object.keys(currStObj).length > 0 && userState === null ? (
    <button
     className='btn btn-sm btn-dark'
     onClick={() => createUserState(currStObj)}>
     Create User State
    </button>
   ) : (
    ""
   )}
   {saveState === false ? (
    <button
     className='btn btn-sm btn-dark'
     onClick={() => setSaveState((prevState) => !prevState)}>
     Save User State
    </button>
   ) : (
    <div>
     <p>
      If you would like to design content with your state, please assign an
      approximate value for every key you would like available in the content
      manager.
     </p>
     <div className='grid-2'>
      {" "}
      <button onClick={() => saveUserState(savedState)}></button>
      <button
       onClick={() =>
        setSavedState({ ...savedState, vals: [...savedState.vals, newVal] })
       }>
       Add A Premapped Value
      </button>
     </div>

     {vals.map(({ key, valLength, n }, i) => (
      <div key={i}>
       <select
        onChange={(e) => onChangeSavedState(i, e)}
        name='key'
        value={key}>
        <option value=''>Select A Key</option>
        {[
         ...Object.keys(userState),
         ...Object.keys(userState[`${parentKey}`]),
         ...Object.keys(flatStObj),
        ].map((k) => (
         <option value={k}>
          {k.slice(0, 1).toUpperCase() + k.slice(1, k.length)}
         </option>
        ))}
        )
       </select>

       <select
        name='valLength'
        value={valLength}
        onChange={(e) => onChangeSavedState(i, e)}>
        <option value=''>Select A Value Length</option>
        <option value='oneChar'>One Character</option>
        <option value='shortWord'>One Word (5 char or less)</option>
        <option value='regWord'>One Word (6 char to 10)</option>
        <option value='longWord'>One Word (10 char plus)</option>
        <option value='nNumber'>N Digit Number</option>
        <option value='nWords'>N Words (128 max)</option>
        <option value='sentence'>One Sentence</option>
        <option value='paragraph'>One Paragraph</option>
        <option value='nParagraphs'>N Paragraphs</option>
       </select>

       {valLength.charAt(0) === "n" && (
        <input
         onChange={(e) => onChangeSavedState(i, e)}
         placeholder='Enter A Value For N'
         type='text'
         name='n'
         value={n}
        />
       )}
      </div>
     ))}

     <button
      className='btn btn-sm btn-dark'
      onClick={() => saveUserState(userState)}>
      Save User State
     </button>
    </div>
   )}
  </div>
 );
};

export default StateMgr;
