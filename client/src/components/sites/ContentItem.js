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
           content: verticalName,
          });
         }}>
         Vertical Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: summary });
         }}>
         Summary
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: author });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           content: verticalName,
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
           content: verticalName,
          });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img1 });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img2 });
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
             content: category,
            });
           }}>
           Category
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: company });
           }}>
           Company
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: stars });
           }}>
           Stars
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: review });
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
            setCurrentContent({ contentId: _id, content: logo });
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
           content: verticalName,
          });
         }}>
         Vertical Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: author });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
           content: verticalName,
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
           content: verticalName,
          });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img1 });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img2 });
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
               content: pHeading,
              });
             }}>
             Heading
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({ contentId: _id, content: pBody });
             }}>
             Body
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({ contentId: _id, content: img });
             }}>
             Image
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({ contentId: _id, content: video });
             }}>
             Video
            </button>
            <button
             className='btn btn-dark p-1 btn-sm'
             onClick={() => {
              setViewState((prevState) => !prevState);
              setCurrentContent({
               contentId: _id,
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
          setCurrentContent({ contentId: _id, content: title });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: author });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: date });
         }}>
         Date
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: p1 });
         }}>
         Part 1
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: p2 });
         }}>
         Part 2
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: p3 });
         }}>
         Part 3
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: p4 });
         }}>
         Part 4
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: p5 });
         }}>
         Part 5
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img1 });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img2 });
         }}>
         Secondary Blog Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img2 });
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
          setCurrentContent({ contentId: _id, content: title });
         }}>
         Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: author });
         }}>
         Author
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: date });
         }}>
         Date
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: headingCopy });
         }}>
         Heading Copy
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: footerCopy });
         }}>
         Footer Copy
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: firm });
         }}>
         Firm
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img1 });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img2 });
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
          setCurrentContent({ contentId: _id, content: name });
         }}>
         Vertical Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: descrip1 });
         }}>
         Primary Description
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: navText });
         }}>
         Nav Text
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: vLogTitle });
         }}>
         Video Log Title
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: vLogSummary });
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
            setCurrentContent({ contentId: _id, content: vid });
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
            setCurrentContent({ contentId: _id, content: vid });
           }}>
           Question {i}
          </button>

          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: vid });
           }}>
           Answer {i}
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: vid });
           }}>
           Video {i}
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: vid });
           }}>
           Image {i}
          </button>
         </div>
        ))}

        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img1 });
         }}>
         Card Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img2 });
         }}>
         Primary Vertical Image
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: img3 });
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
          setCurrentContent({ contentId: _id, content: name });
         }}>
         Name
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: email });
         }}>
         Email
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: phone });
         }}>
         Phone
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: website });
         }}>
         Website
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: cpa });
         }}>
         Feat Employee
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: cpapic });
         }}>
         Feat Employee Pic
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: cpabio });
         }}>
         Feat Employee Bio
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: stars });
         }}>
         Stars
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: fees });
         }}>
         Fees
        </button>

        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: avgsavings });
         }}>
         Average Savings
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: minimum });
         }}>
         Minimum
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: years });
         }}>
         Years
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: bbb });
         }}>
         BBB
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: address });
         }}>
         Address
        </button>

        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: cost });
         }}>
         Cost
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: logo });
         }}>
         Logo
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: city });
         }}>
         City
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({ contentId: _id, content: state });
         }}>
         State
        </button>
        <button
         className='btn btn-dark p-1 btn-sm'
         onClick={() => {
          setViewState((prevState) => !prevState);
          setCurrentContent({
           contentId: _id,
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
            setCurrentContent({ contentId: _id, content: pro });
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
            setCurrentContent({ contentId: _id, content: con });
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
             content: exp.summary,
            });
           }}>
           Summary
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: exp.date });
           }}>
           Date
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: exp.title });
           }}>
           Title
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: exp.img });
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
             content: ack.summary,
            });
           }}>
           Ack {i} Summary
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: ack.date });
           }}>
           Ack {i} date
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
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
             content: rev.review,
            });
           }}>
           Review
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: rev.date });
           }}>
           Date
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: rev.pic });
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
             content: sev.service,
            });
           }}>
           Title
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: sev.cost });
           }}>
           Cost
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({
             contentId: _id,
             content: sev.summary,
            });
           }}>
           Summary
          </button>
          <button
           className='btn btn-dark p-1 btn-sm'
           onClick={() => {
            setViewState((prevState) => !prevState);
            setCurrentContent({ contentId: _id, content: sev.img });
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
