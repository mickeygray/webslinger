import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { findIndex, camelCase } from "lodash";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
const SectionManager = ({
  h,
  p,
  icon,
  li,
  button,
  a,
  vid,
  img,
  onChangeA,
  onChangeButton,
  onChangeH,
  onChangeIcon,
  onChangeImg,
  onChangeImg2,
  onChangeVid,
  onChangeP,
  onChangeLi,
}) => {
  const imageBlob = useRef("");
  const siteContext = useContext(SiteContext);
  const { font, pallet, currentContent, clearCurrentContent } = siteContext;
  const imageContext = useContext(ImageContext);
  const { getContentImage } = imageContext;

  console.log(h);
  return (
    <Fragment>
      <div className='bg-light grid-4'>
        {h.map((row, i) => {
          const index = h.findIndex((x) => x === row);
          const componentName = row.componentName;
          const compStyle = row.compStyle;
          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  let delCheck = 1;
                  if (h.length === 1) {
                    h.splice(0, 1);
                  } else {
                    h.splice(index, 1);
                  }
                  onChangeH(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>
                {row.sectionArea} {row.componentName && row.componentName}{" "}
                Heading
              </h3>
              {Object.keys(row).map((key, i) => (
                <div>
                  {key === "fontStyle" ? (
                    <select
                      name='fontStyle'
                      onChange={(e) =>
                        onChangeH(index, e, componentName, compStyle)
                      }>
                      <option>Font Styling...</option>
                      <option value='b'>Bold</option>
                      <option value='i'>Italic</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "color" && pallet ? (
                    <div>
                      <select
                        name='color'
                        onChange={(e) =>
                          onChangeH(index, e, componentName, compStyle)
                        }>
                        <option>Font Color...</option>
                        <option value={pallet.primary}>Primary</option>
                        <option value={pallet.dark}>Dark</option>
                        <option value={pallet.light}>Light</option>
                        <option value={pallet.danger}>Danger</option>
                        <option value={pallet.primary}>Success</option>
                      </select>
                      <h5>Current Text Color</h5>
                      <input
                        type='text'
                        value={row[key]}
                        name='color'
                        disabled
                      />
                      <button
                        className='btn btn-dark btn-sm'
                        onClick={(e) =>
                          onChangeH(index, e, componentName, compStyle)
                        }>
                        Set Text Color
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  {key === "font" ? (
                    <div>
                      <h5>Current Font</h5>
                      <input type='text' value={row[key]} disabled />
                      <button
                        className='btn btn-dark btn-sm'
                        onClick={(e) => onChangeH(index, e)}>
                        Set Font
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) =>
                          onChangeH(index, e, componentName, compStyle)
                        }
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {key === "background" && pallet ? (
                    <div>
                      <select
                        name='background'
                        onChange={(e) =>
                          onChangeH(index, e, componentName, compStyle)
                        }>
                        <option>Background Color...</option>
                        <option value={pallet.primary}>Primary</option>
                        <option value={pallet.dark}>Dark</option>
                        <option value={pallet.light}>Light</option>
                        <option value={pallet.danger}>Danger</option>
                        <option value={pallet.primary}>Success</option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}

                  {key === "headingSize" ? (
                    <select
                      name='headingSize'
                      onChange={(e) =>
                        onChangeH(index, e, componentName, compStyle)
                      }
                      value={row[key]}>
                      <option>Heading Size...</option>
                      <option value='h1'>X-Large</option>
                      <option value='h2'>Large</option>
                      <option value='h3'>Standard</option>
                      <option value='h4'>Small</option>
                      <option value='h5'>x-small</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "faIconPosition" ? (
                    <select
                      name='faIconPosition'
                      onChange={(e) =>
                        onChangeH(index, e, componentName, compStyle)
                      }>
                      <option>Icon Position...</option>
                      <option value='top'>Top</option>
                      <option value='front'>Front</option>
                      <option value='back'>Back</option>
                      <option value='bottom'>Bottom</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionArea" ? (
                    <input
                      placeholder='Cell Number'
                      type='text'
                      name='sectionArea'
                      value={row[key]}
                      onChange={(e) =>
                        onChangeH(index, e, componentName, compStyle)
                      }
                    />
                  ) : (
                    ""
                  )}
                  {key === "text" ? (
                    <div>
                      <input
                        type='text'
                        value={row[key]}
                        placeholder='Text..'
                        name={key}
                        onChange={(e) =>
                          onChangeH(index, e, componentName, compStyle)
                        }
                      />
                      <span style={{ float: "right" }}>
                        <button
                          value={row[key]}
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeH(index, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "url" ? (
                    <input
                      type='text'
                      placeholder='Url...'
                      value={row[key]}
                      name={key}
                      onChange={(e) =>
                        onChangeH(i, e, componentName, compStyle)
                      }
                    />
                  ) : (
                    ""
                  )}
                  {key === "faIcon" ? (
                    <div className='all-center'>
                      <a
                        className='lead'
                        style={{ color: "#f4f4f4" }}
                        href='https://fontawesome.com/cheatsheet/'>
                        Icons
                      </a>
                      <input
                        type='text'
                        placeholder='Type your Font Awesome Icon Here'
                        value={row[key]}
                        name={key}
                        onChange={(e) =>
                          onChangeH(i, e, componentName, compStyle)
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {p.map((row, i) => {
          let delCheck = 1;
          const index = p.findIndex((x) => x === row);
          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (p.length === 1) {
                    p.splice(0, 1);
                  } else {
                    p.splice(index, 1);
                  }
                  onChangeP(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>{row.sectionArea} Paragraph</h3>
              {Object.keys(row).map((key) => (
                <div>
                  {key === "fontStyle" ? (
                    <select
                      value={row[key]}
                      name='fontStyle'
                      onChange={(e) => onChangeP(i, e)}>
                      <option>Font Styling...</option>
                      <option value='b'>Bold</option>
                      <option value='i'>Italic</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeP(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {key === "color" && pallet ? (
                    <select
                      value={row[key]}
                      name='color'
                      onChange={(e) => onChangeP(i, e)}>
                      <option>Font Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "background" && pallet ? (
                    <select
                      value={row[key]}
                      name='background'
                      onChange={(e) => onChangeP(i, e)}>
                      <option>Background Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionArea" ? (
                    <input
                      value={row[key]}
                      placeholder='Cell Number'
                      type='text'
                      name='sectionArea'
                      onChange={(e) => onChangeP(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "text" ? (
                    <div>
                      <input
                        type='text'
                        value={row[key]}
                        placeholder='Text..'
                        name={key}
                        onChange={(e) => onChangeP(i, e)}
                      />
                      <span style={{ float: "right" }}>
                        <button
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeP(i, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "url" ? (
                    <input
                      type='text'
                      placeholder='Url...'
                      value={row[key]}
                      name={key}
                      onChange={(e) => onChangeP(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "faIcon" ? (
                    <div className='all-center'>
                      <a
                        className='lead'
                        style={{ color: "#f4f4f4" }}
                        href='https://fontawesome.com/cheatsheet/'>
                        Icons
                      </a>
                      <input
                        type='text'
                        placeholder='Type your Font Awesome Icon Here'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeP(i, e)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {icon.map((row, i) => {
          let delCheck = 1;
          const index = icon.findIndex((x) => x === row);

          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (icon.length === 1) {
                    icon.splice(0, 1);
                  } else {
                    icon.splice(index, 1);
                  }
                  onChangeIcon(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>{row.sectionArea} Icon</h3>
              {Object.keys(row).map((key) => (
                <div>
                  {key === "fontStyle" ? (
                    <select
                      name='fontStyle'
                      value={row[key]}
                      onChange={(e) => onChangeIcon(i, e)}>
                      <option>Font Styling...</option>
                      <option value='b'>Bold</option>
                      <option value='i'>Italic</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "faIconPosition" ? (
                    <select
                      value={row[key]}
                      name='faIconPosition'
                      onChange={(e) => onChangeIcon(i, e)}>
                      <option>Icon Position...</option>
                      <option value='top'>Top</option>
                      <option value='front'>Front</option>
                      <option value='back'>Back</option>
                      <option value='bottom'>Bottom</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeIcon(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "color" && pallet ? (
                    <select
                      value={row[key]}
                      name='color'
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Icon Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "background" && pallet ? (
                    <select
                      value={row[key]}
                      name='background'
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Background Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionArea" ? (
                    <input
                      value={row[key]}
                      placeholder='Cell Number'
                      type='text'
                      name='sectionArea'
                      onChange={(e) => onChangeIcon(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "faIcon" ? (
                    <div className='all-center'>
                      <a
                        className='lead'
                        style={{ color: "#f4f4f4" }}
                        href='https://fontawesome.com/cheatsheet/'>
                        Icons
                      </a>
                      <input
                        type='text'
                        placeholder='Type your Font Awesome Icon Here'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeIcon(i, e)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {button.map((row, i) => {
          let delCheck = 1;
          const index = button.findIndex((x) => x === row);

          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (button.length === 1) {
                    button.splice(0, 1);
                  } else {
                    button.splice(index, 1);
                  }
                  onChangeButton(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>{row.sectionArea} Button</h3>
              {Object.keys(row).map((key) => (
                <div>
                  {key === "fontStyle" ? (
                    <select
                      value={row[key]}
                      name='fontStyle'
                      onChange={(e) => onChangeButton(i, e)}>
                      <option>Font Styling...</option>
                      <option value='b'>Bold</option>
                      <option value='i'>Italic</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "faIconPosition" ? (
                    <select
                      value={row[key]}
                      name='faIconPosition'
                      onChange={(e) => onChangeButton(i, e)}>
                      <option>Icon Position...</option>
                      <option value='top'>Top</option>
                      <option value='front'>Front</option>
                      <option value='back'>Back</option>
                      <option value='bottom'>Bottom</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "color" && pallet ? (
                    <select
                      value={row[key]}
                      name='color'
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Font Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        value={row[key]}
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeH(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "background" && pallet ? (
                    <select
                      name='background'
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Background Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionArea" ? (
                    <input
                      placeholder='Cell Number'
                      type='text'
                      name='sectionArea'
                      onChange={(e) => onChangeButton(i, e)}
                    />
                  ) : (
                    ""
                  )}

                  {key === "action" ? (
                    <select
                      name='action'
                      onChange={(e) => onChangeButton(i, e)}>
                      <option>Button Action...</option>
                      <option value='toggleModal'>Toggle Modal</option>
                      <option value='postForm'>Post Form</option>
                      <option value='nextElement'>Next Element</option>
                      <option value='prevElement'>Previous Element</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "text" ? (
                    <div>
                      <input
                        type='text'
                        value={row[key]}
                        placeholder='Text..'
                        name={key}
                        onChange={(e) => onChangeButton(i, e)}
                      />
                      <span style={{ float: "right" }}>
                        <button
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeButton(i, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "url" ? (
                    <input
                      type='text'
                      placeholder='Url...'
                      value={row[key]}
                      name={key}
                      onChange={(e) => onChangeButton(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "faIcon" ? (
                    <div className='all-center'>
                      <a
                        className='lead'
                        style={{ color: "#f4f4f4" }}
                        href='https://fontawesome.com/cheatsheet/'>
                        Icons
                      </a>
                      <input
                        type='text'
                        placeholder='Type your Font Awesome Icon Here'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeButton(i, e)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {a.map((row, i) => {
          let delCheck = 1;
          const index = findIndex((x) => x === row);
          const onClick = (i, e) => {
            onChangeA(i, e, currentContent);
          };
          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (a.length === 1) {
                    a.splice(0, 1);
                  } else {
                    a.splice(index, 1);
                  }
                  onChangeA(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>{row.sectionArea} Link</h3>
              {Object.keys(row).map((key) => (
                <div>
                  {key === "fontStyle" ? (
                    <select
                      name='fontStyle'
                      value={row[key]}
                      onChange={(e) => onChangeA(i, e)}>
                      <option>Font Styling...</option>
                      <option value='b'>Bold</option>
                      <option value='i'>Italic</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "color" && pallet ? (
                    <select
                      value={row[key]}
                      name='color'
                      onChange={(e) => onChangeA(i, e, font, pallet)}>
                      <option>Font Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeH(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeH(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "background" && pallet ? (
                    <select
                      name='background'
                      value={row[key]}
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Background Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "headingSize" ? (
                    <select
                      name='headingSize'
                      value={row[key]}
                      onChange={(e) => onChangeA(i, e)}>
                      <option>Heading Size...</option>
                      <option value='h1'>X-Large</option>
                      <option value='h2'>Large</option>
                      <option value='h3'>Standard</option>
                      <option value='h4'>Small</option>
                      <option value='h5'>x-small</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "faIconPosition" ? (
                    <select
                      name='faIconPosition'
                      value={row[key]}
                      onChange={(e) => onChangeA(i, e)}>
                      <option>Icon Position...</option>
                      <option value='top'>Top</option>
                      <option value='front'>Front</option>
                      <option value='back'>Back</option>
                      <option value='bottom'>Bottom</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionArea" ? (
                    <input
                      value={row[key]}
                      placeholder='Cell Number'
                      type='text'
                      name='sectionArea'
                      onChange={(e) => onChangeA(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "text" ? (
                    <div>
                      <input
                        type='text'
                        value={row[key]}
                        placeholder='Text..'
                        name={key}
                        onChange={(e) => onChangeA(i, e)}
                      />
                      <span style={{ float: "right" }}>
                        <button
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeA(i, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "url" ? (
                    <div>
                      <input
                        type='text'
                        placeholder='Url...'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeA(i, e)}
                      />
                      <span style={{ float: "right" }}>
                        <button
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeA(i, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "faIcon" ? (
                    <div className='all-center'>
                      <a
                        className='lead'
                        style={{ color: "#f4f4f4" }}
                        href='https://fontawesome.com/cheatsheet/'>
                        Icons
                      </a>
                      <input
                        type='text'
                        placeholder='Type your Font Awesome Icon Here'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeA(i, e)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {li.map((row, i) => {
          let delCheck = 1;
          const index = li.findIndex((x) => x === row);

          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (li.length === 1) {
                    li.splice(0, 1);
                  } else {
                    li.splice(index, 1);
                  }
                  onChangeLi(index, e, delCheck);
                }}>
                <a>X</a>
                <h3>{row.sectionArea} List Item</h3>
              </span>
              {Object.keys(row).map((key) => (
                <div>
                  {key === "fontStyle" ? (
                    <select name='fontStyle' onChange={(e) => onChangeLi(i, e)}>
                      <option>Font Styling...</option>
                      <option value='b'>Bold</option>
                      <option value='i'>Italic</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeLi(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "color" && pallet ? (
                    <select
                      name='color'
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Font Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}

                  {key === "background" && pallet ? (
                    <select
                      name='background'
                      onChange={(e) => onChangeH(i, e, font, pallet)}>
                      <option>Background Color...</option>
                      <option value={pallet.primary}>Primary</option>
                      <option value={pallet.dark}>Dark</option>
                      <option value={pallet.light}>Light</option>
                      <option value={pallet.danger}>Danger</option>
                      <option value={pallet.primary}>Success</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "headingSize" ? (
                    <select
                      name='headingSize'
                      onChange={(e) => onChangeLi(i, e)}>
                      <option>Heading Size...</option>
                      <option value='h1'>X-Large</option>
                      <option value='h2'>Large</option>
                      <option value='h3'>Standard</option>
                      <option value='h4'>Small</option>
                      <option value='h5'>x-small</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "faIconPosition" ? (
                    <select
                      name='faIconPosition'
                      onChange={(e) => onChangeLi(i, e)}>
                      <option>Icon Position...</option>
                      <option value='top'>Top</option>
                      <option value='front'>Front</option>
                      <option value='back'>Back</option>
                      <option value='bottom'>Bottom</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "sectionArea" ? (
                    <select
                      name='sectionArea'
                      onChange={(e) => onChangeLi(i, e)}>
                      <option>Section Position...</option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                      <option value='D'>D</option>
                    </select>
                  ) : (
                    ""
                  )}
                  {key === "text" ? (
                    <div>
                      <input
                        type='text'
                        value={row[key]}
                        placeholder='Text..'
                        name={key}
                        onChange={(e) => onChangeLi(i, e)}
                      />
                      <span style={{ float: "right" }}>
                        <button
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeLi(i, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "url" ? (
                    <div>
                      <input
                        type='text'
                        placeholder='Url...'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeLi(i, e)}
                      />
                      <span style={{ float: "right" }}>
                        <button
                          className='btn btn-sm'
                          onClick={(e) => {
                            const c = currentContent;
                            onChangeLi(i, e, c, key);
                            clearCurrentContent();
                          }}>
                          Add Content
                        </button>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "listName" ? (
                    <input
                      type='text'
                      placeholder='Listname...'
                      value={row[key]}
                      name={key}
                      onChange={(e) => onChangeLi(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "faIcon" ? (
                    <div className='all-center'>
                      <a
                        className='lead'
                        style={{ color: "#f4f4f4" }}
                        href='https://fontawesome.com/cheatsheet/'>
                        Icons
                      </a>
                      <input
                        type='text'
                        placeholder='Type your Font Awesome Icon Here'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeLi(i, e)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {img.map((row, i) => {
          let delCheck = 1;
          const index = img.findIndex((x) => x === row);

          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (img.length === 1) {
                    img.splice(0, 1);
                  } else {
                    img.splice(index, 1);
                  }
                  onChangeImg2(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>{row.sectionArea} Image</h3>
              {Object.keys(row).map((key) => (
                <div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    {key === "sectionArea" && row["name"].length > 0 ? (
                      <input
                        placeholder='Cell Number'
                        type='text'
                        name='sectionArea'
                        value={row[key]}
                        onChange={(e) => onChangeImg2(i, e)}
                      />
                    ) : (
                      ""
                    )}
                    {key === "sectionOrdinality" ? (
                      <div>
                        <h5>Order the elements 1 is the first to appear</h5>
                        <input
                          type='number'
                          name='sectionOrdinality'
                          onChange={(e) => onChangeImg2(index, e, font, pallet)}
                          value={row[key]}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {key === "background" &&
                    pallet &&
                    row["name"].length > 0 != "" ? (
                      <select
                        name='background'
                        value={row[key]}
                        onChange={(e) => onChangeImg2(i, e)}>
                        <option>Background Color...</option>
                        <option value={pallet.primary}>Primary</option>
                        <option value={pallet.dark}>Dark</option>
                        <option value={pallet.light}>Light</option>
                        <option value={pallet.danger}>Danger</option>
                        <option value={pallet.primary}>Success</option>
                      </select>
                    ) : (
                      ""
                    )}

                    {key === "name" ? (
                      <div className='grid-2'>
                        <input
                          type='text'
                          placeholder='name...'
                          value={row[key]}
                          name={key}
                        />

                        <span style={{ float: "right" }}>
                          <button
                            type='button'
                            className='btn btn-sm'
                            onClick={(e) => {
                              getContentImage(currentContent);
                              onChangeImg(i, e, currentContent);
                              clearCurrentContent();
                            }}>
                            Add Content
                          </button>
                        </span>
                      </div>
                    ) : (
                      ""
                    )}

                    {key === "width" && row["name"].length > 0 != "" ? (
                      <input
                        type='text'
                        placeholder='Width'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeImg2(i, e)}
                      />
                    ) : (
                      ""
                    )}
                    {key === "height" && row["name"].length > 0 != "" ? (
                      <input
                        type='text'
                        placeholder='Height'
                        value={row[key]}
                        name={key}
                        onChange={(e) => onChangeImg2(i, e)}
                      />
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              ))}
            </div>
          );
        })}

        {vid.map((row, i) => {
          let delCheck = 1;
          const index = vid.findIndex((x) => x === row);
          const onClick = (i, e) => {
            onChangeVid(i, e, currentContent);
          };
          return (
            <div
              style={{ width: "200px" }}
              key={i}
              className='row card bg-dark'>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  if (vid.length === 1) {
                    vid.splice(0, 1);
                  } else {
                    vid.splice(index, 1);
                  }
                  onChangeVid(index, e, delCheck);
                }}>
                <a>X</a>
              </span>
              <h3>{row.sectionArea} Video</h3>
              {Object.keys(row).map((key) => (
                <div>
                  {key === "sectionArea" && row["name"].length > 0 ? (
                    <input
                      placeholder='Cell Number'
                      type='text'
                      name='sectionArea'
                      value={row[key]}
                      onChange={(e) => onChangeVid(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "sectionOrdinality" ? (
                    <div>
                      <h5>Order the elements 1 is the first to appear</h5>
                      <input
                        type='number'
                        name='sectionOrdinality'
                        onChange={(e) => onChangeVid(index, e, font, pallet)}
                        value={row[key]}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {key === "url" ? (
                    <input
                      type='text'
                      placeholder='youtube watch key'
                      value={row[key]}
                      name={key}
                      onChange={(e) => onChangeVid(i, e)}
                    />
                  ) : (
                    ""
                  )}

                  {key === "width" ? (
                    <input
                      type='text'
                      placeholder='Width'
                      value={row[key]}
                      name={key}
                      onChange={(e) => onChangeVid(i, e)}
                    />
                  ) : (
                    ""
                  )}
                  {key === "height" ? (
                    <input
                      type='text'
                      placeholder='Height'
                      value={row[key]}
                      name={key}
                      onChange={(e) => onChangeVid(i, e)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default SectionManager;
