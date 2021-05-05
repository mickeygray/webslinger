const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
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
 type: {
  type: String,
 },
 headingCopy: {
  type: String,
 },
 adPreference: {
  type: String,
 },
 footerCopy: {
  type: String,
 },
 img1: {
  type: String,
 },
 img2: {
  type: String,
 },
 launchCopy: { type: String },
 css: { type: Object },
 body: [
  {
   question: {
    type: String,
   },
   questionType: {
    type: String,
   },
   isLeadCapture: {
    type: String,
   },
   leadCaptureField: {
    type: String,
   },
   copy: {
    type: String,
   },
   img: {
    type: String,
   },
   video: {
    type: String,
   },
   answers: [
    {
     answer: {
      type: String,
     },
     score: {
      type: Number,
     },
    },
   ],
   currentScore: {
    type: Number,
   },
   prevScore: {
    type: Number,
   },
  },
 ],
 results: [
  {
   copy: {
    type: String,
   },
   headline: {
    type: String,
   },
   img: {
    type: String,
   },
   video: {
    type: String,
   },
   score: {
    type: Number,
   },
   link: {
    type: String,
   },
   linkText: {
    type: String,
   },
  },
 ],
 submissions: [
  {
   question: {
    type: String,
   },
   answer: {
    type: String,
   },
   ipAddress: {
    type: String,
   },
   timeStamp: {
    type: String,
   },
  },
 ],
});

module.exports = mongoose.model("quiz", QuizSchema);
