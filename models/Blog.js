const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: String,
  },
  adPreference: {
    type: String,
  },
  p1: {
    type: String,
  },
  p2: {
    type: String,
  },
  p3: {
    type: String,
  },
  p4: {
    type: String,
  },
  p5: {
    type: String,
  },
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
  img3: {
    type: String,
  },
  pageStyle: {
    type: String,
  },
});

module.exports = mongoose.model("blog", BlogSchema);
