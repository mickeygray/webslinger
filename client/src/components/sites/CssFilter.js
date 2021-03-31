import React, { useContext, useRef, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";

const Filter = ({ i, ind, level }) => {
 const siteContext = useContext(SiteContext);
 const text = useRef("");

 const { filterCss, clearFilter, filtered } = siteContext;

 useEffect(() => {
  if (filtered === null) {
   text.current.value = "";
  }
 });

 const onChange = (e) => {
  if (text.current.value !== "") {
   filterCss(e.target.value, level, i, ind);
  } else {
   clearFilter();
  }
 };

 console.log(text.current.value);
 return (
  <form>
   <input
    ref={text}
    value={text.current.value}
    type='text'
    placeholder='Filter css properties'
    onChange={onChange}
   />
  </form>
 );
};

export default Filter;
