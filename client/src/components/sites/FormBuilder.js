import React, {
 useState,
 useContext,
 useEffect,
 useRef,
 Fragment,
} from "react";
import { useAppContext } from "../../context/site/SiteState";
import SiteContext from "../../context/site/siteContext";
import Slider from "react-rangeslider";
import { v4 as uuidV4 } from "uuid";

const FormBuilder = () => {
 const {
  userState,
  lead,
  writeUserState,
  writeLeadState,
  readUserState,
  leads,
 } = useAppContext();

 const siteContext = useContext(SiteContext);
 const { postForm, putForm, currentForm, deleteForm, getForm } = siteContext;

 const [formEntry, setFormEntry] = useState({
  keyName: "",
  parentObj: "",
  parentKey: "",
  parentState: "",
  checkedValue: "",
  isBool: "",
  onChange: "",
  options: [],
  type: "",
  label: "",
  legend: "",
  n: 0,
  rangeMin: 0,
  rangeMax: 0,
  step: 0,
 });

 const {
  type,
  keyName,
  checkedValue,
  isBool,
  options,
  parentObj,
  n,
  rangeMax,
  rangeMin,
  step,
  onChange,
  label,
  formName,
  legend,
 } = formEntry;

 const [form, setForm] = useState([]);
 const [formView, setFormView] = useState(false);
 const [editView, setEditView] = useState(false);
 const [flatStObj, setFlatStObj] = useState({});
 const [parent, setParent] = useState("");
 const [legends, setLegends] = useState([]);
 const [legDisplay, setLegDisplay] = useState(false);
 const option = { value: "", display: "" };

 const addForm = () => {
  const newForm = [...form, formEntry];
  setForm(newForm);
  setFormEntry({
   keyName: "",
   parentObj: "",
   parentKey: "",
   parentState: "",
   checkedValue: "",
   isBool: "",
   onChange: "",
   options: [],
   type: "",
   label: "",
   legend: "",
   n: 0,
   rangeMin: 0,
   rangeMax: 0,
   step: 0,
  });
 };

 const delForm = (i) => {
  let newForm = [...form].splice(0, i);

  setForm(newForm);
 };

 const onChangeForm = (i, e) => {
  let newForm = [...form];

  newForm[i] = {
   ...newForm[i],
   [e.target.keyName]: e.target.value,
  };

  setForm(newForm);
 };

 const lege = { leg: "" };

 const addLege = () => {
  setLegends([...legends, lege]);
 };

 const delLeg = (i) => {
  let newLegends = [...legends].splice(0, i);

  setLegends(newLegends);
 };

 const addOption = () => {
  setFormEntry({ ...formEntry, ["options"]: [...formEntry.options, option] });
 };

 const addFormOption = (i) => {
  let newForm = [...form];

  newForm[i] = {
   ...newForm[i],
   options: [...newForm[i]["options"], option],
  };

  setForm(newForm);
 };

 const onChangeFormOption = (i, e, idx) => {
  let newForm = [...form];

  newForm[i] = {
   ...newForm[i],
   options: [
    ...newForm[i]["options"],
    { ...newForm[i]["options"][idx], [e.target.keyName]: e.target.value },
   ],
  };

  setForm(newForm);
 };
 const updateOption = (i, e) => {
  let newOptions = [...options];

  newOptions[i] = {
   ...newOptions[i],
   [e.target.keyName]: e.target.value,
  };

  setFormEntry({ ...formEntry, ["options"]: newOptions });
 };

 const onChangeLegends = (i, e) => {
  let newLegends = [...legends];

  newLegends[i] = {
   ...newLegends[i],
   [e.target.keyName]: e.target.value,
  };

  setLegends(newLegends);
 };

 const onClick = () => {
  form.forEach((form) => {
   postForm(form);
  });
 };

 const onClick2 = () => {
  form.forEach((form) => {
   putForm(form);
  });
 };

 useEffect(() => {
  if (currentForm != null) {
   setForm(currentForm);
  }
 }, [currentForm, siteContext]);

 useEffect(() => {
  if (userState !== null) {
   setFlatStObj(
    Object.assign(
     {},
     ...(function _flatten(o) {
      return [].concat(
       ...Object.keys(o).map((k) =>
        typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
       )
      );
     })(userState)
    )
   );

   setParent(Object.keys(userState)[0]);
  }
 }, [userState]);

 const stringToBoolean = (string) => {
  console.log(string);
  switch (string.toLowerCase().trim()) {
   case "true":
   case "yes":
   case "1":
    return Boolean(string);
   case "false":
   case "no":
   case "0":
   case null:
    return Boolean("");
   default:
    return Boolean(string);
  }
 };
 return (
  <Fragment>
   {editView === true ? (
    <div>
     {form
      .sort(function (a, b) {
       return a.legend - b.legend;
      })
      .map(
       (
        {
         formName,
         keyName,
         parentObj,
         parentState,
         parentKey,
         checkedValue,
         isBool,
         onChange,
         options,
         type,
         label,
         legend,
         step,
         n,
         id,
         rangeMin,
         rangeMax,
         displayDate,
        },
        i
       ) => (
        <div>
         <h5>{formName}</h5>
         <span className='lead bg-light'>
          {currentForm != null ? (
           <a onClick={() => deleteForm(form._id)}>X</a>
          ) : (
           <a onClick={() => delForm(i)}>X</a>
          )}
         </span>
         <select
          onChange={(e) => onChangeForm(i, e)}
          name='parentObj'
          value={parentObj}>
          <option>Select A Parent Object</option>
          <option value='userState'>User State</option>
          <option value='lead'>Lead</option>
         </select>
         <select name='type' value={type} onChange={(e) => onChangeForm(i, e)}>
          <option>Select A Form Element Type</option>
          <option value='text'>Single Line Text</option>
          <option value='textarea'>Large Text Block</option>
          <option value='checkbox'>Check Box</option>
          <option value='radio'>Radio Button</option>
          <option value='select'>Dropdown Select</option>
          <option value='number'>Number Counter</option>
          <option value='date'>Date</option>
          <option value='range'>Range Slider</option>
          <option value='submit'>Submit</option>
         </select>
         <h5>Label Text</h5>
         <input
          onChange={(e) => onChangeForm(i, e)}
          type='text'
          name='label'
          value={label}
         />
         <h5>Legend Text</h5>
         <button onClick={() => setLegDisplay((prevState) => !prevState)}>
          View Legend Edit Mode
         </button>
         {legDisplay === true ? (
          <div>
           <button onClick={() => addLege()}>Add To Legend Group</button>
           {legends.map(({ leg }, i) => (
            <div>
             <span className='lead bg-light'>
              <a onClick={() => delLeg(i)}>X</a>
             </span>
             <input
              type='text'
              name='leg'
              value={leg}
              onChange={(e) => onChangeLegends(i, e)}
             />
            </div>
           ))}
          </div>
         ) : (
          <select
           onChange={(e) => onChangeForm(i, e)}
           name='legend'
           value={legend}>
           {legends.map(({ leg }, i) => (
            <option key={i} value={leg}>
             {leg.slice(0, 1).toUpperCase() + leg.slice(1, leg.length)}
            </option>
           ))}
          </select>
         )}
         {parentObj === "lead" ? (
          <div>
           <select
            name='keyName'
            value={keyName}
            onChange={(e) => onChangeForm(i, e)}>
            <option>Set Lead Key</option>
            <option value='fullName'>Full Name</option>
            <option value='firstName'>First Name</option>
            <option value='lastName'>Last Name</option>
            <option value='address'>Address</option>
            <option value='city'>City</option>
            <option value='state'>State</option>
            <option value='zip'>Zip</option>
            <option value='phoneNumber'>Phone Number</option>
            <option value='emailAddress'>Email Address</option>
           </select>
          </div>
         ) : (
          <div>
           <select
            name='keyName'
            value={keyName}
            onChange={(e) => onChangeForm(i, e)}>
            <option>Set UserState Key</option>
            {userState !== null &&
             Object.keys(flatStObj).map((k) => (
              <option value={k}>
               {k.slice(0, 1).toUpperCase() + k.slice(1, k.length)}
              </option>
             ))}
           </select>

           <input
            type='text'
            name='parentState'
            value={parentState}
            onChange={(e) => onChangeForm(i, e)}
           />

           <input
            type='text'
            name='parentKey'
            value={parentKey}
            onChange={(e) => onChangeForm(i, e)}
           />
          </div>
         )}
         <select
          name='onChange'
          value={onChange}
          onChange={(e) => onChangeForm(i, e)}>
          <option value=''>Set On Change Function</option>
          <option value='toggleBoolean'>Toggle Boolean</option>
          <option value='updateTextValue'>Update Text Value</option>
          <option value='setPlusN'>Set Numeric Value Plus N</option>
          <option value='setMinusN'>Set Numeric Value Minus N</option>
          <option value='setDate'>Set Date</option>
          <option value='toggleChecked'>Toggle Checked Value In Array</option>
         </select>
         Iteration Interval (N Value)
         <input
          type='text'
          name='n'
          value={n}
          onChange={(e) =>
           setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
          }
         />
         {type === "range" ? (
          <div>
           <input
            type='text'
            name='rangeMax'
            value={rangeMax}
            onChange={(e) => onChangeForm(i, e)}
           />
           <input
            type='text'
            name='rangeMin'
            value={rangeMin}
            onChange={(e) => onChangeForm(i, e)}
           />
           <input
            type='text'
            name='step'
            value={step}
            onChange={(e) => onChangeForm(i, e)}
           />
          </div>
         ) : (
          ""
         )}
         {type === "radio" || type === "checkbox" ? (
          <legend>
           <label>
            Boolean Default True
            <input
             onChange={(e) => onChangeForm(i, e)}
             type='radio'
             name='isBool'
             value='true'
            />
           </label>
           <br />
           <label>
            Boolean Default False
            <input
             onChange={(e) => onChangeForm(i, e)}
             type='radio'
             name='isBool'
             value='false'
             checked={isBool === "false"}
            />
           </label>

           <br />
           <label>
            Enter a custom checked value
            <input
             type='text'
             value={checkedValue}
             name='checkedValue'
             onChange={(e) => onChangeForm(i, e)}
            />
           </label>
          </legend>
         ) : (
          ""
         )}
         {type === "select" ? (
          <div>
           <button onClick={() => addFormOption(i)}>Add An Option</button>
           <div>
            {options.map(({ value, display }, idx) => (
             <legend>
              <label>Stored Value</label>
              <input
               name='value'
               type='text'
               value={value}
               onChange={(e) => onChangeFormOption(i, e, idx)}
              />
              <label>Displayed Value</label>
              <input
               name='display'
               type='text'
               display={display}
               onChange={(e) => onChangeFormOption(i, e, idx)}
              />
             </legend>
            ))}
           </div>
          </div>
         ) : (
          ""
         )}
        </div>
       )
      )}
    </div>
   ) : (
    ""
   )}

   {formView === true ? (
    <div>
     {form
      .sort(function (a, b) {
       return a.legend - b.legend;
      })
      .map(
       (
        {
         formName,
         keyName,
         parentObj,
         parentState,
         parentKey,
         checkedValue,
         isBool,
         onChange,
         options,
         type,
         label,
         legend,
         step,
         n,
         id,
         rangeMin,
         rangeMax,
         displayDate,
        },
        i
       ) => {
        if (type === "text") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='text'
              name={keyName}
              value={
               lead && parentObj === "lead"
                ? lead[keyName]
                : userState && userState[keyName]
              }
              onChange={(e) => {
               parentObj === "lead"
                ? writeLeadState(onChange, e)
                : writeUserState(
                   onChange,
                   e,
                   parentObj,
                   n,
                   parentState,
                   parentKey,
                   i
                  );
              }}
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='text'
             name={keyName}
             value={
              lead && parentObj === "lead"
               ? lead[keyName]
               : userState && userState[keyName]
             }
             onChange={(e) => {
              parentObj === "lead"
               ? writeLeadState(onChange, e)
               : writeUserState(
                  onChange,
                  e,
                  parentObj,
                  n,
                  parentState,
                  parentKey
                 );
             }}
            />
           </label>
          );
         }
        } else if (type === "textarea") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <textarea
              type='text'
              name={keyName}
              value={lead && lead[keyName]}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <textarea
             type='text'
             name={keyName}
             value={lead && lead[keyName]}
             onChange={(e) =>
              writeUserState(
               onChange,
               e,
               parentObj,
               n,
               parentState,
               parentKey,
               Array.from(userState[parentState][parentKey]).findIndex((x) =>
                Object.values(x).includes(e.target.value)
               )
              )
             }
            />
           </label>
          );
         }
        } else if (type === "radio") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='radio'
              name={keyName}
              value={
               isBool === "true" || isBool === "false"
                ? stringToBoolean(isBool)
                : checkedValue
              }
              onClick={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='radio'
             name={keyName}
             value={
              isBool === "true" || isBool === "false"
               ? stringToBoolean(isBool)
               : checkedValue
             }
             onClick={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "checkbox") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='checkbox'
              name={keyName}
              checked={
               isBool === true || isBool === false
                ? keyName === isBool
                : checkedValue
              }
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });

          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='checkbox'
             name={keyName}
             checked={
              isBool === true || isBool === false
               ? keyName === isBool
               : checkedValue
             }
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "select") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <select
              name={keyName}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }>
              {options.map(({ value, display }) => (
               <option value={value}>{display}</option>
              ))}
             </select>
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <select
             name={keyName}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }>
             {options.map(({ value, display }) => (
              <option value={value}>{display}</option>
             ))}
            </select>
           </label>
          );
         }
        } else if (type === "number") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='number'
              name={keyName}
              checked={keyName === checkedValue}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='number'
             name={keyName}
             checked={keyName === checkedValue}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "date") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='date'
              name={keyName}
              value={displayDate && displayDate}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='date'
             name={keyName}
             value={displayDate && displayDate}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "range") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <Slider
              axis='x'
              x={parseFloat(userState[`${keyName}`])}
              value={parseFloat(userState[`${keyName}`])}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
              orientation='horizontal'
              name={keyName}
              min={rangeMax}
              max={rangeMin}
              step={step}
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <Slider
             axis='x'
             x={parseFloat(userState[`${keyName}`])}
             value={parseFloat(userState[`${keyName}`])}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
             orientation='horizontal'
             name={keyName}
             min={rangeMax}
             max={rangeMin}
             step={step}
            />
           </label>
          );
         }
        } else if (type === "submit") {
         return (
          <input type='submit' onClick={() => readUserState(userState, lead)} />
         );
        }
       }
      )}
    </div>
   ) : (
    <div className='card'>
     <h5>Name The Form</h5>
     <input
      type='text'
      name='formName'
      value={formName}
      onChange={(e) =>
       setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
      }
     />
     {form[0] && form[0].formName.length > 0 ? (
      <button
       className='btn btn-sm btn-light'
       onClick={() =>
        setFormEntry({
         ...formEntry,
         formName: form[0].formEntry,
        })
       }>
       Add Previously Set Form Name
      </button>
     ) : (
      ""
     )}
     <select
      onChange={(e) =>
       setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
      }
      name='parentObj'
      value={parentObj}>
      <option>Select A Parent Object</option>
      <option value='userState'>User State</option>
      <option value='lead'>Lead</option>
     </select>
     <select
      name='type'
      value={type}
      onChange={(e) =>
       setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
      }>
      <option>Select A Form Element Type</option>
      <option value='text'>Single Line Text</option>
      <option value='textarea'>Large Text Block</option>
      <option value='checkbox'>Check Box</option>
      <option value='radio'>Radio Button</option>
      <option value='select'>Dropdown Select</option>
      <option value='number'>Number Counter</option>
      <option value='date'>Date</option>
      <option value='range'>Range Slider</option>
      <option value='submit'>Submit</option>
     </select>{" "}
     <h5>Label Text</h5>
     <input
      onChange={(e) =>
       setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
      }
      type='text'
      name='label'
      value={label}
     />
     <h5>Legend Text</h5>
     <button onClick={() => setLegDisplay((prevState) => !prevState)}>
      View Legend Edit Mode
     </button>
     {legDisplay === true ? (
      <div>
       <button onClick={() => addLege()}>Add To Legend Group</button>
       {legends.map(({ leg }, i) => (
        <div>
         <span className='lead bg-light'>
          <a onClick={() => delLeg(i)}>X</a>
         </span>
         <input
          type='text'
          name='leg'
          value={leg}
          onChange={(e) => onChangeLegends(i, e)}
         />
        </div>
       ))}
      </div>
     ) : (
      <select
       onChange={(e) =>
        setFormEntry({ ...formEntry, [e.target.keyName]: e.target.checked })
       }
       name='legend'
       value={legend}>
       {legends.map(({ leg }, i) => (
        <option key={i} value={leg}>
         {leg.slice(0, 1).toUpperCase() + leg.slice(1, leg.length)}
        </option>
       ))}
      </select>
     )}
     {parentObj === "lead" ? (
      <div>
       <select
        name='keyName'
        value={keyName}
        onChange={(e) =>
         setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
        }>
        <option>Set Lead Key</option>
        <option value='fullName'>Full Name</option>
        <option value='firstName'>First Name</option>
        <option value='lastName'>Last Name</option>
        <option value='address'>Address</option>
        <option value='city'>City</option>
        <option value='state'>State</option>
        <option value='zip'>Zip</option>
        <option value='phoneNumber'>Phone Number</option>
        <option value='emailAddress'>Email Address</option>
       </select>
      </div>
     ) : (
      <div>
       <select
        name='keyName'
        value={keyName}
        onChange={(e) =>
         setFormEntry({
          ...formEntry,
          [e.target.keyName]: e.target.value,
          parentState: Object.keys(userState)[0],
          parentKey: Object.keys(userState[parent]).filter((k) =>
           JSON.stringify(k).includes(formEntry.keyName)
          )[0],
         })
        }>
        <option>Set UserState Key</option>
        {userState !== null &&
         Object.keys(flatStObj).map((k) => (
          <option value={k}>
           {k.slice(0, 1).toUpperCase() + k.slice(1, k.length)}
          </option>
         ))}
       </select>
      </div>
     )}
     <select
      name='onChange'
      value={onChange}
      onChange={(e) =>
       setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
      }>
      <option value=''>Set On Change Function</option>
      <option value='toggleBoolean'>Toggle Boolean</option>
      <option value='updateTextValue'>Update Text Value</option>
      <option value='setPlusN'>Set Numeric Value Plus N</option>
      <option value='setMinusN'>Set Numeric Value Minus N</option>
      <option value='setDate'>Set Date</option>
      <option value='toggleChecked'>Toggle Checked Value In Array</option>
     </select>
     Iteration Interval (N Value)
     <input
      type='text'
      name='n'
      value={n}
      onChange={(e) =>
       setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
      }
     />
     {type === "range" ? (
      <div>
       <input
        type='text'
        name='rangeMax'
        value={rangeMax}
        onChange={(e) =>
         setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
        }
       />
       <input
        type='text'
        name='rangeMin'
        value={rangeMin}
        onChange={(e) =>
         setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
        }
       />
       <input
        type='text'
        name='step'
        value={step}
        onChange={(e) =>
         setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
        }
       />
      </div>
     ) : (
      ""
     )}
     {type === "radio" || type === "checkbox" ? (
      <legend>
       <label>
        Boolean Default True
        <input
         onChange={(e) =>
          setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
         }
         type='radio'
         name='isBool'
         value='true'
        />
       </label>
       <br />
       <label>
        Boolean Default False
        <input
         onChange={(e) =>
          setFormEntry({ ...formEntry, [e.target.keyName]: e.target.value })
         }
         type='radio'
         name='isBool'
         value='false'
         checked={isBool === "false"}
        />
       </label>

       <br />
       <label>
        Enter a custom checked value
        <input
         type='text'
         value={checkedValue}
         name='checkedValue'
         onChange={(e) =>
          setFormEntry({
           ...formEntry,
           [e.target.keyName]: e.target.value,
           isBool: "",
          })
         }
        />
       </label>
      </legend>
     ) : (
      ""
     )}
     {type === "select" ? (
      <div>
       <button onClick={() => addOption()}>Add An Option</button>
       <div>
        {options.map(({ value, display }, i) => (
         <legend>
          <label>Stored Value</label>
          <input
           name='value'
           type='text'
           value={value}
           onChange={(e) => updateOption(i, e)}
          />
          <label>Displayed Value</label>
          <input
           name='display'
           type='text'
           display={display}
           onChange={(e) => updateOption(i, e)}
          />
         </legend>
        ))}
       </div>
      </div>
     ) : (
      ""
     )}
    </div>
   )}

   <div className='grid-4'>
    <div>
     <button onClick={() => addForm()} className='btn btn-block btn-primary'>
      + Entry
     </button>
    </div>

    <div>
     <button
      onClick={() => setFormView((prevState) => !prevState)}
      className='btn btn-block btn-primary'>
      View Form
     </button>
    </div>

    <div>
     <button
      onClick={() => setEditView((prevState) => !prevState)}
      className='btn btn-block btn-primary'>
      Edit Form
     </button>
    </div>

    <div>
     {currentForm != null ? (
      <button className='btn btn-block btn-primary' onClick={onClick2}>
       Save Form
      </button>
     ) : (
      <button className='btn btn-block btn-primary' onClick={onClick}>
       Save Form
      </button>
     )}
    </div>
   </div>
  </Fragment>
 );
};

export default FormBuilder;
