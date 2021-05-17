import React, { useEffect } from "react";
import { useAppContext } from "../../context/site/SiteState";
import styled from "styled-components";
import YouTube from "react-youtube";

const BuiltQuiz = (quiz) => {
 const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 300vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
 `;

 const Modal = styled.div`
  background: #fff;
  position: absolute;
  top: 15%;
  left: 15%;
  border: 1px solid #000;
  padding: 20px;
  min-height: 200px;
  z-index: 99999;
 `;

 const {
  writeLeadState,
  lead,
  toggleQuizModal,
  setCurrentScore,
  toggleQuizForward,
  toggleQuizBackward,
  setSubmissions,
  currentPage,
  clearQuiz,
  builtQuiz,
 } = useAppContext();

 const {
  title,
  date,
  author,
  type,
  headingCopy,
  adPreference,
  footerCopy,
  img1,
  img2,
  body,
  results,
  submissions,
  launchCopy,
  css,
 } = quiz;

 useEffect(() => {
  setCurrentScore(submissions, body, type);
 }, [submissions, body]);
 const bodyMap = [body[currentPage]].map(
  (
   {
    question,
    questionType,
    isLeadCapture,
    leadCaptureField,
    copy,
    img,
    video,
    page,
    answers,
    currentScore,
    prevScore,
   },
   i
  ) => {
   const captureLead = (leadCaptureField, isLeadCapture) => {
    if (isLeadCapture === "true") {
     const newLead = {
      ...lead,
      [leadCaptureField]: submissions[i].answer,
     };
     writeLeadState(newLead);
    }
   };

   const answerMap = answers.map(({ answer, score }) => {
    if (questionType === "shortForm") {
     return (
      <input
       type='text'
       name='answer'
       onChange={(e) => {
        setSubmissions(i, e, score);
        captureLead(leadCaptureField, isLeadCapture);
       }}
      />
     );
    } else if (questionType === "longForm") {
     return (
      <textarea
       name='answer'
       onChange={(e) => {
        setSubmissions(i, e, score);
        captureLead(leadCaptureField, isLeadCapture);
       }}
      />
     );
    } else if (questionType === "mulitpleChoice") {
     return (
      <input
       type='radio'
       name='answer'
       onChange={(e) => {
        setSubmissions(i, e, score);
        captureLead(leadCaptureField, isLeadCapture);
       }}
      />
     );
    } else if (questionType === "comboValue") {
     return (
      <input
       type='checkbox'
       name='answer'
       onChange={(e) => {
        setSubmissions(i, e, score);
        captureLead(leadCaptureField, isLeadCapture);
       }}
      />
     );
    } else if (questionType === "video") {
     return (
      <input
       type='radio'
       name='answer'
       onChange={(e) => {
        setSubmissions(i, e, score);
        captureLead(leadCaptureField, isLeadCapture);
       }}
      />
     );
    }
   });

   return (
    <div>
     <span style={{ float: "left" }}>
      {" "}
      <button
       className='btn btn-sm btn-light'
       onClick={() => toggleQuizBackward(prevScore)}>
       {" "}
       &#8592;{" "}
      </button>
     </span>
     <div className='grid-2'>
      <div>
       <div className='grid-2'>
        <h5>{question}</h5>
        <p>{copy}</p>
        <div>
         <img src={img} alt={img} />
        </div>
       </div>
       {questionType === "video" && <YouTube videoId={video} />}
      </div>
      <div>{answerMap}</div>
     </div>

     {i === body.length - 1 ? (
      <button
       className='btn btn-dark btn-block'
       onClick={() => tabulateResult(currentScore)}>
       Tabulate Result
      </button>
     ) : (
      <button
       className='btn btn-dark btn-block'
       onClick={() => toggleQuizForward(currentScore)}>
       Submit Answer
      </button>
     )}
    </div>
   );
  }
 );

 const tabulateResult = (currentScore) => {
  const res = results
   .filter((s) => s.score === currentScore)
   .map(({ copy, headline, img, video, score, maxScore, link, linkText }) => {
    return (
     <div>
      <span style={{ float: "right" }} className='background-light lead'>
       <a onClick={() => clearQuiz()}>X</a>
      </span>
      <h3>{headline}</h3>
      {img && <img src={img} />}
      {video && <YouTube videoId={video} />}
      {copy}
      {maxScore && (
       <div>
        You scored {score} / {maxScore}{" "}
       </div>
      )}
      {link && (
       <p>
        For More Visit
        <a href={link} target='_blank'>
         {linkText}
        </a>
       </p>
      )}
     </div>
    );
   });

  return res;
 };
 return (
  <div>
   <h3>{title}</h3>
   <div className='grid-2'>
    <p>{headingCopy}</p>
    <div>
     <img src={img1} />
    </div>
   </div>

   {builtQuiz === null ? (
    <button onClick={() => toggleQuizModal(quiz)}>{launchCopy}</button>
   ) : (
    <ModalContainer>
     <Modal>{bodyMap}</Modal>
    </ModalContainer>
   )}
   <div className='grid-2'>
    <p>{footerCopy}</p>
    <div>
     <img src={img2} />
    </div>
   </div>
  </div>
 );
};
export default BuiltQuiz;
