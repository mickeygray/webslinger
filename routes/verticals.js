const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Vertical = require("../models/Vertical");
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
   });
  });
 },
});

const upload = multer({ storage });

router.get("/", auth, async (req, res) => {
 try {
  const verticals = await Vertical.find({ "user": req.query.q });
  res.json(verticals);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/:id", auth, async (req, res) => {
 try {
  console.log(req.params);
  const vertical = await Vertical.findById(req.params.id);
  res.json(vertical);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post("/", auth, upload.any(), async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }

 const {
  name,
  descrip1,
  qna,
  vLogTitle,
  user,
  vLogSummary,
  navText,
  vids,
  img1,
  img2,
  img3,
  vertical,
 } = req.body;

 try {
  const newVertical = new Vertical({
   name,
   descrip1,
   qna,
   vLogTitle,
   vLogSummary,
   user,
   navText,
   vids,
   img1,
   img2,
   img3,
   vertical,
  });

  const vertical1 = await newVertical.save();

  res.json(vertical1);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.put("/:id", upload.any(), auth, async (req, res) => {
 const {
  name,
  descrip1,
  qna,
  vLogTitle,
  vLogSummary,
  navText,

  vids,
  img1,
  img2,
  img3,
  vertical,
 } = req.body;

 // Build vertical object
 const verticalFields = {};
 if (name) verticalFields.name = name;
 if (descrip1) verticalFields.descrip1 = descrip1;
 if (qna) verticalFields.qna = qna;
 if (vLogTitle) verticalFields.vLogTitle = vLogTitle;
 if (navText) verticalFields.navText = navText;
 if (vLogSummary) verticalFields.vLogSummary = vLogSummary;
 if (vids) verticalFields.vids = vids;
 if (img1) verticalFields.img1 = img1;
 if (img2) verticalFields.img2 = img2;
 if (img3) verticalFields.img3 = img3;
 if (vertical) verticalFields.vertical = vertical;

 try {
  let vertical = await Vertical.findByIdAndUpdate(
   req.params.id,
   { $set: verticalFields },
   { new: true }
  );

  res.json(vertical);
 } catch (err) {
  console.error(er.message);
  res.status(500).send("Server Error");
 }
});

router.delete("/:id", auth, async (req, res) => {
 try {
  let vertical = await Vertical.findById(req.params.id);

  if (!vertical) return res.status(404).json({ msg: "vertical not found" });

  await Vertical.findByIdAndRemove(req.params.id);

  res.json({ msg: "vertical removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;
