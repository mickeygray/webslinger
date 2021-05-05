import React, { useEffect, useState, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";

const FormItem = ({ formName }) => {
 const siteContext = useContext(SiteContext);

 const [formMapView, setFormMapView] = useState(false);

 const { currentForm, setCurrentForm, content, forms, getForms } = siteContext;
 const authContext = useContext(AuthContext);
 const { user } = authContext;
 const { _id } = user;
 return (
  <div>
   {formMapView === false ? (
    <button
     className='btn btn-sm btn-dark
     '
     onClick={() => setFormMapView((prevState) => !prevState)}>
     {formName}
    </button>
   ) : (
    <div>
     <span style={{ float: "right" }} className='lead bg-light' />
     <a onClick={() => setFormMapView((prevState) => !prevState)}>X</a>
     {forms
      .filter((f) => f.formName === formName)
      .map(({ formName, name, type }, i) => (
       <div>
        <h5>{formName}</h5>
        <ul>
         <li>State Key: {name}</li>
         <li>El Type: {type}</li>
        </ul>
        <button
         className='btn btn-sm btn-dark'
         onClick={() => setCurrentForm(forms[i])}>
         Set As Current Form
        </button>
       </div>
      ))}
    </div>
   )}
  </div>
 );
};

export default FormItem;
