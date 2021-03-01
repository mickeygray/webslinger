import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizContext from "../../context/quiz/quizContext";
import Pagination from "../layout/Pagination";
import { withRouter } from "react-router";

const QuizForm = ({ setForm }) => {
  const quizContext = useContext(QuizContext);
  const { current, putQuiz, postQuiz, clearCurrentQuiz } = quizContext;
  const [quiz, setQuiz] = useState({
    title: "",
    date: "",
    author: "",
    firm: "",
    adPreference: "",
    vertical: "",
    score: 0,
    type: "",
    headingCopy: "",
    footerCopy: "",
    img1: "",
    img2: "",
  });

  const result = {
    copy: "",
    headline: "",
    img: "",
    video: "",
    page: 0,
    link: "",
    linkText: "",
  };

  const answer = {
    answer: "",
    score: 0,
  };

  const empty = {
    question: "",
    isLeadCapture: "",
    leadCaptureField: "",
    questionType: "",
    page: 0,
    copy: "",
    img: "",
    video: "",
    answers: [],
  };

  const [results, setResults] = useState([]);
  const [body, setBody] = useState([{ ...empty }]);

  const [showState, setShowState] = useState(false);

  useEffect(() => {}, []);

  const addQuizBody = () => {
    const newResults = [...body, { ...empty }];
    setBody(newResults);
  };
  const addResult = () => {
    const newResults = [...results, { ...result }];
    setResults(newResults);
  };
  const onChangeQuiz = (i, e, result) => {
    const { value, name } = e.currentTarget;
    const newResults = [...body];
    if (!result) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }
    setBody(newResults);
  };
  const onChangeAnswer = (i, e, result) => {
    const { value, name } = e.currentTarget;

    const answers = [...result.answers];

    answers[i] = {
      ...answers[i],
      [name]: value,
    };

    const newResults = [...body];

    const index = newResults.findIndex((x) => x === result);

    newResults[index] = {
      ...newResults[index],
      answers,
    };

    setBody(newResults);
  };

  const onChangeQuestionFile = (i, e) => {
    const { files, name } = e.target;
    const newResults = [...body];
    newResults[i] = {
      ...newResults[i],
      [name]: files[0].name,
    };
    setBody(newResults);
  };

  const onChangeResultFile = (i, e) => {
    const { files, name } = e.target;
    const newResults = [...results];
    newResults[i] = {
      ...newResults[i],
      [name]: files[0].name,
    };
    setResults(newResults);
  };

  const onChangeResult = (i, e, result) => {
    const { value, name } = e.currentTarget;
    const newResults = [...results];
    if (!result) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }
    setResults(newResults);
  };

  useEffect(() => {
    if (current != null) {
      setQuiz({
        title: current.title,
        date: current.date,
        adPreference: current.adPreference,
        author: current.author,
        firm: current.firm,
        vertical: current.vertical,
        type: current.type,
        score: current.score,
        headingCopy: current.headingCopy,
        footerCopy: current.footerCopy,
        img1: current.img1,
        img2: current.img2,
      });

      setBody(current.body);

      setResults(current.results);
    } else {
      setQuiz({
        title: "",
        date: "",
        author: "",
        score: 0,
        firm: "",
        vertical: "",
        type: "",
        adPreference: "",
        headingCopy: "",
        footerCopy: "",
        img1: "",
        img2: "",
      });
      setBody([{ ...empty }]);
      setResults([{ ...result }]);
    }
  }, [current, quizContext]);

  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const {
    title,
    date,
    author,
    firm,
    vertical,
    score,
    adPreference,
    type,
    headingCopy,
    footerCopy,
    img1,
    img2,
  } = quiz;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    function createFormData(formData, key, data) {
      if (data === Object(data) || Array.isArray(data)) {
        for (var i in data) {
          createFormData(formData, key + "[" + i + "]", data[i]);
        }
      } else {
        formData.append(key, data);
      }
    }
    for (let i = 0; i < file.length; i++) {
      formData.append(`${file[i].name}`, file[i]);
    }

    createFormData(formData, "results", results);
    createFormData(formData, "body", body);

    formData.append("firm", firm);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("adPreference", adPreference);
    formData.append("author", author);
    formData.append("type", type);
    formData.append("headingCopy", headingCopy);
    formData.append("footerCopy", footerCopy);

    formData.append("vertical", vertical);
    formData.append(
      filebody[0] ? `${filebody[0].name}` : "",
      filebody[0] ? filebody[0] : ""
    );
    formData.append(
      filebody[1] ? `${filebody[1].name}` : "",
      filebody[1] ? filebody[1] : ""
    );
    formData.append(
      "img1",
      filebody[0] && !current ? `${filebody[0].name}` : current && current.img1
    );
    formData.append(
      "img2",
      filebody[1] && !current ? `${filebody[1].name}` : current && current.img2
    );

    if (current !== null) {
      await putQuiz(formData, current._id);
    } else {
      await postQuiz(formData);
    }
    clearCurrentQuiz();
    setForm();
  };

  const [filebody, setFiles] = useState([]);
  const [file, setFile] = useState([]);

  function readmultifiles(e) {
    const files = e.target.files;
    Object.keys(files).forEach((i) => {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        filebody.push(file);
      };
      reader.readAsBinaryString(file);
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentQuestions = body.slice(indexOfFirstPost, indexOfLastPost);
  const currentResults = results.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='card bg-light grid-2'>
          <div>
            {" "}
            <label htmlFor='name'>Quiz Title</label>
            <input type='text' onChange={onChange} name='title' value={title} />
            <label htmlFor='name'>Quiz Author</label>
            <input
              type='text'
              onChange={onChange}
              name='author'
              value={author}
            />
            <label htmlFor='name'>Quiz Type</label>
            <select value={type} onChange={onChange} name='type'>
              <option></option>
              <option value='additive'>
                Additive: The Score Value ONLY influences the result
              </option>
              <option value='relative'>
                Relative: The Score Value ONLY influences which question the
                user sees next
              </option>
              <option value='joint'>
                Joint: The Score Value WILL INFLUENCE both the result and which
                question the user sees next.
              </option>
            </select>
            <label htmlFor='name'>Ad Preference</label>
            <select
              value={adPreference}
              onChange={onChange}
              name='adPreference'>
              <option></option>
              <option value='firm'>
                If Associated With A Firm Will Display Clickable Ad For Your
                Firm
              </option>
              <option value='vertical'>
                If Associated With A Vertical Will Display Clickable Ad For All
                Firms In Vertical
              </option>
              <option value='info'>
                Show Vertical Relative Information As Advertisement Material
              </option>
            </select>
          </div>
          <div>
            <label htmlFor='name'>Vertical</label>
            <input
              type='text'
              onChange={onChange}
              name='vertical'
              value={vertical}
            />
            <label htmlFor='name'>Firm</label>
            <input type='text' onChange={onChange} name='firm' value={firm} />

            <label htmlFor='name'>Quiz Heading Copy</label>
            <textarea
              name='headingCopy'
              placeholder='Above the start button'
              value={headingCopy}
              onChange={onChange}
            />
            <label htmlFor='name'>Quiz Footer Copy</label>
            <textarea
              name='footerCopy'
              placeholder='Below the start button'
              value={footerCopy}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='card bg-light'>
          <label htmlFor='name'>Questions</label>

          <button
            type='button'
            className='btn btn-block btn-primary'
            onClick={() => addQuizBody()}>
            Add Question
          </button>
        </div>
        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={body.length}
            paginate={paginate}
          />
        </div>
        <div className='grid-2'>
          {currentQuestions.map((result) => {
            const index = body.findIndex((x) => x === result);
            return (
              <div className='card bg-light' key={index}>
                <span
                  style={{ float: "right", backgroundColor: "#f4f4f4" }}
                  className='lead'
                  onClick={(e) => {
                    if (body.length === 1) {
                      body.splice(0, 1);
                    } else {
                      body.splice(index, 1);
                    }

                    onChangeQuiz(index, e, result);
                  }}>
                  <a>X</a>
                </span>
                <div>
                  <label>Page: </label>
                  <br />
                  <input
                    type='text'
                    name='page'
                    value={result.page}
                    onChange={(e) => {
                      onChangeQuiz(index, e);
                    }}
                  />
                  <label>Question Type</label>
                  <br />
                  <select
                    value={result.type}
                    onChange={(e) => onChangeQuiz(index, e)}
                    name='type'>
                    <option></option>
                    <option value='multipleChoice'>
                      Multiple Choice: Answers Will Present As Radio
                    </option>
                    <option value='comboValue'>
                      Multiple Selection: Answers Will Present As Check Boxes
                    </option>
                    <option value='shortForm'>
                      Short Form: Answers Will Present As Text Inputs
                    </option>
                    <option value='longForm'>
                      Long Form: Answers Will Present As Text Areas
                    </option>
                    <option value='video'>
                      Video: Question Will Present As YouTube Video Followed By
                      Multiple Choice (one per page)
                    </option>
                  </select>
                  <label>Lead Capture Settings</label>
                  <br />
                  <select
                    value={result.isLeadCapture}
                    onChange={(e) => onChangeQuiz(index, e)}
                    name='isLeadCapture'>
                    <option></option>
                    <option value='false'>
                      Do Not Collect This Information As Lead Data
                    </option>
                    <option value='true'>
                      Collect This Information As Lead Data
                    </option>
                  </select>

                  {result.isLeadCapture === "true" ? (
                    <div className=''>
                      <label>Lead Field: </label>
                      <br />

                      <select
                        value={result.leadCaptureField}
                        onChange={(e) => onChangeQuiz(index, e)}
                        name='leadCaptureField'>
                        <option></option>
                        <option value='name'>Name</option>
                        <option value='email'>Email</option>
                        <option value='phone'>Phone</option>
                        <option value='income'>Income</option>
                        <option value='compliance'>Tax Compliance</option>
                        <option value='filingStatus'>Tax Filing Status</option>
                        <option value='cpa'>Current Tax Professional</option>
                        <option value='amount'>Tax Debt</option>
                        <option value='type'>Tax Lien Type</option>
                        <option value='employment'>Employment Status</option>
                        <option value='credit'>Credit Score</option>
                        <option value='housepay'>Rent/Own</option>
                        <option value='housing'>Rent or Mortgage</option>
                        <option value='residents'>
                          Persons Residing In The Home
                        </option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                  <label>Question: </label>
                  <br />
                  <input
                    type='text'
                    name='question'
                    value={result.question}
                    onChange={(e) => {
                      onChangeQuiz(index, e);
                    }}
                  />
                </div>
                <div>
                  <label>Video: </label>
                  <br />
                  <input
                    type='text'
                    name='video'
                    value={result.video}
                    onChange={(e) => onChangeQuiz(index, e)}
                  />
                </div>
                <div>
                  <label>Copy: </label>
                  <br />
                  <textarea
                    placeholder='Will display as a closeable modal that launches over a question...'
                    name='copy'
                    value={result.copy}
                    onChange={(e) => onChangeQuiz(index, e)}
                  />
                </div>
                <label htmlFor='images'>Question Image</label>
                <input
                  type='text'
                  name='img'
                  value={result.img}
                  onChange={(e) => onChangeQuiz(index, e)}
                  disabled
                />
                <label htmlFor='images'>Upload Question Image Here</label>
                <input
                  type='file'
                  name='img'
                  onChange={(e) => {
                    onChangeQuestionFile(index, e);
                    setFile([...file, e.target.files[0]]);
                  }}
                  style={{ width: "200px" }}
                />
                <button
                  type='button'
                  className='btn btn-block btn-primary'
                  onClick={(e) => {
                    result.answers.push({ ...answer });
                    onChangeQuiz(index, e);
                  }}>
                  Add Answer
                </button>
                <br />
                <i>
                  If you are doing a relative or joint quiz please ensure your
                  answer totals match an existing question page.
                </i>
                <div className='grid-2'>
                  {result.answers
                    ? result.answers.map((answer, i) => (
                        <div className='card bg-secondary' key={i}>
                          <span
                            style={{
                              float: "right",
                              backgroundColor: "#f4f4f4",
                            }}
                            className='lead'
                            onClick={(e) => {
                              if (result.answers.length === 1) {
                                result.answers.splice(0, 1);
                              } else {
                                result.answers.splice(i, 1);
                              }

                              onChangeAnswer(i, e, result);
                              onChangeQuiz(i, e, result);
                            }}>
                            <a>X</a>
                          </span>
                          <label htmlFor='name'>Answer</label>

                          <input
                            type='text'
                            onChange={(e) => {
                              onChangeAnswer(i, e, result);
                            }}
                            name='answer'
                            value={answer.answer ? answer.answer : ""}
                          />

                          <label htmlFor='name'>Answer Score</label>

                          <input
                            type='text'
                            onChange={(e) => {
                              onChangeAnswer(i, e, result);
                            }}
                            name='score'
                            value={answer.score ? answer.score : ""}
                          />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            );
          })}
        </div>
        <div className='card bg-light'>
          <label htmlFor='name'>Quiz Results</label>

          <button
            type='button'
            className='btn btn-block btn-primary'
            onClick={() => addResult()}>
            Add Result
          </button>
        </div>
        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={results.length}
            paginate={paginate}
          />
        </div>
        <div className='grid-2'>
          {currentResults.map((result) => {
            const index = results.findIndex((x) => x === result);
            return (
              <div className='card bg-light' key={index}>
                <span
                  style={{ float: "right", backgroundColor: "#f4f4f4" }}
                  className='lead'
                  onClick={(e) => {
                    if (results.length === 1) {
                      results.splice(0, 1);
                    } else {
                      results.splice(index, 1);
                    }

                    onChangeResult(index, e, result);
                  }}>
                  <a>X</a>
                </span>
                <div>
                  <label>Result Headline: </label>
                  <br />
                  <input
                    type='text'
                    name='headline'
                    value={result.headline}
                    onChange={(e) => onChangeResult(index, e)}
                  />
                </div>

                <div>
                  <label>Result Copy: </label>
                  <br />
                  <textarea
                    name='copy'
                    value={result.copy}
                    onChange={(e) => {
                      onChangeResult(index, e);
                    }}
                  />
                </div>
                <div>
                  <label>Video: </label>
                  <br />
                  <input
                    type='text'
                    name='video'
                    value={result.video}
                    onChange={(e) => onChangeResult(index, e)}
                  />
                </div>
                <div>
                  <label>Link: </label>
                  <br />
                  <input
                    type='text'
                    name='link'
                    value={result.link}
                    onChange={(e) => onChangeResult(index, e)}
                  />
                </div>
                <div>
                  <label>Link Text: </label>
                  <br />
                  <input
                    type='text'
                    name='linkText'
                    value={result.linkText}
                    onChange={(e) => onChangeResult(index, e)}
                  />
                </div>
                <label htmlFor='images'>Result Image</label>
                <input
                  type='text'
                  name='img'
                  value={result.img}
                  onChange={(e) => onChangeResult(index, e)}
                  disabled
                />
                <label htmlFor='images'>Upload Result Image Here</label>
                <input
                  type='file'
                  name='img'
                  onChange={(e) => {
                    onChangeResultFile(index, e);
                    setFile([...file, e.target.files[0]]);
                  }}
                  style={{ width: "200px" }}
                />
              </div>
            );
          })}
        </div>

        <label htmlFor='images'>Quiz Item Image</label>
        <input
          type='text'
          name='img1'
          value={filebody[0] ? filebody[0].name : current && current.img1}
          onChange={onChange}
        />
        <label htmlFor='images'>Main Quiz Image</label>
        <input
          type='text'
          name='img2'
          value={filebody[1] ? filebody[1].name : current && current.img2}
          onChange={onChange}
        />
        <label htmlFor='images'>Upload Images Here</label>
        <input
          type='file'
          name='fs'
          onChange={readmultifiles}
          style={{ width: "200px" }}
          multiple
        />
        <br />
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value={current !== null ? "Update Quiz" : "Add Quiz"}
        />
      </form>
    </div>
  );
};

export default QuizForm;
