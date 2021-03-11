const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Article = require("../models/Article");
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
        console.log(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.get("/", auth, async (req, res) => {
  try {
    const articles = await Article.find({ "user": req.query.q });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
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
    [check("title", "No Article Submitted").not().isEmpty()],
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
      user,
      body,
      vertical,
      verticalName,
      img1,
      firm,
      adPreference,
    } = req.body;

    try {
      const newArticle = new Article({
        title,
        date,
        user,
        author,
        verticalName,
        img1,
        firm,
        adPreference,
        body,
        vertical,
      });

      const article = await newArticle.save();

      res.json(article);
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
    body,
    firm,
    adPreference,
    vertical,
    verticalName,
    img1,
  } = req.body;

  // Build article object
  const articleFields = {};
  if (title) articleFields.title = title;
  if (date) articleFields.date = date;
  if (img1) articleFields.img1 = img1;
  if (verticalName) articleFields.verticalName = verticalName;
  if (author) articleFields.author = author;
  if (firm) articleFields.firm = firm;
  if (adPreference) articleFields.adPreference = adPreference;
  if (body) articleFields.body = body;
  if (vertical) articleFields.vertical = vertical;
  try {
    let article = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: articleFields },
      { new: true }
    );

    res.json(article);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ msg: "article not found" });

    await Article.findByIdAndRemove(req.params.id);

    res.json({ msg: "article removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
