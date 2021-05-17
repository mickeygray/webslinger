const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Firm = require("../models/Firm");
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
     bucketName: "fs",
     //collection name
    };

    resolve(fileInfo);
   });
  });
 },
});

const upload = multer({ storage });

router.get("/", auth, async (req, res) => {
 try {
  const firms = await Firm.find({ "user": req.query.q });
  res.json(firms);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/:id", auth, async (req, res) => {
 try {
  const firm = await Firm.findById(req.params.id);
  res.json(firm);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post(
 "/",
 [auth, upload.any(), [check("name", "firm needs name").not().isEmpty()]],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }

  const {
   name,
   website,
   vertical,
   email,
   cpa,
   cpapic,
   cpabio,
   stars,
   socialLinks,
   states,
   phone,
   fees,
   avgsavings,
   minimum,
   years,
   bbb,
   cost,
   user,
   address,
   city,
   state,
   services,
   pros,
   acknowledgements,
   experiences,
   cons,
   reviews,
  } = req.body;

  console.log(services);

  try {
   const newFirm = new Firm({
    name,
    website,
    vertical,
    email,
    cpa,
    cpapic,
    cpabio,
    socialLinks: JSON.parse(socialLinks),
    stars,
    states,
    user,
    fees,
    avgsavings,
    minimum,
    years,
    phone,
    bbb,
    cost,
    address,
    city,
    state,
    acknowledgements: acknowledgements.filter((e) => typeof e !== "string"),
    experiences: experiences.filter((e) => typeof e !== "string"),
    services: services
     .filter((e) => typeof e !== "string")
     .filter((e) => e.serviceType !== ""),
    pros,
    cons,
    reviews: reviews.filter((e) => typeof e !== "string"),
   });

   const firm = await newFirm.save();

   res.json(firm);

   console.log(firm);
  } catch (err) {
   console.error(err.message);
   res.status(500).send("Server Error");
  }
 }
);

router.put("/:id", auth, upload.any(), async (req, res) => {
 const {
  name,
  website,
  vertical,
  email,
  cpa,
  cpapic,
  cpabio,
  phone,
  stars,
  socialLinks,
  states,
  fees,
  avgsavings,
  minimum,
  years,
  bbb,
  cost,
  acknowledgements,
  experiences,
  address,
  city,
  state,
  services,
  pros,
  cons,
  reviews,
 } = req.body;

 const sLinks = JSON.parse(socialLinks);
 // Build firm object
 const firmFields = {};
 if (name) firmFields.name = name;
 if (website) firmFields.website = website;
 if (vertical) firmFields.vertical = vertical;
 if (email) firmFields.email = email;
 if (cpa) firmFields.cpa = cpa;
 if (cpabio) firmFields.cpabio = cpabio;
 if (sLinks) firmFields.socialLinks = sLinks;
 if (cpapic) firmFields.cpapic = cpapic;
 if (stars) firmFields.stars = stars;
 if (states) firmFields.states = states;
 if (fees) firmFields.fees = fees;
 if (avgsavings) firmFields.avgsavings = avgsavings;
 if (minimum) firmFields.minimum = minimum;
 if (years) firmFields.year = years;
 if (cost) firmFields.cost = cost;
 if (address) firmFields.address = address;
 if (city) firmFields.city = city;
 if (state) firmFields.state = state;
 if (phone) firmFields.phone = phone;
 if (bbb) firmFields.bbb = bbb;
 if (services) firmFields.services = services;
 if (pros) firmFields.pros = pros;
 if (cons) firmFields.cons = cons;
 if (reviews) firmFields.reviews = reviews;

 try {
  let firm = await Firm.findByIdAndUpdate(
   req.params.id,
   { $set: firmFields },
   { new: true }
  );

  res.json(firm);
 } catch (err) {
  console.error(er.message);
  res.status(500).send("Server Error");
 }
});

router.delete("/:id", auth, async (req, res) => {
 try {
  let firm = await Firm.findById(req.params.id);

  if (!firm) return res.status(404).json({ msg: "firm not found" });

  await Firm.findByIdAndRemove(req.params.id);

  res.json({ msg: "firm removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;
