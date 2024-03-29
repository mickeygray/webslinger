import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import VerticalContext from "../../context/vertical/verticalContext";

const VerticalForm = ({ setForm }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;
  const onChange2 = (e) => {
    setVids([...vids, e.target.value]);
  };
  const verticalContext = useContext(VerticalContext);
  const {
    current,
    putVertical,
    postVertical,
    clearCurrentVertical,
  } = verticalContext;
  const [vert, setVert] = useState({
    name: "",
    descrip1: "",
    articleTitle: "",
    quizTitle: "",
    vLogTitle: "",
    vlogSummary: "",
    vids: [],
    vertical: "",
    img1: "",
    img2: "",
    img3: "",
  });

  const qa = {
    question: "",
    answer: "",
    img: "",
    video: "",
  };

  const [qnas, setQna] = useState([{ ...qa }]);

  const onChangeQA = (i, e, result) => {
    const { value, name } = e.currentTarget;
    const newResults = [...qnas];
    if (!result) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }
    setQna(newResults);
  };

  const addQA = () => {
    const newResults = [...qnas, { ...qa }];
    setQna(newResults);
  };

  const [vids, setVids] = useState([]);
  const [vidArr, setVidArr] = useState([
    <input type='text' name='vid1' onChange={onChange2} />,
  ]);
  useEffect(() => {
    if (current != null) {
      setVert({
        name: current.name,
        descrip1: current.descrip1,
        articleTitle: current.articleTitle,
        quizTitle: current.quizTitle,
        vLogTitle: current.vLogTitle,
        navText: current.navText,
        vLogSummary: current.vLogSummary,
        vertical: current.vertical,
        img1: current.img1,
        img2: current.img2,
        img3: current.img3,
      });
      setQna(current.qna);
      setVids(current.vids);
    } else {
      setVert({
        name: "",
        descrip1: "",
        articleTitle: "",
        quizTitle: "",
        vLogTitle: "",
        vLogSummary: "",
        navText: "",
        vertical: "",
        img1: "",
        img2: "",
        img3: "",
      });
      setVids([]);
    }
  }, [current, verticalContext]);

  const onChange = (e) => {
    setVert({ ...vert, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (current) {
      current.vids.map((vid, i) => {
        const name = "vid" + i;

        vidArr.push(
          <input type='text' name={name} value={vid} onChange={onChange2} />
        );
      });
    }
  }, [current, vidArr]);

  const onClick = (e) => {
    e.preventDefault();
    const vidName = "vid" + vidArr.length + 2;
    setVidArr([
      ...vidArr,
      <input type='text' name={vidName} onChange={onChange2} />,
    ]);
  };

  const onSubmit = (e) => {
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

    createFormData(formData, "qna", qnas);
    formData.append("name", vert.name);
    formData.append("user", _id);
    formData.append("descrip1", vert.descrip1);
    formData.append("vids", vids);
    formData.append("navText", vert.navText);
    formData.append("articleTitle", vert.articleTitle);
    formData.append("quizTitle", vert.quizTitle);
    formData.append("vLogTitle", vert.vLogTitle);
    formData.append("vLogSummary", vert.vLogSummary);
    formData.append("vertical", vert.vertical);

    formData.append(
      filebody[0] ? `${filebody[0].name}` : "",
      filebody[0] ? filebody[0] : ""
    );
    formData.append(
      filebody[1] ? `${filebody[1].name}` : "",
      filebody[1] ? filebody[1] : ""
    );
    formData.append(
      filebody[2] ? `${filebody[2].name}` : "",
      filebody[2] ? filebody[2] : ""
    );
    formData.append(
      "img1",
      filebody[0] && !current ? `${filebody[0].name}` : current && current.img1
    );
    formData.append(
      "img2",
      filebody[1] && !current ? `${filebody[1].name}` : current && current.img2
    );
    formData.append(
      "img3",
      filebody[2] && !current ? `${filebody[2].name}` : current && current.img3
    );

    if (current !== null) {
      const id = current._id;
      putVertical(formData, id);
      clearCurrentVertical();
    } else {
      postVertical(formData);
      clearCurrentVertical();
    }
    setForm();
  };

  const {
    name,
    descrip1,
    articleTitle,
    quizTitle,
    vLogTitle,
    vLogSummary,
    vertical,
    img1,
    img2,
    navText,
    img3,
  } = vert;

  const onChangeQAFile = (i, e) => {
    const { files, name } = e.target;
    const newResults = [...qnas];
    newResults[i] = {
      ...newResults[i],
      [name]: files[0].name,
    };
    setQna(newResults);
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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='card bg-light grid-2'>
          <div>
            <label htmlFor='name'>Vertical Title</label>
            <input type='text' onChange={onChange} name='name' value={name} />
            <label htmlFor='name'>Vertical Simple</label>
            <input
              type='text'
              onChange={onChange}
              name='vertical'
              value={vertical}
            />
            <label htmlFor='name'>Vertical Navbar Text</label>
            <input
              type='text'
              onChange={onChange}
              name='navText'
              value={navText}
            />
            <label htmlFor='name'>Primary Description</label>
            <input
              type='text'
              onChange={onChange}
              name='descrip1'
              value={descrip1}
            />
          </div>
          <div>
            <label htmlFor='name'>Video Log Title</label>
            <input
              type='text'
              onChange={onChange}
              name='vLogTitle'
              value={vLogTitle}
            />
            <label htmlFor='name'>Video Log Summary</label>
            <input
              type='text'
              onChange={onChange}
              name='vLogSummary'
              value={vLogSummary}
            />

            <label htmlFor='vids'>Current Videos</label>
            {vidArr.map((vid) => vid)}
            <button type='button' className='btn btn-primary' onClick={onClick}>
              Add A New Video
            </button>
          </div>
        </div>
        <div className='card bg-light'>
          <h5>Add Question And Answer Segment</h5>
          <button
            type='button'
            className='btn btn-primary btn-block'
            onClick={() => addQA()}>
            Add QA Segment
          </button>
          <div className='grid-3'>
            {qnas.map((result, i) => {
              const index = qnas.findIndex((x) => x === result);
              return (
                <div
                  key={i}
                  className='card bg-primary'
                  style={{ width: "300px" }}>
                  <span
                    style={{ float: "right", backgroundColor: "#f4f4f4" }}
                    className='lead'
                    onClick={(e) => {
                      if (qnas.length === 1) {
                        qnas.splice(0, 1);
                      } else {
                        qnas.splice(index, 1);
                      }

                      onChangeQA(index, e, result);
                    }}>
                    <a>X</a>
                  </span>
                  <div>
                    <label>Question </label>
                    <input
                      type='text'
                      value={result.question}
                      name='question'
                      onChange={(e) => onChangeQA(i, e)}
                    />
                  </div>
                  <div>
                    <label>Answer</label>
                    <input
                      type='text'
                      value={result.answer}
                      name='answer'
                      onChange={(e) => onChangeQA(i, e)}
                    />
                  </div>
                  <div>
                    <label>Video</label>
                    <input
                      type='text'
                      value={result.video}
                      name='video'
                      onChange={(e) => onChangeQA(i, e)}
                    />
                  </div>
                  <div>
                    <label htmlFor='images'>QA Section Image</label>
                    <input
                      type='text'
                      name='img'
                      value={result.img}
                      onChange={(e) => onChangeQA(i, e)}
                      disabled
                    />
                    <label htmlFor='images'>Upload Section Image Here</label>
                    <input
                      type='file'
                      name='img'
                      onChange={(e) => {
                        onChangeQAFile(i, e);
                        setFile([...file, e.target.files[0]]);
                      }}
                      style={{ width: "200px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='card bg-light'>
          <h5>Image Name Fields</h5>
          <label htmlFor='images'>Front Page Logo</label>
          {current ? (
            <input
              type='text'
              name='img1'
              value={filebody[0] ? filebody[0].name : current.img1}
              onChange={onChange}
            />
          ) : (
            <input
              type='text'
              name='img1'
              value={filebody[0] ? filebody[0].name : ""}
              onChange={onChange}
            />
          )}
          <label htmlFor='images'>Vertical Page Sub Hero </label>
          <input
            type='text'
            name='img2'
            value={filebody[1] ? filebody[1].name : current && current.img2}
            onChange={onChange}
          />
          <label htmlFor='images'>Vertical Page Primary Image</label>
          <input
            type='text'
            name='img3'
            value={filebody[2] ? filebody[2].name : current && current.img3}
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
        </div>
        <br />
        <div className='card bg-light'>
          <input
            type='submit'
            className='btn btn-primary btn-block'
            value={current !== null ? "Update Vertical" : "Add Vertical"}
          />
        </div>
      </form>
    </div>
  );
};

export default VerticalForm;
