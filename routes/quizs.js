const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Quiz = require("../models/Quiz");
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
     metadata: { accountId: req.body.user },
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
  const quizs = await Quiz.find({ "user": req.query.q });
  res.json(quizs);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/:id", auth, async (req, res) => {
 try {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post(
 "/",
 [auth, upload.any(), [check("title", "Quiz Needs A Title").not().isEmpty()]],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }

  const {
   title,
   date,
   author,
   headingCopy,
   footerCopy,
   img1,
   img2,
   user,
   body,
   adPreference,
   results,
   vertical,
   firm,
   type,
   launchCopy,
  } = req.body;

  try {
   const newQuiz = new Quiz({
    title,
    date,
    author,
    headingCopy,
    footerCopy,
    img1,
    user,
    adPreference,
    img2,
    body,
    results,
    vertical,
    firm,
    type,
    launchCopy,
   });

   const quiz = await newQuiz.save();

   res.json(quiz);

   console.log(quiz);
  } catch (err) {
   console.error(err.message);
   res.status(500).send("Server Error");
  }
 }
);

router.put("/:id", upload.any(), auth, async (req, res) => {
 const {
  title,
  adPreference,
  date,
  author,
  headingCopy,
  footerCopy,
  img1,
  img2,
  body,
  results,
  vertical,
  firm,
  type,
  launchCopy,
 } = req.body;

 // Build quiz object
 const quizFields = {};
 if (launchCopy) quizFields.launchCopy = launchCopy;
 if (title) quizFields.title = title;
 if (date) quizFields.date = date;
 if (author) quizFields.author = author;
 if (headingCopy) quizFields.headingCopy = headingCopy;
 if (footerCopy) quizFields.footerCopy = footerCopy;
 if (body) quizFields.body = body;
 if (results) quizFields.results = results;
 if (firm) quizFields.firm = firm;
 if (type) quizFields.type = type;
 if (img1) quizFields.img1 = img1;
 if (adPreference) quizFields.adPreference = adPreference;
 if (img2) quizFields.img2 = img2;
 if (vertical) quizFields.vertical = vertical;

 try {
  let quiz = await Quiz.findByIdAndUpdate(
   req.params.id,
   { $set: quizFields },
   { new: true }
  );

  res.json(quiz);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.delete("/:id", auth, async (req, res) => {
 try {
  let quiz = await Quiz.findById(req.params.id);

  if (!quiz) return res.status(404).json({ msg: "quiz not found" });

  await Quiz.findByIdAndRemove(req.params.id);

  res.json({ msg: "quiz removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;
