const mongoose = require("mongoose");

const VerticalSchema = mongoose.Schema({
  name: {
    type: String,
  },
  descrip1: {
    type: String,
  },
  articleTitle: {
    type: String,
  },
  quizTitle: {
    type: String,
  },
  vLogSummary: {
    type: String,
  },
  navText: {
    type: String,
  },
  vLogTitle: {
    type: String,
  },
  vids: [String],
  vertical: {
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

module.exports = mongoose.model("vertical", VerticalSchema);
