import React, { Fragment, useContext, useState, useCallback } from "react";
import FirmForm from "./FirmForm";
import FirmContext from "../../context/firm/firmContext";
const FirmCreator = () => {
  const [newFirm, setNewFirm] = useState(false);
  const firmContext = useContext(FirmContext);
  const { clearCurrentFirm, current } = firmContext;
  const setForm = useCallback(() => {
    setNewFirm((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentFirm();
                  setNewFirm((prevState) => !prevState);
                }
              : () => setNewFirm((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newFirm === false ? "Create New Firm" : "Clear New Firm"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentFirm()}
            className='btn btn-block btn-primary'>
            Clear Loaded Firm
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newFirm === true ? <FirmForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default FirmCreator;
