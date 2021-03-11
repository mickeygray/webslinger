import React, { Fragment, useState, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import styled from "styled-components";
const ContentItem = ({ content }) => {
  const [viewState, setViewState] = useState(false);

  const siteContext = useContext(SiteContext);
  const { buildQuiz, embedQuiz, setCurrentContent } = siteContext;

  const {
    website,
    contentType,
    email,
    phone,
    cpa,
    socialLinks,
    cpapic,
    cpabio,
    stars,
    vid,
    fees,
    avgsavings,
    minimum,
    years,
    bbb,
    cost,
    address,
    logo,
    city,
    state,
    experiences,
    acknowledgements,
    services,
    pros,
    cons,
    reviews,
    name,
    descrip1,
    qna,
    vLogSummary,
    navText,
    vLogTitle,
    vids,
    img1,
    img2,
    img3,
    title,
    p1,
    p2,
    p3,
    p4,
    p5,
    firm,
    date,
    author,
    type,
    headingCopy,
    footerCopy,
    body,
    builtQuiz,
    results,
    verticalName,
    summary,
    categories,
    firms,
  } = content;

  return (
    <div>
      {viewState === false ? (
        <div className='m-1 py-1'>
          <button
            className='btn btn-sm'
            onClick={() => {
              setViewState((prevState) => !prevState);
            }}>
            {contentType === "firm" && name}
            {contentType === "vertical" && name}
            {contentType === "blog" && title}
            {contentType === "article" && title}
            {contentType === "quiz" && title}
            {contentType === "review" && title}
          </button>
        </div>
      ) : (
        <Fragment>
          {contentType === "review" && (
            <Fragment>
              <div className='grid-3'>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(verticalName);
                  }}>
                  Vertical Name
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(summary);
                  }}>
                  Summary
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(author);
                  }}>
                  Author
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(verticalName);
                  }}>
                  Date
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(verticalName);
                  }}>
                  Title
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(img1);
                  }}>
                  Card Image
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(img2);
                  }}>
                  Primary Review Image
                </button>
              </div>
              <div>
                <h5>Review Body</h5>
                {body.map(({ category, company, stars, review }) => (
                  <div className='card' style={{ display: "flex" }}>
                    <button
                      onClick={() => {
                        setViewState((prevState) => !prevState);
                        setCurrentContent(category);
                      }}>
                      {category}
                    </button>
                    <button
                      onClick={() => {
                        setViewState((prevState) => !prevState);
                        setCurrentContent(company);
                      }}>
                      {company}
                    </button>
                    <button
                      onClick={() => {
                        setViewState((prevState) => !prevState);
                        setCurrentContent(stars);
                      }}>
                      Stars
                    </button>
                    <button
                      onClick={() => {
                        setViewState((prevState) => !prevState);
                        setCurrentContent(review);
                      }}>
                      Review
                    </button>
                  </div>
                ))}
              </div>
              <div>
                {categories.map(({ category, categoryDescription }) => (
                  <div className='card' style={{ display: "flex" }}>
                    <button
                      onClick={() => {
                        setViewState((prevState) => !prevState);
                        setCurrentContent(categoryDescription);
                      }}>
                      {category} Description
                    </button>
                  </div>
                ))}
              </div>
              <div>
                {firms.map(({ company, logo }) => (
                  <div className='card' style={{ display: "flex" }}>
                    <button
                      onClick={() => {
                        setViewState((prevState) => !prevState);
                        setCurrentContent(logo);
                      }}>
                      {company} Logo
                    </button>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
          {contentType === "article" && (
            <Fragment>
              <div className='grid-3'>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(verticalName);
                  }}>
                  Vertical Name
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(author);
                  }}>
                  Author
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(verticalName);
                  }}>
                  Date
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(verticalName);
                  }}>
                  Title
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(img1);
                  }}>
                  Card Image
                </button>
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(img2);
                  }}>
                  Primary Review Image
                </button>
              </div>
              <div>
                <h5>Article Body</h5>
                {body.map(
                  (
                    { pHeading, pBody, img, video, backlink, backlinkText },
                    i
                  ) => (
                    <div className='card' style={{ display: "flex" }}>
                      Section {i}
                      <button
                        onClick={() => {
                          setViewState((prevState) => !prevState);
                          setCurrentContent(pHeading);
                        }}>
                        Heading
                      </button>
                      <button
                        onClick={() => {
                          setViewState((prevState) => !prevState);
                          setCurrentContent(pBody);
                        }}>
                        Body
                      </button>
                      <button
                        onClick={() => {
                          setViewState((prevState) => !prevState);
                          setCurrentContent(img);
                        }}>
                        Image
                      </button>
                      <button
                        onClick={() => {
                          setViewState((prevState) => !prevState);
                          setCurrentContent(video);
                        }}>
                        Video
                      </button>
                      <button
                        onClick={() => {
                          setViewState((prevState) => !prevState);
                          setCurrentContent(backlink);
                        }}>
                        Backlink Url
                      </button>
                      <button
                        onClick={() => {
                          setViewState((prevState) => !prevState);
                          setCurrentContent(backlinkText);
                        }}>
                        Backlink Text
                      </button>
                    </div>
                  )
                )}
              </div>
            </Fragment>
          )}
          {contentType === "blog" && (
            <Fragment>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(title);
                }}>
                Title
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(author);
                }}>
                Author
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(date);
                }}>
                Date
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(p1);
                }}>
                Part 1
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(p2);
                }}>
                Part 2
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(p3);
                }}>
                Part 3
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(p4);
                }}>
                Part 4
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(p5);
                }}>
                Part 5
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img1);
                }}>
                Card Image
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img2);
                }}>
                Secondary Blog Image
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img2);
                }}>
                Primary Review Image
              </button>
            </Fragment>
          )}
          {contentType === "quiz" && (
            <Fragment>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(title);
                }}>
                Title
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(author);
                }}>
                Author
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(date);
                }}>
                Date
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(headingCopy);
                }}>
                Heading Copy
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(footerCopy);
                }}>
                Footer Copy
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(firm);
                }}>
                Firm
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img1);
                }}>
                Card Image
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img2);
                }}>
                Primary Quiz Image
              </button>

              {builtQuiz ? (
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    embedQuiz(img2);
                  }}>
                  Embed Quiz
                </button>
              ) : (
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    buildQuiz(body, results, type);
                  }}>
                  Build Quiz
                </button>
              )}
            </Fragment>
          )}
          {contentType === "vertical" && (
            <Fragment>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(name);
                }}>
                Vertical Name
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(descrip1);
                }}>
                Primary Description
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(navText);
                }}>
                Nav Text
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(vLogTitle);
                }}>
                Video Log Title
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(vLogSummary);
                }}>
                Video Log Summary
              </button>

              {vids.map((vid, i) => (
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(vid);
                  }}>
                  VLog {i}
                </button>
              ))}

              {qna.map((qa, i) => (
                <div key={i} style={{ display: "flex" }}>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(vid);
                    }}>
                    Question {i}
                  </button>

                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(vid);
                    }}>
                    Answer {i}
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(vid);
                    }}>
                    Video {i}
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(vid);
                    }}>
                    Image {i}
                  </button>
                </div>
              ))}

              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img1);
                }}>
                Card Image
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img2);
                }}>
                Primary Vertical Image
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(img3);
                }}>
                Secondary Vertical Image
              </button>
            </Fragment>
          )}
          {contentType === "firm" && (
            <Fragment>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(name);
                }}>
                Name
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(email);
                }}>
                Email
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(phone);
                }}>
                Phone
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(website);
                }}>
                Website
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(cpa);
                }}>
                Feat Employee
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(cpapic);
                }}>
                Feat Employee Pic
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(cpabio);
                }}>
                Feat Employee Bio
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(stars);
                }}>
                Stars
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(fees);
                }}>
                Fees
              </button>

              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(avgsavings);
                }}>
                Average Savings
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(minimum);
                }}>
                Minimum
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(years);
                }}>
                Years
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(bbb);
                }}>
                BBB
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(address);
                }}>
                Address
              </button>

              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(cost);
                }}>
                Cost
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(logo);
                }}>
                Logo
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(city);
                }}>
                City
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(state);
                }}>
                State
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.facebook);
                }}>
                Facebook
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.linkedin);
                }}>
                LinkedIn
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.instagram);
                }}>
                Instagram
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.twitter);
                }}>
                Twitter
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.article1);
                }}>
                Article1
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.article2);
                }}>
                Article 2
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.article3);
                }}>
                Article 3
              </button>
              <button
                onClick={() => {
                  setViewState((prevState) => !prevState);
                  setCurrentContent(socialLinks.article4);
                }}>
                Article 4
              </button>

              {pros.map((pro, i) => (
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(pro);
                  }}>
                  Pro {i}
                </button>
              ))}
              {cons.map((con, i) => (
                <button
                  onClick={() => {
                    setViewState((prevState) => !prevState);
                    setCurrentContent(con);
                  }}>
                  Con {i}
                </button>
              ))}

              {experiences.map((exp, i) => (
                <div>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(exp.company);
                    }}>
                    Exp {i} Company
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(exp.project);
                    }}>
                    Exp {i} Project
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(exp.summary);
                    }}>
                    Exp {i} Summary
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(exp.date);
                    }}>
                    Exp {i} date
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(exp.title);
                    }}>
                    Exp {i} Title
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(exp.img);
                    }}>
                    Exp {i} Img
                  </button>
                </div>
              ))}

              {acknowledgements.map((ack, i) => (
                <div>
                  {" "}
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(ack.network);
                    }}>
                    Exp {i} Network
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(ack.company);
                    }}>
                    Ack {i} Company
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(ack.summary);
                    }}>
                    Ack {i} Summary
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(ack.date);
                    }}>
                    Ack {i} date
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(ack.orgLogo);
                    }}>
                    Ack {i} Org Logo
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(ack.awardLogo);
                    }}>
                    Ack {i} Award Logo
                  </button>
                </div>
              ))}

              {reviews.map((rev, i) => (
                <div>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(rev.reviewer);
                    }}>
                    Rev {i} Reviewer
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(rev.review);
                    }}>
                    Rev {i} Review
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(rev.date);
                    }}>
                    Rev {i} Date
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(rev.pic);
                    }}>
                    Rev {i} Pic
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(rev.pic);
                    }}>
                    Rev {i} Pic
                  </button>
                </div>
              ))}

              {services.map((sev, i) => (
                <div>
                  {" "}
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(sev.serviceType);
                    }}>
                    Rev {i} Reviewer
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(sev.service);
                    }}>
                    Rev {i} Review
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(sev.cost);
                    }}>
                    Rev {i} Date
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(sev.summary);
                    }}>
                    Rev {i} Pic
                  </button>
                  <button
                    onClick={() => {
                      setViewState((prevState) => !prevState);
                      setCurrentContent(sev.img);
                    }}>
                    Rev {i} Pic
                  </button>
                </div>
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};
export default ContentItem;
