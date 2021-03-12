const mongoose = require("mongoose");
const Component = require("./Component");

const PageSchema = mongoose.Schema({
  url: {
    type: String,
  },
  route: { type: String },
  pageType: { type: String },
  name: { type: String },
  firm: { type: mongoose.Schema.Types.ObjectId, ref: "Vertical" },
  verticals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vertical" }],
  areas: {
    head: {
      metaTags: [{ tag: { type: String }, content: { type: String } }],
      title: { type: String },
    },
    nav: {
      logobox: {
        sections: [Component.schema],
      },
      nav1: {
        sections: [Component.schema],
      },
      nav2: {
        sections: [Component.schema],
      },
      sitelinks: {
        sections: [Component.schema],
      },
    },
    header: {
      hero: {
        heroText: {
          sections: [Component.schema],
        },
        heroImage: {
          sections: [Component.schema],
        },
        heroForm: {
          sections: [Component.schema],
        },
      },
    },

    main: {
      rows: [
        {
          left: {
            sections: [Component.schema],
          },
          right: {
            sections: [Component.schema],
          },
          center: {
            sections: [Component.schema],
          },
        },
      ],
    },
    footer: {
      logobox: {
        sections: [Component.schema],
      },
      footer1: {
        sections: [Component.schema],
      },
      footer2: {
        sections: [Component.schema],
      },
      sitelinks: {
        sections: [Component.schema],
      },
    },
  },
});

module.exports = mongoose.model("page", PageSchema);
