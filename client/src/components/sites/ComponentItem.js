import React, { Fragment, useContext } from "react";
import SiteContext from "../../context/site/siteContext";

const ComponentItem = ({ component }) => {
 const { name, _id } = component;
 const {
  getComponent,
  clearCurrentComponent,
  deleteComponent,
  currentComponent,
 } = useContext(SiteContext);
 return (
  <Fragment>
   <div className='grid-2 bg-secondary card m-2 lead'>
    <div className='p-2'>
     <button className='btn btn-sm btn-dark' onClick={() => getComponent(_id)}>
      {currentComponent ? `Clear ${name} update` : `Edit ${name}`}
     </button>
    </div>
    <div className='p-2'>
     <button
      className='btn btn-sm btn-danger'
      onClick={() => deleteComponent(_id)}>
      Delete {name}
     </button>
    </div>
   </div>
  </Fragment>
 );
};

export default ComponentItem;
