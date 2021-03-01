const mongoose = require("mongoose");
const PageSchema = mongoose.Schema({
  title: {
    type: String,
  },
  imports: [
    {
      package: "",
      path: "",
    },
  ],
  props: [{ name: "", value: "" }],
  scripts: [{ functionCallBack: "", function: "" }],
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: "Component" }],
});

module.exports = mongoose.model("page", PageSchema);
