const mongoose = require("mongoose");

const ComponentSchema = mongoose.Schema({
  imports: [
    {
      package: "",
      path: "",
    },
  ],
  scripts: [{ functionCallBack: "", function: "" }],
  props: [{ name: "", value: "" }],
  componentString: { type: String },
});

module.exports = mongoose.model("component", ComponentSchema);
