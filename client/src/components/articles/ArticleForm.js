import React, { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../../context/auth/authContext";
import ArticleContext from "../../context/article/articleContext";

const ArticleForm = ({ setForm }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { _id } = user;

  const articleContext = useContext(ArticleContext);
  const {
    current,
    putArticle,
    postArticle,
    clearCurrentArticle,
  } = articleContext;
  const [article, setArticle] = useState({
    title: "",
    author: "",
    vertical: "",
    verticalName: "",
    img1: "",
    firm: "",
    adPreference: "",
    date: Intl.DateTimeFormat(
      "fr-CA",
      {
        timeZone: "America/Los_Angeles",
      },
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    ).format(new Date()),
  });

  const empty = {
    pHeading: "",
    pBody: "",
    img: "",
    video: "",
    backlink: "",
    backlinkText: "",
  };

  const [body, setBody] = useState([{ ...empty }]);

  const addBody = () => {
    const newResults = [...body, { ...empty }];
    setBody(newResults);
  };
  const onChangeArticle = (i, e, result) => {
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

  const onChangeArticleFile = (i, e) => {
    const { files, name } = e.target;
    const newResults = [...body];
    newResults[i] = {
      ...newResults[i],
      [name]: files[0].name,
    };
    setBody(newResults);
  };
  useEffect(() => {
    if (current !== null) {
      setArticle({
        title: current.title,
        author: current.author,
        vertical: current.vertical,
        verticalName: current.verticalName,
        img1: current.img1,
        date: current.date,
        firm: current.firm,
        adPreference: current.adPreference,
      });
      setBody(current.body);
    } else {
      setArticle({
        title: "",
        author: "",
        firm: "",
        verticalName: "",
        img1: "",
        adPreference: "",
        vertical: "",
        date: Intl.DateTimeFormat(
          "fr-CA",
          {
            timeZone: "America/Los_Angeles",
          },
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ).format(new Date()),
      });
    }
  }, [current, articleContext]);

  const onChange = (e) =>
    setArticle({ ...article, [e.target.name]: e.target.value });

  const [previewState, setPreviewState] = useState(false);

  const resetPreview = useCallback(() => {
    setPreviewState((prevState) => !prevState);
  }, []);

  const [file, setFile] = useState([]);

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
    for (let i = 0; i < file.length; i++) {
      formData.append(`${file[i].name}`, file[i]);
    }
    createFormData(formData, "body", body);
    formData.append("title", article.title);

    formData.append("user", _id);
    formData.append("verticalName", article.verticalName);
    formData.append("img1", article.img1);
    formData.append("author", article.author);
    formData.append("date", article.date);
    formData.append("adPreference", article.adPreference);
    formData.append("firm", article.firm);

    if (current !== null) {
      putArticle(formData, current._id);
    } else {
      postArticle(formData);
    }

    setForm();
    clearCurrentArticle();
  };

  console.log(article);
  console.log(body);
  const {
    title,
    author,
    vertical,
    date,
    verticalName,
    img1,
    firm,
    adPreference,
  } = article;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='card bg-light grid-2'>
          <div>
            {" "}
            <label htmlFor='name'>Article Title</label>
            <input type='text' onChange={onChange} name='title' value={title} />
            <label htmlFor='name'>Article Author</label>
            <input
              type='text'
              onChange={onChange}
              name='author'
              value={author}
            />
            <label htmlFor='name'>Date</label>
            <input type='text' onChange={onChange} name='date' value={date} />
            <label htmlFor='images'>Card Image</label>
            <input
              type='text'
              name='img1'
              value={img1}
              onChange={onChange}
              disabled
            />
            <label htmlFor='images'>Upload Card Image Here</label>
            <input
              type='file'
              name='img1'
              onChange={(e) => {
                onChange(e);
                setFile([...file, e.target.files[0]]);
              }}
              style={{ width: "200px" }}
            />
          </div>
          <div>
            <label htmlFor='name'>Vertical Name</label>
            <input
              type='text'
              onChange={onChange}
              name='verticalName'
              value={verticalName}
            />
            <label htmlFor='name'>Firm</label>
            <input type='text' onChange={onChange} name='firm' value={firm} />
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
        </div>
        <div className='card bg-light'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => addBody()}>
            Add Article Section
          </button>

          <div className='grid-3 bg-light'>
            {body.map((result, i) => (
              <div className='card bg-primary' key={i}>
                <div>
                  <span
                    style={{ float: "right", backgroundColor: "#f4f4f4" }}
                    className='lead'
                    onClick={(e) => {
                      if (body.length === 1) {
                        body.splice(0, 1);
                      } else {
                        body.splice(i, 1);
                      }

                      onChangeArticle(i, e, result);
                    }}>
                    <a>X</a>
                  </span>
                  <label>Section Heading </label>
                  <br />
                  <input
                    type='text'
                    name='pHeading'
                    value={result.pHeading}
                    onChange={(e) => {
                      onChangeArticle(i, e);
                    }}
                  />
                </div>
                <div>
                  <label>Section Body </label>
                  <br />
                  <textarea
                    name='pBody'
                    value={result.pBody}
                    onChange={(e) => onChangeArticle(i, e)}
                  />
                </div>
                <div>
                  <label>Backlink URL: </label>
                  <br />
                  <input
                    type='text'
                    name='backlink'
                    value={result.backlink}
                    onChange={(e) => onChangeArticle(i, e)}
                  />
                </div>
                <div>
                  <label>Backlink Text: </label>
                  <br />
                  <input
                    type='text'
                    name='backlinkText'
                    value={result.backlinkText}
                    onChange={(e) => onChangeArticle(i, e)}
                  />
                </div>

                <div>
                  <label>Video: </label>
                  <br />
                  <input
                    type='text'
                    name='video'
                    value={result.video}
                    onChange={(e) => onChangeArticle(i, e)}
                  />
                </div>
                <label htmlFor='images'>Section Image</label>
                <input
                  type='text'
                  name='img'
                  value={result.img}
                  onChange={(e) => onChangeArticle(i, e)}
                  disabled
                />
                <label htmlFor='images'>Upload Section Image Here</label>
                <input
                  type='file'
                  name='img'
                  onChange={(e) => {
                    onChangeArticleFile(i, e);
                    setFile([...file, e.target.files[0]]);
                  }}
                  style={{ width: "200px" }}
                />
              </div>
            ))}
          </div>
        </div>
        <br />
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value={current !== null ? "Update Article" : "Add Article"}
        />
        <br />
      </form>
    </div>
  );
};

export default ArticleForm;
