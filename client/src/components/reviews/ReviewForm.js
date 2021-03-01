import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ReviewContext from "../../context/review/reviewContext";

const ReviewForm = ({ setForm }) => {
  const reviewContext = useContext(ReviewContext);
  const { current, putReview, postReview, clearCurrentReview } = reviewContext;
  const [rev, setRev] = useState({
    verticalName: "",
    summary: "",
    date: "",
    title: "",
    adPreference: "",
    firm: "",
    author: "",
    vertical: "",
    img1: "",
    img2: "",
  });

  const empty = {
    category: "",
    company: "",
    logo: "",
    stars: 0,
    review: "",
  };

  const [showState, setShowState] = useState(false);
  const category = {
    category: "",
    categoryDescription: "",
  };
  const [body, setBody] = useState([{ ...empty }]);

  const [categories, setCatagories] = useState([{ ...category }]);
  const addCategory = () => {
    const newResults = [...categories, { ...category }];
    setCatagories(newResults);
  };
  const onChangeReview = (i, e) => {
    const { value, name } = e.currentTarget;
    const newResults = [...body];
    newResults[i] = {
      ...newResults[i],
      [name]: value,
    };
    setBody(newResults);
  };

  const onChangeCategory = (i, e) => {
    const { value, name } = e.currentTarget;
    const newResults = [...categories];
    newResults[i] = {
      ...newResults[i],
      [name]: value,
    };
    setCatagories(newResults);
  };

  const onChangeFirm = (i, e) => {
    const { value, name } = e.currentTarget;
    const newResults = [...firms];
    newResults[i] = {
      ...newResults[i],
      [name]: value,
    };
    setFirms(newResults);
  };

  const addReviewBody = () => {
    const newResults = [...body, { ...empty }];
    setBody(newResults);
  };

  useEffect(() => {
    if (current != null) {
      setRev({
        verticalName: current.verticalName,
        summary: current.summary,
        adPreference: current.adPreference,
        date: current.date,
        title: current.title,
        vertical: current.vertical,
        firm: current.firm,
        img1: current.img1,
        img2: current.img2,
      });

      setBody(current.body);
      setFirms(current.firms);
      setCatagories(current.categories);
    } else {
      setRev({
        verticalName: "",
        summary: "",
        date: "",
        reviewName: "",
        author: "",
        firm: "",
        adPreference: "",
        vertical: "",
        img1: "",
        img2: "",
      });
      setBody([{ ...empty }]);
    }
  }, [current, reviewContext]);

  const onChange = (e) => {
    setRev({ ...rev, [e.target.name]: e.target.value });
  };

  const {
    adPreference,
    verticalName,
    title,
    firm,
    summary,
    vertical,
    img1,
    img2,
  } = rev;

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

    createFormData(formData, "categories", categories);
    createFormData(formData, "body", body);
    createFormData(formData, "firms", firms);
    formData.append("verticalName", verticalName);
    formData.append("title", title);

    formData.append("summary", summary);
    formData.append("vertical", vertical);
    formData.append(
      filebody[0] ? `${filebody[0].name}` : "",
      filebody[0] ? filebody[0] : ""
    );
    formData.append(
      filebody[1] ? `${filebody[1].name}` : "",
      filebody[1] ? filebody[1] : ""
    );
    formData.append("img1", filebody[0] ? `${filebody[0].name}` : current.img1);
    formData.append("img2", filebody[1] ? `${filebody[1].name}` : current.img2);

    if (current !== null) {
      putReview(formData, current._id);
    } else {
      postReview(formData);
    }
    clearCurrentReview();
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

  const comp = {
    company: "",
    logo: "",
  };
  const [firms, setFirms] = useState([
    {
      ...comp,
    },
  ]);

  useEffect(() => {
    if (!current && body.length > 0) {
      setFirms(
        body

          .filter(
            (v, i, a) => a.findIndex((t) => t.company === v.company) === i
          )
          .map(({ company }) => {
            let obj = {
              company: company,
              logo: "",
            };
            return obj;
          })
      );
    }
  }, [body.length, setFirms]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='bg-light grid-2'>
          <div className='card'>
            <label htmlFor='name'>Vertical Title</label>
            <input
              type='text'
              onChange={onChange}
              name='verticalName'
              value={verticalName}
            />
            <label htmlFor='name'>Vertical</label>
            <input
              type='text'
              onChange={onChange}
              name='vertical'
              value={vertical}
            />
            <label htmlFor='name'>Firm</label>
            <input type='text' onChange={onChange} name='firm' value={firm} />
          </div>
          <div className='card'>
            {" "}
            <label htmlFor='name'>Review Summary</label>
            <textarea name='summary' value={summary} onChange={onChange} />
            <label htmlFor='name'>Review Title</label>
            <input type='text' onChange={onChange} name='title' value={title} />
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
          <label htmlFor='name'>Review Categories </label>
          <div className='grid-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => addCategory()}>
              Add Review Category
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => setShowState((prevState) => !prevState)}>
              {showState ? "Hide Review Categories" : "Show Review Categorys"}
            </button>
          </div>
          {showState ? (
            <div className='grid-2'>
              {categories.map((category, i) => (
                <div key={i} className='card'>
                  <div>
                    <label>Category: </label>
                    <br />
                    <input
                      type='text'
                      name='category'
                      value={category.category}
                      onChange={(e) => onChangeCategory(i, e)}
                    />
                    <textarea
                      name='categoryDescription'
                      placeholder='Category Description'
                      value={category.categoryDescription}
                      onChange={(e) => onChangeCategory(i, e)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <label htmlFor='vids'>Review Body</label>
        <div className='grid-4 bg-light'>
          {body.map((result, i) => (
            <div className='card bg-secondary' key={i}>
              <div>
                <label>Category: </label>
                <br />
                <select name='category' onChange={(e) => onChangeReview(i, e)}>
                  {categories.map((category, i) => (
                    <option
                      value={
                        result.category ? result.category : category.category
                      }
                      key={i}>
                      {category.category ? category.category : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Company: </label>
                <br />
                <input
                  type='text'
                  name='company'
                  value={result.company}
                  onChange={(e) => {
                    onChangeReview(i, e);
                    onChangeFirm(i, e);
                  }}
                />
              </div>
              <div>
                <label>Review: </label>
                <br />
                <textarea
                  name='review'
                  value={result.review}
                  onChange={(e) => onChangeReview(i, e)}
                />
              </div>
              <div>
                <label>Stars: </label>
                <br />
                <input
                  type='text'
                  name='stars'
                  value={result.stars}
                  onChange={(e) => onChangeReview(i, e)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => addReviewBody()}>
          Add Review
        </button>

        <h3>Set Company Logos</h3>

        <div className='grid-4 bg-light'>
          {firms
            ? firms.map((result, i) => (
                <div key={i} className='card bg-primary'>
                  <h3>{result.company}</h3>
                  <label htmlFor='images'>Upload Logo Here</label>
                  <input
                    type='file'
                    name='fs'
                    onChange={(e) => {
                      const { name } = e.target.files[0];
                      const newResults = [...firms];
                      newResults[i] = {
                        ...newResults[i],
                        company: result.company,
                        logo: name,
                      };
                      setFirms(newResults);

                      setFile([...file, e.target.files[0]]);
                    }}
                    style={{ width: "200px" }}
                  />
                  <label htmlFor='images'>Current Logo Set</label>
                  <input type='text' name='logo' value={result.logo} />
                </div>
              ))
            : ""}
        </div>
        <br />
        <div className='bg-light'>
          <label htmlFor='images'>Review Item Image</label>
          <input
            type='text'
            name='img1'
            value={filebody[0] ? filebody[0].name : current && current.img1}
            onChange={onChange}
          />
          <label htmlFor='images'>Main Review Image</label>
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
          <br />
          <input
            type='submit'
            className='btn btn-primary btn-block'
            value={current !== null ? "Update Review" : "Add Review"}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
