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
      score: {
        type: Number,
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
      score: {
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
  vertical: {
    type: String,
  },
  firm: {
    type: String,
  },
  pageStyle: {
    type: String,
  },
});

module.exports = mongoose.model("quiz", QuizSchema);
