import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import parse from "html-react-parser";
import YouTube from "react-youtube";
import styled from "styled-components";
import { findIndex, camelCase } from "lodash";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
import { Grid, Cell } from "styled-css-grid";
import { v4 as uuidV4 } from "uuid";

const SectionViewer = ({
  h,
  p,
  icon,
  li,
  button,
  a,
  vid,
  img,
  VariableComponent,
  loaded,
}) => {
  const siteContext = useContext(SiteContext);
  const { font, pallet, currentContent, clearCurrentContent } = siteContext;
  const imageContext = useContext(ImageContext);
  const { image, getContentImage } = imageContext;

  const onChangeSection = (e) => {
    setSection({ ...section, [e.target.name]: e.target.value });
  };

  const [section, setSection] = useState({
    columns: "",
    rows: "",
    background: "",
    layout: "",
    horizontalAlignment: "",
    verticalAlignment: "",
  });

  const [sectionContent, setSectionContent] = useState([
    ...h,
    ...p,
    ...icon,
    ...li,
    ...button,
    ...a,
    ...vid,
    ...img,
  ]);

  useEffect(() => {
    setSectionContent([
      ...h,
      ...p,
      ...icon,
      ...li,
      ...button,
      ...a,
      ...vid,
      ...img,
    ]);
  }, [h, p, icon, li, button, a, vid, img]);

  Array.prototype.clean = function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };

  const layoutString = section.layout
    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    .map((it) => it.replace(/^"|"$/g, ""))
    .clean("")
    .join('","')
    .replaceAll('"', "");

  const cell = {
    top: "",
    width: 1,
    height: 2,
    left: "",
    background: "",
    position: "",
    id: 1,
    viewState: false,
    viewToggle: "",
    code: URL.createObjectURL(new Blob([image], { type: "img/png" })),
  };

  const [cells, setCells] = useState([{ ...cell }]);

  const onChangeCell = (i, e, check) => {
    const { value, name } = e.currentTarget;

    let newResults = [...cells];
    if (value === "close") {
      newResults[i] = {
        ...newResults[i],
        ["viewState"]: false,
      };
      setCells(newResults);
    } else if (value === "open") {
      newResults[i] = {
        ...newResults[i],
        ["viewState"]: true,
      };
      setCells(newResults);
    } else if (value === "delete") {
      if (newResults.length === 1) {
        newResults.splice(0, 1);
      } else {
        newResults.splice(i, 1);
      }

      console.log(newResults);
      setCells(newResults);
    } else {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
      setCells(newResults);
    }
  };

  const addCell = () => {
    const newCell = [
      ...cells,
      { ...cell, id: cells.length > 0 ? cells[cells.length - 1].id + 1 : 0 },
    ];

    setCells(newCell);
  };

  console.log(VariableComponent);

  return (
    <>
      <span style={{ float: "right" }}>
        <button className='btn btn-sm btn-dark' onClick={() => addCell()}>
          +
        </button>
      </span>

      <div className='grid-5'>
        <select name='columns' onChange={(e) => onChangeSection(e)}>
          <option>Width</option>
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
          <option value='4'>Four</option>
          <option value='5'>Five</option>
          <option value='6'>Six</option>
          <option value='7'>Seven</option>
          <option value='8'>Eight</option>
          <option value='repeat(auto-fit,minmax(120px,1fr))'>Responsive</option>
        </select>
        <select name='rows' onChange={(e) => onChangeSection(e)}>
          <option>Height</option>
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
          <option value='4'>Four</option>
          <option value='5'>Five</option>
          <option value='6'>Six</option>
          <option value='7'>Seven</option>
          <option value='8'>Eight</option>
        </select>
        <select name='layout' onChange={(e) => onChangeSection(e)}>
          <option>Layout</option>
          <option value='row'>Row</option>
          <option value='column'>Column</option>
          <option value='row dense'>Row Dense</option>
        </select>

        <select name='verticalAlignment' onChange={(e) => onChangeSection(e)}>
          <option>Vertical Alignment</option>
          <option value='start'>Start</option>
          <option value='end'>End</option>
          <option value='center'>Center</option>
          <option value='space-around'>Space Around</option>
          <option value='space-between'>Space Between</option>
          <option value='space-evenly'>Space Evenly</option>
          <option value='stretch'>Stretch</option>
        </select>
        <select name='horizontalAlignment' onChange={(e) => onChangeSection(e)}>
          <option>Horizontal Alignment</option>
          <option value='start'>Start</option>
          <option value='end'>End</option>
          <option value='center'>Center</option>
          <option value='space-around'>Space Around</option>
          <option value='space-between'>Space Between</option>
          <option value='space-evenly'>Space Evenly</option>
        </select>
      </div>

      <Grid
        columns={4}
        rows={parseInt(section.rows)}
        flow={section.layout}
        justifyContent={section.horizontalAlignment}
        alignContent={section.verticalAlignment}>
        {cells.map(
          (
            {
              id,
              width,
              height,
              top,
              left,
              position,
              code,
              viewState,
              background,
            },
            i
          ) => {
            return (
              <Cell
                key={id}
                style={
                  cell.background.includes("#")
                    ? {
                        background: `${background}`,
                        border: "#ccc 1px dotted",
                      }
                    : {
                        background: `url(${code})`,
                        border: "#ccc 1px dotted",
                      }
                }
                height={parseInt(height)}
                width={parseInt(width)}
                top={parseInt(top)}
                left={parseInt(left)}
                center={position === "true" ? true : false}>
                {" "}
                {viewState === true ? (
                  <div className='text-center'>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <select
                        name='background'
                        onChange={(e) => {
                          onChangeCell(i, e);
                          {
                            currentContent && getContentImage(currentContent);
                          }
                          {
                            currentContent && clearCurrentContent();
                          }
                        }}>
                        <option>Background</option>
                        <option value={pallet && pallet.primary}>
                          Primary
                        </option>
                        <option value={pallet && pallet.dark}>Dark</option>
                        <option value={pallet && pallet.light}>Light</option>
                        <option value={pallet && pallet.danger}>Danger</option>
                        <option value={pallet && pallet.success}>
                          Success
                        </option>
                        {currentContent && (
                          <option value={currentContent}>Set Image</option>
                        )}
                      </select>

                      <input
                        placeholder='height'
                        type='text'
                        name='height'
                        value={cells[i].height}
                        onChange={(e) => onChangeCell(i, e)}
                      />

                      <input
                        placeholder='width'
                        type='text'
                        name='width'
                        onChange={(e) => onChangeCell(i, e)}
                      />

                      <div className='grid-2'>
                        <div>
                          {" "}
                          <input
                            type='radio'
                            name='position'
                            value='false'
                            checked={position === "false"}
                            onChange={(e) => onChangeCell(i, e)}
                          />
                          Left
                        </div>
                        <div>
                          {" "}
                          <input
                            type='radio'
                            name='position'
                            value='true'
                            checked={position === "true"}
                            id=''
                            onChange={(e) => onChangeCell(i, e)}
                          />
                          Center{" "}
                        </div>
                      </div>
                      <select
                        name='viewToggle'
                        style={{ height: "20px", width: "75px" }}
                        className='btn btn-block'
                        onChange={(e) => onChangeCell(i, e)}>
                        <option value=''></option>
                        <option value='close'>Close</option>
                      </select>
                    </form>
                  </div>
                ) : (
                  <>
                    {" "}
                    <div
                      style={{
                        wordWrap: "breakWord",
                        wordBreak: "breakAll",
                      }}
                      onClick={(e) => onChangeCell(i, e)}>
                      <span
                        style={{
                          height: "5px",
                          width: "5px",
                          float: "left",
                          padding: 0,
                          background: "#f4f4f4",
                        }}>
                        <a>
                          <select
                            name='viewToggle'
                            style={{
                              height: "5px",
                              width: "5px",
                              display: "inline",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              texIndent: "1px",
                              textOverflow: "",
                            }}
                            onChange={(e) => onChangeCell(i, e)}>
                            <option style={{ textSize: "3px" }} value=''>
                              {i}
                            </option>
                            <option style={{ textSize: "3px" }} value='open'>
                              Open
                            </option>
                            <option style={{ textSize: "3px" }} value='delete'>
                              Delete
                            </option>
                          </select>
                        </a>
                      </span>

                      {loaded === true ? VariableComponent : ""}

                      {sectionContent
                        .filter((h) => h.text != "")
                        .filter((h) => parseInt(h.sectionArea) === i)
                        .filter((h) => h.componentName === null)
                        .sort(
                          (a, b) =>
                            parseInt(a.sectionOrdinality) -
                            parseInt(b.sectionOrdinality)
                        )
                        .map(
                          ({
                            text,
                            fontStyle,
                            color,
                            background,
                            url,
                            action,
                            type,
                            width,
                            height,
                            autoplay,
                            code,
                            faIcon,
                            faIconPosition,
                            headingSize,
                          }) => (
                            <span>
                              {type === "h" && headingSize === "h1" ? (
                                <h1
                                  style={{
                                    color: `${color}`,
                                    fontFamily: `${camelCase(font)}`,
                                    background: `${background}`,
                                  }}>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </h1>
                              ) : (
                                ""
                              )}
                              {type === "h" && headingSize === "h2" ? (
                                <h2
                                  style={{
                                    color: `${color}`,
                                    fontFamily: `${camelCase(font)}`,
                                    background: `${background}`,
                                  }}>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </h2>
                              ) : (
                                ""
                              )}
                              {type === "h" && headingSize === "h3" ? (
                                <h3
                                  style={{
                                    color: `${color}`,
                                    fontFamily: `${camelCase(font)}`,
                                    background: `${background}`,
                                  }}>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              ) : (
                                ""
                              )}
                              {type === "h" && headingSize === "h4" ? (
                                <h4
                                  style={{
                                    color: `${color}`,
                                    fontFamily: `${camelCase(font)}`,
                                    background: `${background}`,
                                  }}>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </h4>
                              ) : (
                                ""
                              )}
                              {type === "h" && headingSize === "h5" ? (
                                <h5
                                  style={{
                                    color: `${color}`,
                                    fontFamily: `${camelCase(font)}`,
                                    background: `${background}`,
                                  }}>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </h5>
                              ) : (
                                ""
                              )}
                              {type === "p" ? (
                                <p
                                  style={{
                                    color: `${color}`,
                                    background: `${background}`,
                                    fontFamily: `${camelCase(font)}`,
                                  }}>
                                  {fontStyle
                                    ? parse(
                                        `<${fontStyle}>${text}</${fontStyle}>`
                                      )
                                    : text}
                                </p>
                              ) : (
                                ""
                              )}
                              {type === "li" ? (
                                <li>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>

                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              ) : (
                                ""
                              )}
                              {type === "i" ? (
                                <i
                                  style={{ color: `${color}` }}
                                  className={faIcon}
                                />
                              ) : (
                                ""
                              )}
                              {type === "a" ? (
                                <a
                                  href={url}
                                  target='_blank'
                                  rel='noopener noreferrer'>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>

                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </a>
                              ) : (
                                ""
                              )}
                              {type === "button" ? (
                                <button
                                  style={{ background: `${background}` }}
                                  onClick={action}>
                                  {faIconPosition === "top" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i> <br />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <span>
                                    {faIconPosition === "front" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {fontStyle
                                      ? parse(
                                          `<${fontStyle}>${text}</${fontStyle}>`
                                        )
                                      : text}
                                    {faIconPosition === "back" ? (
                                      <i className={faIcon}></i>
                                    ) : (
                                      ""
                                    )}
                                  </span>

                                  {faIconPosition === "bottom" ? (
                                    <span
                                      style={{
                                        display: "block",
                                        textAlign: "center",
                                        width: "100%",
                                      }}>
                                      <i className={faIcon}></i>
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </button>
                              ) : (
                                ""
                              )}
                              {type === "img" ? <img src={code} /> : ""}
                              {type === "vid" ? (
                                <YouTube
                                  videoId={url}
                                  opts={{
                                    height: height,
                                    width: width,
                                    playerVars: {
                                      autoplay: autoplay,
                                    },
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </span>
                          )
                        )}
                    </div>
                  </>
                )}
              </Cell>
            );
          }
        )}
      </Grid>
    </>
  );
};

export default SectionViewer;
