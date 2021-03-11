const mongoose = require("mongoose");
const { Schema } = mongoose;

const emailSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  reactstring: String,
  title: String,
  html: String,
  text: String,
  subject: String,
  from: String,
  trackingNumber: String,
  clicks: { type: Number, default: 0 },
  unsubscribes: { type: Number, default: 0 },
  key: String,
});

module.exports = mongoose.model("email", emailSchema);
