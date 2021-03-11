const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  author: {
    type: String,
  },
  img1: {
    type: String,
  },
  verticalName: {
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
