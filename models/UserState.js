const mongoose = require("mongoose");

const UserStateSchema = mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
 },
 userState: {
  type: Object,
 },
 vals: [
  {
   key: { type: String },
   val: { type: String },
  },
 ],
});

module.exports = mongoose.model("userState", UserStateSchema);
