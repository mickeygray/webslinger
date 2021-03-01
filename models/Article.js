const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  author: {
    type: String,
  },
  body: [
    {
      pHeading: {
        type: String,
      },
      pBody: {
        type: String,
      },
      img: {
        type: String,
      },
      video: {
        type: String,
      },
      backlink: {
        type: String,
      },
      backlinkText: {
        type: String,
      },
    },
  ],
  vertical: {
    type: String,
  },
  adPreference: {
    type: String,
  },
  firm: {
    type: String,
  },
  pageStyle: {
    type: String,
  },
});

module.exports = mongoose.model("article", ArticleSchema);
