const mongoose = require("mongoose");

const FirmSchema = mongoose.Schema({
  name: {
    type: String,
  },
  website: {
    type: String,
  },
  vertical: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  cpa: {
    type: String,
  },
  cpapic: {
    type: String,
  },
  cpabio: {
    type: String,
  },
  stars: {
    type: Number,
  },
  types: {
    type: String,
  },
  states: [String],
  fees: {
    type: String,
  },
  avgsavings: {
    type: String,
  },
  minimum: {
    type: String,
  },
  years: {
    type: String,
  },
  bbb: {
    type: String,
  },
  cost: {
    type: String,
  },
  address: {
    type: String,
  },
  logo: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  services: [
    {
      serviceType: {
        type: String,
      },
      service: {
        type: String,
      },
      img: {
        type: String,
      },
      summary: {
        type: String,
      },
      cost: {
        type: String,
      },
    },
  ],
  pros: [String],
  cons: [String],
  reviews: [
    {
      reviewer: {
        type: String,
      },
      date: {
        type: String,
      },
      review: {
        type: String,
      },
      pic: {
        type: String,
      },
    },
  ],
  pageStyle: {
    type: String,
  },
});

module.exports = mongoose.model("firm", FirmSchema);
