import React, { Fragment, useContext } from "react";
import FirmContext from "../../context/firm/firmContext";
import FirmForm from "./FirmForm";

const FirmItem = ({ firm }) => {
  const { name, vertical, _id } = firm;
  const { getFirm, clearCurrentFirm, deleteFirm, current } = useContext(
    FirmContext
  );
  return (
    <Fragment>
      {current && current._id === firm._id ? (
        <FirmForm setForm={clearCurrentFirm} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          {vertical.slice(0, 1).toUpperCase() +
            vertical.slice(1, vertical.length)}{" "}
          Firm: {name}
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={current ? () => clearCurrentFirm() : () => getFirm(_id)}>
              {current ? `Clear ${name} update` : `Edit ${name}`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteFirm(_id)}>
              Delete {name}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FirmItem;
