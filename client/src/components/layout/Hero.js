import React, { Fragment, useState } from "react";

import hero from "./images.jpeg";

const Hero = () => {
  return (
    <Fragment>
      <div className='grid-hero'>
        <div
          className='overlay'
          style={{ backgroundColor: "black", opacity: "50%" }}>
          <img
            src={hero}
            style={{ height: "100%", width: "75%" }}
            alt='Webslinger'
          />
        </div>
        <div className='homecopy'>
          <div className='mx-3 grid-2'>
            <div>
              <h2 className='text-primary'>Webslinger</h2>
              <h3 className='text-danger'>
                Seo Friendly Business Site Deployment
              </h3>
              <p>
                <b>
                  Getting Seo Traction can be hard and impossible if you're
                  using a branded web editor <br />
                  Our White Label is Your White Label
                </b>
              </p>
              <br />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
