const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
 },
 formName: { type: String },
 name: { type: String },
 parentObj: { type: String },
 parentState: { type: String },
 parentKey: { type: String },
 checkedValue: { type: String },
 isBool: { type: String },
 onChange: { type: String },
 options: [
  {
   value: { type: String },
   display: { type: String },
  },
 ],
 type: { type: String },
 label: { type: String },
 legend: { type: String },
 step: { type: Number },
 n: { type: Number },
 rangeMin: { type: Number },
 rangeMax: { type: Number },
 displayDate: { type: Number },
});

module.exports = mongoose.model("forms", formSchema);
