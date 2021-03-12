import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

import SiteContext from "../../context/site/siteContext";

const SiteManager = ({ pages, changeDisplay }) => {
  const siteContext = useContext(SiteContext);
  const { getPage, deletePage } = siteContext;

  return (
    <Fragment>
      <div className='bg-light'>
        <div className='grid-4'>
          {pages.map((page) => (
            <div>
              {" "}
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  deletePage(page._id);
                }}>
                <a>X</a>
              </span>
              <div>
                <button
                  onClick={() => {
                    getPage(page._id);
                    changeDisplay("page");
                  }}>
                  {" "}
                  View {page.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default SiteManager;
