import React, { Fragment, useState, useContext } from "react";
import parse from "html-react-parser";
import YouTube from "react-youtube";
import styled from "styled-components";
import { findIndex, camelCase } from "lodash";
import SiteContext from "../../context/site/siteContext";

const SectionManager = ({ addHTMLElement }) => {
  const siteContext = useContext(SiteContext);
  const { font, pallet } = siteContext;

  const [keya, setKey] = useState("");

  console.log(keya);
  /*
  Object.values(section).map((val, i) => {
    Object.keys(section).map((key) => {
      console.log(section[key]);

      if (section[key] === val && key === "vid") {
        sectionContent.push(
          <YouTube
            videoId={val[0].url}
            opts={{
              height: val[0].height,
              width: val[0].height,
              playerVars: {
                autoplay: val[0].autoplay,
              },
            }}
          />
        );
      } else if (section[key] === val && key !== "vid") {
        sectionContent.push(
          parse(
            `<${key} ` +
              `${
                key === "img" ? `src='${val[0].name}' alt='${val[0].alt}'` : ""
              }` +
              `${key === "a" ? `href='${val[0].url}'` : ""}` +
              `${key === "button" ? `onClick=\{${val[0].action}\}` : ""}` +
              ` className='` +
              `${val[0].sectionArea}` +
              `${key}` +
              `'${key === "img" ? "/" : ""}>` +
              `${key === "img" ? "" : `${val[0].text}` + `</` + `${key}` + `>`}`
          )
        );
      }
    });
  });
*/

  return (
    <Fragment>
      <div>
        {" "}
        <select name='key' onChange={(e) => setKey(e.target.value)}>
          <option></option>
          <option value='h'>Heading</option>
          <option value='p'>Paragraph</option>
          <option value='li'>List Item</option>
          <option value='i'>Icon</option>
          <option value='a'>Link</option>
          <option value='button'>Button</option>
          <option value='img'>Image</option>
          <option value='vid'>Youtube Video</option>
        </select>
        <br />
        <button
          className='btn primary btn-block'
          onClick={() => addHTMLElement(keya)}>
          Add HTML ELEMENT TO SECTION
        </button>
      </div>
    </Fragment>
  );
};

export default SectionManager;
