const mongoose = require("mongoose");
const Page = require("./Page");
const Firm = require("./Vertical");

const SiteSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  colors: {
    primary: { type: String },
    secondary: { type: String },
    light: { type: String },
    dark: { type: String },
    danger: { type: String },
    success: { type: String },
  },

  globalCSS: { type: Object },
  type: {
    type: String,
  },
  navbar: {
    type: {
      type: String,
    },
    navigationTypeFull: {
      type: String,
    },
    navigationTypeMobile: {
      type: String,
    },
    logo: {
      type: String,
    },
  },

  pages: [
    {
      pageStyle: { type: String },
      metaTags: [{ tag: { type: String }, content: { type: String } }],
      enforcePageStyle: { type: String },
      pageType: { type: String },
      title: { type: String },
      formLocation: { type: String },
      navText: { type: String },
      sections: [
        {
          images: [{ name: { type: String }, sectionArea: { type: String } }],
          heading: { type: String },
          copy: [{ text: { type: String }, sectionArea: { type: String } }],
          position: { type: String },
          videos: [{ url: { type: String }, sectionArea: { type: String } }],
        },
      ],
      pageCSS: { type: Object },
      content: {
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
        blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
        articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
        quizs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
      },
      page: Page.schema,
    },
  ],

  faq: [
    {
      question: { type: String },
      answer: { type: String },
    },
  ],
  forms: [
    {
      formType: { type: String },
      page: { type: String },
      emailAddress: { type: String },
    },
  ],

  firm: Firm.schema,
  verticals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vertical" }],
  aboutPage: {
    headline1: { type: String },
    p1: { type: String },
    metaTags: [{ tag: { type: String }, content: { type: String } }],
    headline2: { type: String },
    p2: { type: String },
    img1: { type: String },
    img2: { type: String },
    vid1: { type: String },
    asSeenOn: [{ name: { type: String }, logo: { type: String } }],
    vid2: { type: String },
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    hasGoogleMap: { type: String },
  },
  homePage: {
    heroImg: {
      type: String,
    },
    metaTags: [{ tag: { type: String }, content: { type: String } }],
    heroVid: {
      type: String,
    },
    heroTitle: {
      type: String,
    },
    heroSubtext: {
      type: String,
    },
    pageStyle: { type: String },

    sections: [
      {
        img: { type: String },
        heading: { type: String },
        copy: { type: String },
        video: { type: String },
      },
    ],
    latest: {
      reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
      blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
      articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
      quizs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    },
  },
  splashPages: [
    {
      heroImg: {
        type: String,
      },
      metaTags: [{ tag: { type: String }, content: { type: String } }],
      url: {
        type: String,
      },
      heroVid: {
        type: String,
      },
      heroTitle: {
        type: String,
      },
      heroSubtext: {
        type: String,
      },
      pageStyle: { type: String },
      splashCSS: { type: Object },
      heroPhone: { type: String },

      form: {
        formType: { type: String },
        location: { type: String },
        emailAddress: { type: String },
      },
      featured: {
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
        blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
        articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
        quizs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
      },
    },
  ],
});

module.exports = mongoose.model("site", SiteSchema);
