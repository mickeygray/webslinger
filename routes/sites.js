const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Site = require("../models/Site");
const Page = require("../models/Page");
const Quiz = require("../models/Quiz");
const Article = require("../models/Article");
const Blog = require("../models/Blog");
const Review = require("../models/Review");
const Firm = require("../models/Firm");
const Form = require("../models/Form");
const UserState = require("../models/UserState");
const Vertical = require("../models/Vertical");
const Component = require("../models/Component");
const { check, validationResult } = require("express-validator");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");
const db = config.get("mongoURI");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const e = require("express");

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

router.get("/content", auth, async (req, res) => {
 const stuff = JSON.parse(req.query.q);

 const { content, userid } = stuff;
 const cont = content;

 console.log(stuff, "stuff");
 const contentKeys = cont
  .map(({ contentId }) => contentId)
  .filter((value, index, self) => self.indexOf(value) === index);

 try {
  const firms = await Firm.find({ "user": userid });
  const blogs = await Blog.find({ "user": userid });
  const articles = await Article.find({ "user": userid });
  const quizs = await Quiz.find({ "user": userid });
  const reviews = await Review.find({ "user": userid });
  const verticals = await Vertical.find({ "user": userid });

  const firmkeys = cont
   .filter((k) => k.type === "firm")
   .map(({ key, content }) => {
    if (key.includes(".")) {
     let objkey = key.substr(key.indexOf(".") + 1, key.length);

     let obj = { [objkey]: content };

     let arrName = key.substr(0, key.indexOf("."));

     let pushedObj = [arrName, [{ ...obj }]];

     return pushedObj;
    } else {
     let obj = [key, content];
     return obj;
    }
   });

  const quizkeys = cont
   .filter((k) => k.type === "quizs")
   .map(({ key, content }) => {
    if (key.includes(".")) {
     let objkey = key.substr(key.indexOf(".") + 1, key.length);

     let obj = { [objkey]: content };

     let arrName = key.substr(0, key.indexOf("."));

     let pushedObj = [arrName, [{ ...obj }]];

     return pushedObj;
    } else {
     let obj = [key, content];
     return obj;
    }
   });

  const reviewkeys = cont
   .filter((k) => k.type === "reviews")
   .map(({ key, content }) => {
    if (key.includes(".")) {
     let objkey = key.substr(key.indexOf(".") + 1, key.length);

     let obj = { [objkey]: content };

     let arrName = key.substr(0, key.indexOf("."));

     let pushedObj = [arrName, [{ ...obj }]];

     return pushedObj;
    } else {
     let obj = [key, content];
     return obj;
    }
   });

  const verticalkeys = cont
   .filter((k) => k.type === "verticals")
   .map(({ key, content }) => {
    console.log(key, "key");
    if (key.includes(".")) {
     let objkey = key.substr(key.indexOf(".") + 1, key.length);

     let obj = { [objkey]: content };

     let arrName = key.substr(0, key.indexOf("."));

     let pushedObj = [arrName, [{ ...obj }]];

     return pushedObj;
    } else {
     console.log(key, "hello");

     console.log(content, "hhel?");
     let obj = [key, content];
     return obj;
    }
   });

  console.log(verticalkeys, "verticalKeys");
  const articlekeys = cont
   .filter((k) => k.type === "articles")
   .map(({ key, content }) => {
    if (key.includes(".")) {
     let objkey = key.substr(key.indexOf(".") + 1, key.length);

     let obj = { [objkey]: content };

     let arrName = key.substr(0, key.indexOf("."));

     let pushedObj = [arrName, [{ ...obj }]];

     return pushedObj;
    } else {
     let obj = [key, content];
     return obj;
    }
   });

  const blogkeys = cont
   .filter((k) => k.type === "blogs")
   .map(({ key, content }) => {
    if (key.includes(".")) {
     let objkey = key.substr(key.indexOf(".") + 1, key.length);

     let obj = { [objkey]: content };

     let arrName = key.substr(0, key.indexOf("."));

     let pushedObj = [arrName, [{ ...obj }]];

     return pushedObj;
    } else {
     let obj = [key, content];
     return obj;
    }
   });

  const blogObj = Object.fromEntries(blogkeys);
  const reviewObj = Object.fromEntries(reviewkeys);

  const articleObj = Object.fromEntries(articlekeys);
  const quizObj = Object.fromEntries(quizkeys);

  const firmObj = Object.fromEntries(firmkeys);
  const verticalObj = Object.fromEntries(verticalkeys);

  const everyOtherBlog = blogs.map(({ _doc }) => {
   const keys = Object.keys(_doc).filter((k) =>
    Object.keys(blogObj).includes(k)
   );

   const entryObj = Object.fromEntries(keys.map((k) => [k, _doc[k]]));

   return entryObj;
  });

  const everyOtherReview = reviews.map(({ _doc }) => {
   const keys = Object.keys(_doc).filter((k) =>
    Object.keys(reviewObj).includes(k)
   );

   const entryObj = Object.fromEntries(keys.map((k) => [k, _doc[k]]));

   return entryObj;
  });

  const everyOtherArticle = articles.map(({ _doc }) => {
   const keys = Object.keys(_doc).filter((k) =>
    Object.keys(articleObj).includes(k)
   );

   const entryObj = Object.fromEntries(keys.map((k) => [k, _doc[k]]));

   return entryObj;
  });

  const everyOtherFirm = firms.map(({ _doc }) => {
   const keys = Object.keys(_doc).filter((k) =>
    Object.keys(firmObj).includes(k)
   );

   const entryObj = Object.fromEntries(keys.map((k) => [k, _doc[k]]));

   return entryObj;
  });

  const everyOtherVertical = verticals.map(({ _doc }) => {
   const keys = Object.keys(_doc).filter((k) =>
    Object.keys(verticalObj).includes(k)
   );

   const entryObj = Object.fromEntries(keys.map((k) => [k, _doc[k]]));

   return entryObj;
  });

  const everyOtherQuiz = quizs.map(({ _doc }) => {
   const keys = Object.keys(_doc).filter((k) =>
    Object.keys(quizObj).includes(k)
   );

   const entryObj = Object.fromEntries(keys.map((k) => [k, _doc[k]]));

   return entryObj;
  });

  const mappedContent = [
   everyOtherArticle || null,
   everyOtherBlog || null,
   everyOtherFirm || null,
   everyOtherQuiz || null,
   everyOtherReview || null,
   everyOtherVertical || null,
  ]
   .flat()
   .filter((k) => Object.keys(k).length > 0);

  console.log(mappedContent);

  res.json(mappedContent);
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
  const site = await Site.findById(req.params.id);
  res.json(site);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/pages/:id", auth, async (req, res) => {
 try {
  const page = await Page.findById(req.params.id);
  res.json(page);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});
router.get("/components/:id", auth, async (req, res) => {
 try {
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

router.post("/userState", auth, upload.any(), async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }

 const { userState, userId, vals } = req.body;

 const mappedVals = vals.map(({ key, valLenth, n }, i) => {
  const oneChar = "A";
  const shortWord = "Lorem";
  const regWord = "Ullamco";
  const longWord = "Voluptatem";
  const nNumber = n === 1 ? 1 : 10 ** n - 1;
  const nWords = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
   .split(" ")
   .slice(0, n)
   .toString();
  const oneSentence =
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const oneParagraph =
   "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? \r\n";
  const nParagraphs = [];

  for (var i = 0; i < n; i++) {
   nParagraphs.push(oneParagraph);
  }

  let obj = {};

  if (valLength === "oneChar") {
   obj = {
    key,
    value: oneChar,
   };
  } else if (valLength === "shortWord") {
   obj = {
    key,
    value: shortWord,
   };
  } else if (valLength === "regWord") {
   obj = {
    key,
    value: regWord,
   };
  } else if (valLength === "longWord") {
   obj = {
    key,
    value: longWord,
   };
  } else if (valLength === "nNumber") {
   obj = {
    key,
    value: nNumber,
   };
  } else if (valLength === "nWords") {
   obj = {
    key,
    value: nWords,
   };
  } else if (valLength === "sentence") {
   obj = {
    key,
    value: sentence,
   };
  } else if (valLength === "paragraph") {
   obj = {
    key,
    value: paragraph,
   };
  } else if (valLength === "nParagraphs") {
   obj = {
    key,
    value: nParagraphs,
   };
  }
  return obj;
 });

 try {
  const newState = new UserState({
   userState,
   userId,
   mappedVals,
  });

  const state = await newState.save();

  console.log(state);
  res.json(state);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/forms", auth, async (req, res) => {
 try {
  const forms = await Form.find({ "user": req.query.q });
  res.json(forms);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.post("/forms", auth, upload.any(), async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }

 const {
  formName,
  name,
  parentObj,
  checkedValue,
  isBool,
  onChange,
  options,
  type,
  label,
  legend,
  n,
  rangeMin,
  rangeMax,
  step,
 } = req.body;

 try {
  const newForm = new Form({
   formName,
   name,
   parentObj,
   checkedValue,
   isBool,
   onChange,
   options,
   type,
   label,
   legend,
   n,
   rangeMin,
   rangeMax,
   step,
  });

  const form = await newForm.save();

  res.json(form);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.get("/forms/:id", auth, async (req, res) => {
 try {
  const forms = await Form.find({ "user": req.query.q });
  res.json(forms);
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

router.put("/forms/:id", upload.any(), auth, async (req, res) => {
 const {
  formName,
  name,
  parentObj,
  checkedValue,
  isBool,
  onChange,
  options,
  type,
  label,
  legend,
  n,
  rangeMin,
  rangeMax,
  step,
 } = req.body;

 // Build site object
 const siteFields = {};
 if (formName) siteFields.name = formName;
 if (name) siteFields.name = name;
 if (parentObj) siteFields.parentObj = parentObj;
 if (type) siteFields.type = type;
 if (checkedValue) siteFields.checkedValue = checkedValue;
 if (isBool) siteFields.isBool = isBool;
 if (onChange) siteFields.onChange = onChange;
 if (options) siteFields.optionss = options;
 if (label) siteFields.label = label;
 if (legend) siteFields.legend = legend;
 if (n) siteFields.n = n;
 if (rangeMin) siteFields.rangeMin = rangeMin;
 if (rangeMax) siteFields.rangeMax = rangeMax;
 if (step) siteFields.step = step;

 try {
  let site = await Form.findByIdAndUpdate(
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

router.delete("/forms/:id", auth, async (req, res) => {
 try {
  let site = await Form.findById(req.params.id);

  if (!site) return res.status(404).json({ msg: "site not found" });

  await Form.findByIdAndRemove(req.params.id);

  res.json({ msg: "site removed" });
 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error");
 }
});

module.exports = router;

router.post("/components", auth, async (req, res) => {
 const {
  name,
  area,
  user,
  html,
  userState,
  content,
  h,
  icon,
  img,
  vid,
  a,
  p,
  button,
  li,
  component,
 } = req.body;

 try {
  const newComponent = new Component({
   name,
   user,
   area,
   html,
   h,
   icon,
   img,
   vid,
   a,
   p,
   button,
   li,
   component,
   userState,
   content,
  });

  const componenta = await newComponent.save();

  res.json(componenta);
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
  $or: [{ name: regex }, { address: regex }, { lexId: regex }, { ssn: regex }],
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

 const { startDate, endDate } = reqbody;

 const momentPeriodStart = new Date(startDate);
 const momentPeriodEnd = new Date(endDate);

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

 const { startDate, endDate } = reqbody;

 const momentPeriodStart = new Date(startDate);
 const momentPeriodEnd = new Date(endDate);

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

 const { startDate, endDate } = reqbody;

 const momentPeriodStart = new Date(startDate);
 const momentPeriodEnd = new Date(endDate);

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

 const { startDate, endDate } = reqbody;

 const momentPeriodStart = new Date(startDate);
 const momentPeriodEnd = new Date(endDate);

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
