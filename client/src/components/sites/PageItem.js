import React, { Fragment, useContext } from "react";
import SiteContext from "../../context/site/siteContext";

const PageItem = ({ page }) => {
  const { name, _id } = page;
  const { getPage, clearCurrentPage, deletePage, currentPage } = useContext(
    SiteContext
  );
  return (
    <Fragment>
      <div className='grid-2 bg-secondary card m-2 lead'>
        <div className='p-2'>
          <button
            className='btn btn-sm btn-dark'
            onClick={
              currentPage ? () => clearCurrentPage() : () => getPage(_id)
            }>
            {currentPage ? `Clear ${name} update` : `Edit ${name}`}
          </button>
        </div>
        <div className='p-2'>
          <button
            className='btn btn-sm btn-danger'
            onClick={() => deletePage(_id)}>
            Delete {name}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default PageItem;
