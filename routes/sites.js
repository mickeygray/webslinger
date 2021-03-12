const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Site = require("../models/Site");
const Page = require("../models/Page");
const Component = require("../models/Component");
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

router.get("/sites", auth, async (req, res) => {
  try {
    const sites = await Site.find({ "user": req.query.q });
    res.json(sites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/components", auth, async (req, res) => {
  try {
    const components = await Component.find({ "user": req.query.q });
    res.json(components);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/pages", auth, async (req, res) => {
  try {
    const pages = await Page.find({ "user": req.query.q });
    res.json(pages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/sites/:id", auth, async (req, res) => {
  try {
    console.log(req.params);
    const site = await Site.findById(req.params.id);
    res.json(site);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/pages/:id", auth, async (req, res) => {
  try {
    console.log(req.params);
    const page = await Page.findById(req.params.id);
    res.json(page);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/components/:id", auth, async (req, res) => {
  try {
    console.log(req.params);
    const component = await Component.findById(req.params.id);
    res.json(component);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/sites", auth, upload.any(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    url,
    type,
    staticAssets,
    pages,
    firm,
    vertical,
    metaTags,
  } = req.body;

  try {
    const newSite = new Site({
      name,
      url,
      type,
      staticAssets,
      pages,
      firm,
      vertical,
      metaTags,
    });

    const site1 = await newSite.save();

    res.json(site1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/pages", auth, upload.any(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, url, route, pageType, firm, verticals, areas } = req.body;

  try {
    const newPage = new Page({
      url,
      name,
      route,
      pageType,
      name,
      firm,
      verticals,
      areas,
    });

    const page1 = await newPage.save();

    res.json(page1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/build", auth, upload.any(), async (req, res) => {
  const {
    name,
    url,
    globalCSS,
    type,
    navbar,
    faq,
    forms,
    logo,
    sitePages,
    pageStyle,
    enforcePageStyle,
    firm,
    vertical,
    aboutPage,
    homePage,
    splashPages,
    metaTags,
  } = req.body;
});

router.post("/", auth, upload.any(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    url,
    globalCSS,
    type,
    navbar,
    faq,
    forms,
    logo,
    sitePages,
    firm,
    vertical,
    aboutPage,
    homePage,
    pageStyle,
    enforcePageStyle,
    splashPages,
    metaTags,
    colors,
  } = req.body;

  try {
    const newSite = new Site({
      name,
      url,
      globalCSS,
      type,
      navbar,
      faq,
      forms,
      logo,
      sitePages,
      firm,
      vertical,
      pageStyle,
      enforcePageStyle,
      aboutPage,
      homePage,
      splashPages,
      metaTags,
      colors,
    });

    const site1 = await newSite.save();

    res.json(site1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/leads", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const leads = await Lead.find({
    $or: [{ name: regex }, { phone: regex }, { email: regex }],
  });

  res.json(leads);
});

router.get("/verticals", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const verticals = await Vertical.find({
    $or: [
      { name: regex },
      { address: regex },
      { lexId: regex },
      { ssn: regex },
    ],
  });

  res.json(verticals);
});

router.get("/firms", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const firms = await Lead.find({
    $or: [{ name: regex }, { vertical: regex }],
  });

  res.json(firms);
});

router.get("/articles", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const articles = await Article.find({
    $or: [
      { title: regex },
      { author: regex },
      { vertical: regex },
      { firm: regex },
    ],
  });

  res.json(articles);
});

router.get("/reviews", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const reviews = await Review.find({
    $or: [
      { title: regex },
      { author: regex },
      { vertical: regex },
      { firm: regex },
    ],
  });

  res.json(reviews);
});

router.get("/quizs", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const quizs = await Blog.find({
    $or: [
      { title: regex },
      { type: regex },
      { vertical: regex },
      { firm: regex },
    ],
  });

  res.json(quizs);
});

router.get("/blogs", auth, async (req, res) => {
  const regex = new RegExp(`${req.query.q}`, "gi");
  const quizs = await Blog.find({
    $or: [
      { title: regex },
      { author: regex },
      { vertical: regex },
      { firm: regex },
    ],
  });

  res.json(blogs);
});

router.get("/articles/latest", auth, async (req, res) => {
  const reqbody = JSON.parse(req.query.q);

  console.log(reqbody);

  const { startDate, endDate } = reqbody;

  const momentPeriodStart = new Date(startDate);
  const momentPeriodEnd = new Date(endDate);

  console.log(momentPeriodStart);

  const articles = await Article.find({
    createDate: {
      $gte: momentPeriodStart,
      $lte: momentPeriodEnd,
    },
  });
  res.json(articles);
});

router.get("/reviews/latest", auth, async (req, res) => {
  const reqbody = JSON.parse(req.query.q);

  console.log(reqbody);

  const { startDate, endDate } = reqbody;

  const momentPeriodStart = new Date(startDate);
  const momentPeriodEnd = new Date(endDate);

  console.log(momentPeriodStart);

  const reviews = await Review.find({
    createDate: {
      $gte: momentPeriodStart,
      $lte: momentPeriodEnd,
    },
  });

  res.json(reviews);
});

router.get("/quizs/latest", auth, async (req, res) => {
  const reqbody = JSON.parse(req.query.q);

  console.log(reqbody);

  const { startDate, endDate } = reqbody;

  const momentPeriodStart = new Date(startDate);
  const momentPeriodEnd = new Date(endDate);

  console.log(momentPeriodStart);

  const quizs = await Quiz.find({
    createDate: {
      $gte: momentPeriodStart,
      $lte: momentPeriodEnd,
    },
  });

  res.json(quizs);
});

router.get("/blogs/latest", auth, async (req, res) => {
  const reqbody = JSON.parse(req.query.q);

  console.log(reqbody);

  const { startDate, endDate } = reqbody;

  const momentPeriodStart = new Date(startDate);
  const momentPeriodEnd = new Date(endDate);

  console.log(momentPeriodStart);

  const blogs = await Blog.find({
    createDate: {
      $gte: momentPeriodStart,
      $lte: momentPeriodEnd,
    },
  });

  res.json(blogs);
});

router.put("/sites/:id", upload.any(), auth, async (req, res) => {
  const {
    name,
    url,
    type,
    staticAssets,
    pages,
    firm,
    verticals,
    metaTags,
  } = req.body;

  // Build site object
  const siteFields = {};
  if (name) siteFields.name = name;
  if (url) siteFields.url = url;
  if (type) siteFields.type = type;
  if (firm) siteFields.firm = firm;
  if (verticals) siteFields.verticals = verticals;
  if (metaTags) siteFields.metaTags = metaTags;
  if (pages) siteFields.pages = pages;
  if (staticAssets) siteFields.staticAssets = staticAssets;

  try {
    let site = await Site.findByIdAndUpdate(
      req.params.id,
      { $set: siteFields },
      { new: true }
    );

    res.json(site);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let site = await Site.findById(req.params.id);

    if (!site) return res.status(404).json({ msg: "site not found" });

    await Site.findByIdAndRemove(req.params.id);

    res.json({ msg: "site removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
