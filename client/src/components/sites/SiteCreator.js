import React, { Fragment, useContext, useState, useCallback } from "react";
import SiteForm from "./SiteForm";
import SiteContext from "../../context/site/siteContext";
const SiteCreator = () => {
  const [newSite, setNewSite] = useState(false);
  const siteContext = useContext(SiteContext);
  const { clearCurrentSite, current } = siteContext;
  const setForm = useCallback(() => {
    setNewSite((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentSite();
                  setNewSite((prevState) => !prevState);
                }
              : () => setNewSite((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newSite === false ? "Create New Site" : "Clear New Site"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentSite()}
            className='btn btn-block btn-primary'>
            Clear Loaded Site
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newSite === true ? <SiteForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default SiteCreator;
