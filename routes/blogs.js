const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Blog = require("../models/Blog");
const { check, validationResult } = require("express-validator");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");
const db = config.get("mongoURI");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = new GridFsStorage({
  url: db,
  options: { useUnifiedTopology: true },
  file: (req, file, i) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = req.files[req.files.length - 1].fieldname;
        const fileInfo = {
          filename: filename,
          bucketName: "fs", //collection name
        };

        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.get("/", auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ "user": req.query.q });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    upload.any(),
    [check("p5", "blog entry needs 5 paragraphs").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      date,
      author,
      firm,
      adPreference,
      vertical,
      p1,
      p2,
      p3,
      p4,
      p5,
      user,
      img1,
      img2,
      img3,
    } = req.body;

    try {
      const newBlog = new Blog({
        title,
        date,
        author,
        p1,
        firm,
        user,
        adPreference,
        vertical,
        p2,
        p3,
        p4,
        p5,
        img1,
        img2,
        img3,
      });

      const blog = await newBlog.save();

      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", upload.any(), auth, async (req, res) => {
  const {
    title,
    date,
    author,
    p1,
    firm,
    adPreference,
    p2,
    p3,
    vertical,
    p4,
    p5,
    img1,
    img2,
    img3,
  } = req.body;

  // Build blog object
  const blogFields = {};
  if (title) blogFields.title = title;
  if (date) blogFields.date = date;
  if (author) blogFields.author = author;
  if (firm) blogFields.firm = firm;
  if (adPreference) blogFields.adPreference = adPreference;
  if (p1) blogFields.p1 = p1;
  if (p2) blogFields.p2 = p2;
  if (p3) blogFields.p3 = p3;
  if (p4) blogFields.p4 = p4;
  if (p5) blogFields.p5 = p5;
  if (img1) blogFields.img1 = img1;
  if (img2) blogFields.img2 = img2;
  if (img3) blogFields.img3 = img3;
  if (vertical) blogFields.vertical = vertical;

  try {
    let blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: "blog not found" });

    await Blog.findByIdAndRemove(req.params.id);

    res.json({ msg: "blog removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
