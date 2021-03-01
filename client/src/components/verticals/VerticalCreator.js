import React, { Fragment, useContext, useState, useCallback } from "react";
import VerticalForm from "./VerticalForm";
import VerticalContext from "../../context/vertical/verticalContext";
const VerticalCreator = () => {
  const verticalContext = useContext(VerticalContext);

  const { clearCurrentVertical, current } = verticalContext;
  const [newVert, setNewVert] = useState(false);
  const setForm = useCallback(() => {
    setNewVert((prevState) => !prevState);
  }, []);
  return (
    <Fragment>
      <div
        className={current !== null ? "grid-2 bg-light card" : "bg-light card"}>
        <button
          onClick={
            current !== null
              ? () => {
                  clearCurrentVertical();
                  setNewVert((prevState) => !prevState);
                }
              : () => setNewVert((prevState) => !prevState)
          }
          className='btn btn-block btn-primary'>
          {newVert === false ? "Create New Vertical" : "Clear New Vertical"}
        </button>
        {current !== null ? (
          <button
            onClick={() => clearCurrentVertical()}
            className='btn btn-block btn-primary'>
            Clear Loaded Vertical
          </button>
        ) : (
          ""
        )}
      </div>
      <div>{newVert === true ? <VerticalForm setForm={setForm} /> : ""}</div>
    </Fragment>
  );
};

export default VerticalCreator;
