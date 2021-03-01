import React, { Fragment, useContext } from "react";
import VerticalContext from "../../context/vertical/verticalContext";
import Spinner from "../layout/Spinner";
import VerticalForm from "./VerticalForm";

const VerticalItem = ({ vert }) => {
  const { name, vertical, _id } = vert;
  const {
    getVertical,
    clearCurrentVertical,
    deleteVertical,
    current,
  } = useContext(VerticalContext);

  console.log(_id);

  console.log(current);
  return (
    <Fragment>
      {current && current._id === vert._id ? (
        <VerticalForm setForm={clearCurrentVertical} />
      ) : (
        <div className='grid-2 bg-secondary card m-2 lead'>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-dark'
              onClick={
                current ? () => clearCurrentVertical() : () => getVertical(_id)
              }>
              {current
                ? `Clear ${vertical} update`
                : `View Current ${vertical} fields`}
            </button>
          </div>
          <div className='p-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => deleteVertical(_id)}>
              Delete {name}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VerticalItem;
