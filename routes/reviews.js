const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Review = require("../models/Review");
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
  const reviews = await Review.find({ "user": req.query.q });
  res.json(reviews);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/:id", auth, async (req, res) => {
 try {
  const review = await Review.findById(req.params.id);
  res.json(review);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post(
 "/",
 [auth, upload.any(), [check("vertical", "No Vertical").not().isEmpty()]],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }

  const {
   verticalName,
   summary,
   date,
   body,
   title,
   categories,
   user,
   firms,
   firm,
   vertical,
   img1,
   adPreference,
   img2,
  } = req.body;

  try {
   const newReview = new Review({
    verticalName,
    summary,
    title,
    vertical,
    user,
    date,
    adPreference,
    body,
    categories,
    firm,
    firms,
    img1,
    img2,
   });

   const review = await newReview.save();

   res.json(review);

   console.log(review);
  } catch (err) {
   console.error(err.message);
   res.status(500).send("Server Error");
  }
 }
);

router.put("/:id", upload.any(), auth, async (req, res) => {
 const {
  verticalName,
  summary,
  date,
  title,
  reviewBody,
  vertical,
  firm,
  adPreference,
  img1,
  img2,
  img3,
 } = req.body;

 // Build review object
 const reviewFields = {};
 if (verticalName) reviewFields.verticalName = verticalName;
 if (date) reviewFields.date = date;
 if (summary) reviewFields.summary = summary;
 if (reviewBody) reviewFields.reviewBody = reviewBody;
 if (firm) reviewFields.firm = firm;
 if (adPreference) reviewFields.adPreference = adPreference;
 if (vertical) reviewFields.vertical = vertical;
 if (date) reviewFields.date = date;
 if (title) reviewFields.title = title;
 if (img1) reviewFields.img1 = img1;
 if (img2) reviewFields.img2 = img2;
 if (img3) reviewFields.img3 = img3;

 try {
  let review = await Review.findByIdAndUpdate(
   req.params.id,
   { $set: reviewFields },
   { new: true }
  );

  res.json(review);
 } catch (err) {
  console.error(er.message);
  res.status(500).send("Server Error");
 }
});

router.delete("/:id", auth, async (req, res) => {
 try {
  let review = await Review.findById(req.params.id);

  if (!review) return res.status(404).json({ msg: "review not found" });

  await Review.findByIdAndRemove(req.params.id);

  res.json({ msg: "review removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;
