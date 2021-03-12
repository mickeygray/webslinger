import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

import SiteContext from "../../context/site/siteContext";

const PageManager = ({ areas, changeDisplay }) => {
  const siteContext = useContext(SiteContext);
  const {
    getComponent,
    deleteComponent,
    deleteArea,
    currentPage,
  } = siteContext;
  const { head, nav, header, footer, main } = areas;

  const onChangePage = (e) => {};
  const onChangePageTag = (e) => {};
  return (
    <Fragment>
      <div className='bg-light'>
        <div className='grid-4'>
          {Object.values(head).map(({ metaTags, title }) => (
            <div>
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => deleteArea(currentPage._id, "head")}>
                <a>X</a>
              </span>
              <input
                type='text'
                name='title'
                value={title}
                onChange={(e) => onChangePage(e)}
              />

              {metaTags.map((tag, i) => {
                return (
                  <div className='card'>
                    <span
                      style={{ float: "right", background: "#f4f4f4" }}
                      className='lead'
                      onClick={(e) => {
                        let delCheck = 1;
                        if (metaTags.length === 1) {
                          metaTags.splice(0, 1);
                        } else {
                          metaTags.splice(i, 1);
                        }
                        onChangePageTag(i, e, delCheck);
                      }}>
                      <a>X</a>
                    </span>

                    <input
                      placeholder='Tag Name...'
                      type='text'
                      name='tag'
                      value={tag.tag}
                      onChange={(e) => onChangePageTag(i, e)}
                    />
                    <input
                      placeholder='Tag Name...'
                      type='text'
                      name='tag'
                      value={tag.content}
                      onChange={(e) => onChangePageTag(i, e)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className='grid-4'>
          {Object.values(nav).map((section) => (
            <div>
              {" "}
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  deleteArea(currentPage._id, "nav");
                }}>
                <a>X</a>
              </span>
              <div>
                <ul className='grid-3'>
                  {section.components.map((component) => {
                    <li className='lead'>
                      <button
                        onClick={() => {
                          getComponent(component);
                          changeDisplay("component");
                        }}>
                        {" "}
                        Name: {component.name}
                        <br />
                        Section: {component.sectionArea}
                      </button>

                      <span
                        style={{ float: "right", background: "#f4f4f4" }}
                        className='lead'
                        onClick={(e) => {
                          deleteComponent(component._id);
                        }}>
                        <a>X</a>
                      </span>
                    </li>;
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className='grid-4'>
          {Object.values(header).map((section) => (
            <div>
              {" "}
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  deleteArea(currentPage._id, "header");
                }}>
                <a>X</a>
              </span>
              <div>
                <ul className='grid-3'>
                  {section.components.map((component) => {
                    <li className='lead'>
                      <button
                        onClick={() => {
                          getComponent(component);
                          changeDisplay("component");
                        }}>
                        {" "}
                        Name: {component.name} <br />
                        Section: {component.sectionArea}
                      </button>
                      <span
                        style={{ float: "right", background: "#f4f4f4" }}
                        className='lead'
                        onClick={(e) => {
                          deleteComponent(component._id);
                        }}>
                        <a>X</a>
                      </span>
                    </li>;
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className='grid-4'>
          {Object.values(footer).map((section) => (
            <div>
              {" "}
              <span
                style={{ float: "right", background: "#f4f4f4" }}
                className='lead'
                onClick={(e) => {
                  deleteArea(currentPage._id, "footer");
                }}>
                <a>X</a>
              </span>
              <div>
                <ul className='grid-3'>
                  {section.components.map((component) => {
                    <li className='lead'>
                      <button
                        onClick={() => {
                          getComponent(component);
                          changeDisplay("component");
                        }}>
                        {" "}
                        Name: {component.name} <br />
                        Section: {component.sectionArea}
                      </button>
                      <span
                        style={{ float: "right", background: "#f4f4f4" }}
                        className='lead'
                        onClick={(e) => {
                          deleteComponent(component._id);
                        }}>
                        <a>X</a>
                      </span>
                    </li>;
                  })}
                </ul>
              </div>
              <div className='grid-4'>
                {Object.values(main).map((section) => (
                  <div>
                    {" "}
                    <span
                      style={{ float: "right", background: "#f4f4f4" }}
                      className='lead'
                      onClick={(e) => {
                        deleteArea(currentPage._id, "main");
                      }}>
                      <a>X</a>
                    </span>
                    <div>
                      <ul className='grid-3'>
                        {section.components.map((component) => {
                          <li className='lead'>
                            <button
                              onClick={() => {
                                getComponent(component);
                                changeDisplay("component");
                              }}>
                              {" "}
                              Name: {component.name} <br />
                              Section: {component.sectionArea}
                            </button>

                            <span
                              style={{ float: "right", background: "#f4f4f4" }}
                              className='lead'
                              onClick={(e) => {
                                deleteComponent(component._id);
                              }}>
                              <a>X</a>
                            </span>
                          </li>;
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PageManager;
