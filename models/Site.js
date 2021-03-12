const mongoose = require("mongoose");
const Firm = require("./Firm");
const Page = require("./Page");

const SiteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  url: {
    type: String,
  },
  siteType: { type: String },
  firm: Firm.schema,
  verticals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vertical" }],
  name: {
    type: String,
  },
  pages: [Page.schema],
  staticAssets: [String],
  metaTags: [
    {
      tag: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("site", SiteSchema);
