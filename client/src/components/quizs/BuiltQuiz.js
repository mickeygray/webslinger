import React, { useReducer } from "react";
import { useAppContext } from "../../context/site/SiteState";
import styled from "styled-components";
import { sign } from "crypto";

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
  toggleQuizForward,
  toggleQuizBackward,
  setSubmissions,
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

 const bodyMap = body.map(
  (
   {
    question,
    questionType,
    isLeadCapture,
    leadCaptureField,
    copy,
    img,
    video,
    score,
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
      <input type='text' name='answer' onChange={(e) => setSubmissions(i, e)} />
     );
    } else if (questionType === "longForm") {
     return <textarea name='answer' onChange={(e) => setSubmissions(i, e)} />;
    } else if (questionType === "mulitpleChoice") {
     return (
      <input
       type='radio'
       name='answer'
       onChange={(e) => setSubmissions(i, e)}
      />
     );
    } else if (questionType === "comboValue") {
     return (
      <input
       type='checkbox'
       name='answer'
       onChange={(e) => setSubmissions(i, e)}
      />
     );
    } else if (questionType === "video") {
     return (
      <input
       type='radio'
       name='answer'
       onChange={(e) => setSubmissions(i, e)}
      />
     );
    }
   });
  }
 );

 const resultsMap = results.map(
  ({ copy, headline, img, video, score, link, linkText }) => {}
 );

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
     <Modal>{quiz}</Modal>
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
