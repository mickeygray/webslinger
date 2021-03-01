import React, { useState, useContext, useEffect, useCallback } from "react";
import blogContext from "../../context/blog/blogContext";
import BlogContext from "../../context/blog/blogContext";
import BlogPreviewer from "./BlogPreviewer";

const BlogForm = ({ setForm }) => {
  const blogContext = useContext(BlogContext);
  const { current, putBlog, postBlog, clearCurrentBlog } = blogContext;
  const [blog, setBlog] = useState({
    title: "",
    author: "",
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
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    firm: "",
    adPreference: "",
    img1: "",
    img2: "",
    img3: "",
  });

  useEffect(() => {
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: "",
        author: "",
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
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: "",
        firm: "",
        adPreference: "",
        img1: "",
        img2: "",
        img3: "",
      });
    }
  }, [current, blogContext]);

  const onChange = (e) => setBlog({ ...blog, [e.target.name]: e.target.value });

  const [previewState, setPreviewState] = useState(false);

  const resetPreview = useCallback(() => {
    setPreviewState((prevState) => !prevState);
  }, []);

  const [filebody, setFiles] = useState([]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("adPreference", blog.adPreference);
    formData.append("firm", blog.firm);
    formData.append("vertical", blog.vertical);
    formData.append("author", blog.author);
    formData.append("date", blog.date);
    formData.append("p1", blog.p1);
    formData.append("p2", blog.p2);
    formData.append("p3", blog.p3);
    formData.append("p4", blog.p4);
    formData.append("p5", blog.p5);
    formData.append("img1", `${filebody[0].name}`);
    formData.append("img2", `${filebody[1].name}`);
    formData.append("img3", `${filebody[2].name}`);
    formData.append(`${filebody[0].name}`, filebody[0]);
    formData.append(`${filebody[1].name}`, filebody[1]);
    formData.append(`${filebody[2].name}`, filebody[2]);
    if (current !== null) {
      putBlog(formData, current._id);
    } else {
      postBlog(formData);
    }
    clearCurrentBlog();
    setForm();
  };

  const {
    title,
    author,
    vertical,
    date,
    p1,
    p2,
    p3,
    p4,
    p5,
    firm,
    adPreference,
    img1,
    img2,
    img3,
  } = blog;

  return (
    <div className='bg-light'>
      {previewState ? (
        <BlogPreviewer blog={blog} resetPreview={resetPreview} />
      ) : (
        <form onSubmit={onSubmit}>
          <div className='grid-2'>
            <div className='card'>
              {" "}
              <label htmlFor='name'>Blog Title</label>
              <input
                type='text'
                onChange={onChange}
                name='title'
                value={title}
              />
              <label htmlFor='name'>Blog Author</label>
              <input
                type='text'
                onChange={onChange}
                name='author'
                value={author}
              />
              <label htmlFor='name'>Firm</label>
              <input type='text' onChange={onChange} name='firm' value={firm} />
            </div>
            <div className='card'>
              <label htmlFor='name'>Vertical</label>
              <input
                type='text'
                onChange={onChange}
                name='vertical'
                value={vertical}
              />{" "}
              <label htmlFor='name'>Date</label>
              <input
                type='text'
                onChange={onChange}
                name='date'
                value={
                  current
                    ? current.date
                    : Intl.DateTimeFormat(
                        "fr-CA",
                        {
                          timeZone: "America/Los_Angeles",
                        },
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      ).format(new Date())
                }
              />
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
                  If Associated With A Vertical Will Display Clickable Ad For
                  All Firms In Vertical
                </option>
                <option value='info'>
                  Show Vertical Relative Information As Advertisement Material
                </option>
              </select>
            </div>
          </div>
          <div className='all-center'>
            <label htmlFor='name'>Body Section 1</label>
            <textarea
              style={{ width: "600px", height: "200px" }}
              onChange={onChange}
              name='p1'
              value={p1}
            />
            <label htmlFor='name'>Body Section 2</label>
            <textarea
              style={{ width: "600px", height: "200px" }}
              onChange={onChange}
              name='p2'
              value={p2}
            />
            <label htmlFor='name'>Body Section 3</label>
            <textarea
              style={{ width: "600px", height: "200px" }}
              onChange={onChange}
              name='p3'
              value={p3}
            />
            <label htmlFor='name'>Body Section 4</label>
            <textarea
              style={{ width: "600px", height: "200px" }}
              onChange={onChange}
              name='p4'
              value={p4}
            />
            <label htmlFor='name'>Body Section 5</label>
            <textarea
              style={{ width: "600px", height: "200px" }}
              onChange={onChange}
              name='p5'
              value={p5}
            />
          </div>
          <h5>Image Name Fields</h5>
          <label htmlFor='images'>Blog Item Image</label>
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
          <label htmlFor='images'>Blog Main Image </label>
          <input
            type='text'
            name='img2'
            value={filebody[1] ? filebody[1].name : current && current.img2}
            onChange={onChange}
          />
          <label htmlFor='images'>Blog Secondary Image</label>
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
          <br />
          <input
            type='submit'
            className='btn btn-primary btn-block'
            value={current !== null ? "Update Blog" : "Add Blog"}
          />
          <br />
          <button
            onClick={() => setPreviewState((prevState) => !prevState)}
            className='btn btn-secondary btn-block'>
            Preview Blog
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogForm;
