import React, { Fragment, useState, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import styled from "styled-components";
const ContentItem = ({ content }) => {
 const [viewState, setViewState] = useState(false);

 const siteContext = useContext(SiteContext);
 const { buildQuiz, embedQuiz, setCurrentContent } = siteContext;

 const {
  _id,
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
      className='btn btn-dark p-1 btn-sm'
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
       <div className='grid-2'>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "verticalName",

           content: verticalName,
          });
         }}>
         Vertical Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "summary",

           content: summary,
          });
         }}>
         Summary
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "author",

           content: author,
          });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "date",
           content: date,
          });
         }}>
         Date
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "title",

           content: title,
          });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img1",

           content: img1,
          });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img2",

           content: img2,
          });
         }}>
         Primary Review Image
        </button>
       </div>
       <div>
        <h5>Review Body</h5>
        {body.map(({ category, company, stars, review }) => (
         <div className=' grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "body.category",

             content: category,
            });
           }}>
           Category
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "body.company",

             content: company,
            });
           }}>
           Company
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "body.stars",

             content: stars,
            });
           }}>
           Stars
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "body.review",

             content: review,
            });
           }}>
           Review
          </button>
         </div>
        ))}
       </div>
       <div>
        {categories.map(({ category, categoryDescription }) => (
         <div className=' grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "categories.categoryDescription",

             content: categoryDescription,
            });
           }}>
           {category} Description
          </button>
         </div>
        ))}
       </div>
       <div>
        {firms.map(({ company, logo }) => (
         <div className=' grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "firms.logo",

             content: logo,
            });
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
       <div className='grid-2'>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "verticalName",
           content: verticalName,
          });
         }}>
         Vertical Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "author",
           content: author,
          });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "date",
           content: date,
          });
         }}>
         Date
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "title",
           content: title,
          });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img1",
           content: img1,
          });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img2",
           content: img2,
          });
         }}>
         Primary Review Image
        </button>
       </div>
       <div>
        <h5>Article Body</h5>
        {body.map(
         ({ pHeading, pBody, img, video, backlink, backlinkText }, i) => (
          <div className=''>
           Section {i}
           <div className='grid-2'>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
               type: contentType + "s",
               key: "body.pHeading",
               content: pHeading,
              });
             }}>
             Heading
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
               type: contentType + "s",
               key: "body.pBody",
               content: pBody,
              });
             }}>
             Body
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
               type: contentType + "s",
               key: "body.img",
               content: img,
              });
             }}>
             Image
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
               type: contentType + "s",
               key: "body.video",
               content: video,
              });
             }}>
             Video
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
               type: contentType + "s",
               key: "body.backlink",
               content: backlink,
              });
             }}>
             Backlink Url
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
               type: contentType + "s",
               key: "body.backlinkText",
               content: backlinkText,
              });
             }}>
             Backlink Text
            </button>
           </div>
          </div>
         )
        )}
       </div>
      </Fragment>
     )}
     {contentType === "blog" && (
      <Fragment>
       <div className='grid-2'>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "title",
           content: title,
          });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "author",
           content: author,
          });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "date",
           content: date,
          });
         }}>
         Date
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "p1",
           content: p1,
          });
         }}>
         Part 1
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "p2",
           content: p2,
          });
         }}>
         Part 2
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "p3",
           content: p3,
          });
         }}>
         Part 3
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "p4",
           content: p4,
          });
         }}>
         Part 4
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "p5",
           content: p5,
          });
         }}>
         Part 5
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img1",
           content: img1,
          });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img2",
           content: img2,
          });
         }}>
         Secondary Blog Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img3",
           content: img3,
          });
         }}>
         Primary Review Image
        </button>
       </div>
      </Fragment>
     )}
     {contentType === "quiz" && (
      <Fragment>
       <div className='grid-2'>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "title",
           content: title,
          });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "author",
           content: author,
          });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "date",
           content: date,
          });
         }}>
         Date
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "headingCopy",
           content: headingCopy,
          });
         }}>
         Heading Copy
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "footerCopy",
           content: footerCopy,
          });
         }}>
         Footer Copy
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "firm",
           content: firm,
          });
         }}>
         Firm
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img1",
           content: img1,
          });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img2",
           content: img2,
          });
         }}>
         Primary Quiz Image
        </button>

        {builtQuiz ? (
         <button
          className='btn btn-dark p-1 btn-sm'
          onClick={() => {
           setViewState((prevState) => !prevState);
           embedQuiz(img2);
          }}>
          Embed Quiz
         </button>
        ) : (
         <button
          className='btn btn-dark p-1 btn-sm'
          onClick={() => {
           setViewState((prevState) => !prevState);
           buildQuiz(body, results, type);
          }}>
          Build Quiz
         </button>
        )}
       </div>
      </Fragment>
     )}
     {contentType === "vertical" && (
      <Fragment>
       <div className='grid-2'>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "verticalName",
           content: name,
          });
         }}>
         Vertical Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "descrip1",
           content: descrip1,
          });
         }}>
         Primary Description
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "navText",
           content: navText,
          });
         }}>
         Nav Text
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "vLogTitle",
           content: vLogTitle,
          });
         }}>
         Video Log Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "vLogSummary",
           content: vLogSummary,
          });
         }}>
         Video Log Summary
        </button>

        {vids.map((vid, i) => (
         <div className='grid-2'>
          <button
           key={i}
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "vid",
             content: vid,
            });
           }}>
           VLog {i}
          </button>
         </div>
        ))}

        {qna.map((qa, i) => (
         <div className='grid-2' key={i}>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "qna.question",
             content: qa.question,
            });
           }}>
           Question {i}
          </button>

          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "qna.answer",
             content: qa.answer,
            });
           }}>
           Answer {i}
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "qna.video",
             content: qa.video,
            });
           }}>
           Video {i}
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "qna.image",
             content: qa.image,
            });
           }}>
           Image {i}
          </button>
         </div>
        ))}

        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img1",
           content: img1,
          });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img2",
           content: img2,
          });
         }}>
         Primary Vertical Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "img3",
           content: img3,
          });
         }}>
         Secondary Vertical Image
        </button>
       </div>
      </Fragment>
     )}
     {contentType === "firm" && (
      <Fragment>
       <div className='grid-2'>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "name",
           content: name,
          });
         }}>
         Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "email",
           content: email,
          });
         }}>
         Email
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "phone",
           content: phone,
          });
         }}>
         Phone
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "website",
           content: website,
          });
         }}>
         Website
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "cpa",
           content: cpa,
          });
         }}>
         Feat Employee
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "cpapic",
           content: cpapic,
          });
         }}>
         Feat Employee Pic
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "cpabio",
           content: cpabio,
          });
         }}>
         Feat Employee Bio
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "stars",
           content: stars,
          });
         }}>
         Stars
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "fees",
           content: fees,
          });
         }}>
         Fees
        </button>

        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "avgsavings",
           content: avgsavings,
          });
         }}>
         Average Savings
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "minimum",
           content: minimum,
          });
         }}>
         Minimum
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "years",
           content: years,
          });
         }}>
         Years
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "bbb",
           content: bbb,
          });
         }}>
         BBB
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "address",
           content: address,
          });
         }}>
         Address
        </button>

        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "cost",
           content: cost,
          });
         }}>
         Cost
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "logo",
           content: logo,
          });
         }}>
         Logo
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "city",
           content: city,
          });
         }}>
         City
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "state",
           content: state,
          });
         }}>
         State
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "socialLinks.facebook",
           content: socialLinks.facebook,
          });
         }}>
         Facebook
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "linkedin",
           content: socialLinks.linkedin,
          });
         }}>
         LinkedIn
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "instagram",
           content: socialLinks.instagram,
          });
         }}>
         Instagram
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "socialLinks.twitter",
           content: socialLinks.twitter,
          });
         }}>
         Twitter
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "socialLinks.article1",
           content: socialLinks.article1,
          });
         }}>
         Article1
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "socialLinks.article2",
           content: socialLinks.article2,
          });
         }}>
         Article 2
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "socialLinks.article3",
           content: socialLinks.article3,
          });
         }}>
         Article 3
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           type: contentType + "s",
           key: "socialLinks.article4",
           content: socialLinks.article4,
          });
         }}>
         Article 4
        </button>
       </div>

       {pros.map((pro, i) => (
        <div className=''>
         Pros
         <div className='grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "pro",
             content: pro,
            });
           }}>
           {i}
          </button>
         </div>
        </div>
       ))}
       {cons.map((con, i) => (
        <div className=''>
         <div className='grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "con",
             content: con,
            });
           }}>
           {i}
          </button>
         </div>
        </div>
       ))}

       {experiences.map((exp, i) => (
        <div className=''>
         Experience {i}
         <div className='grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "experiences.company",
             content: exp.company,
            });
           }}>
           Company
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "experiences.project",
             content: exp.project,
            });
           }}>
           Project
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "experiences.summary",
             content: exp.summary,
            });
           }}>
           Summary
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "experiences.date",
             content: exp.date,
            });
           }}>
           Date
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "experiences.title",
             content: exp.title,
            });
           }}>
           Title
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "experiences.img",
             content: exp.img,
            });
           }}>
           Image
          </button>
         </div>
        </div>
       ))}

       {acknowledgements.map((ack, i) => (
        <div className=''>
         Acknowledgement {i}
         <div className='grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "acknowledgements.network",
             content: ack.network,
            });
           }}>
           Exp {i} Network
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "acknowledgements.company",
             content: ack.company,
            });
           }}>
           Ack {i} Company
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "acknowledgements.summary",
             content: ack.summary,
            });
           }}>
           Ack {i} Summary
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "acknowledgements.date",
             content: ack.date,
            });
           }}>
           Ack {i} date
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "acknowledgements.orgLogo",
             content: ack.orgLogo,
            });
           }}>
           Ack {i} Org Logo
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "ack.awardLogo",
             content: ack.awardLogo,
            });
           }}>
           Ack {i} Award Logo
          </button>
         </div>
        </div>
       ))}

       {reviews.map((rev, i) => (
        <div className=''>
         Review {i}
         <div className='grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "reviews.reviewer",
             content: rev.reviewer,
            });
           }}>
           Reviewer
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "reviews.review",
             content: rev.review,
            });
           }}>
           Review
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "reviews.date",
             content: rev.date,
            });
           }}>
           Date
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "reviews.pic",
             content: rev.pic,
            });
           }}>
           Image
          </button>
         </div>
        </div>
       ))}

       {services.map((sev, i) => (
        <div>
         Service {i}
         <div className='grid-2'>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "services.serviceType",
             content: sev.serviceType,
            });
           }}>
           Type
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "services.service",
             content: sev.service,
            });
           }}>
           Title
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "services.cost",
             content: sev.cost,
            });
           }}>
           Cost
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "services.summary",
             content: sev.summary,
            });
           }}>
           Summary
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             type: contentType + "s",
             key: "services.img",
             content: sev.img,
            });
           }}>
           Image
          </button>
         </div>
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
