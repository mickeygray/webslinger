const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  verticalName: {
    type: String,
  },
  summary: {
    type: String,
  },
  author: {
    type: String,
  },
  adPreference: {
    type: String,
  },
  date: {
    type: Date,
  },
  title: {
    type: String,
  },
  body: [
    {
      category: {
        type: String,
      },
      company: {
        type: String,
      },
      stars: {
        type: Number,
      },
      review: {
        type: String,
      },
    },
  ],
  categories: [
    {
      category: {
        type: String,
      },
      categoryDescription: {
        type: String,
      },
    },
  ],
  firms: [
    {
      company: {
        type: String,
      },
      logo: {
        type: String,
      },
    },
  ],

  vertical: {
    type: String,
  },
  firm: {
    type: String,
  },
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  pageStyle: {
    type: String,
  },
});

module.exports = mongoose.model("review", ReviewSchema);
