import React, { Fragment, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import SiteForm from "./SiteForm";

const SiteItem = ({ site }) => {
  const { name, _id } = site;
  const { getSite, clearCurrentSite, deleteSite, current } = useContext(
    SiteContext
  );
  return (
    <Fragment>
      {current && current._id === site._id ? (
        <SiteForm setForm={clearCurrentSite} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={current ? () => clearCurrentSite() : () => getSite(_id)}>
              {current ? `Clear ${name} update` : `Edit ${name}`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteSite(_id)}>
              Delete {name}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SiteItem;
