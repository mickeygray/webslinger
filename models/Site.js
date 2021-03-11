const mongoose = require("mongoose");
const Firm = require("./Vertical");

const SiteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
  },
  pages: [
    {
      url: {
        type: String,
      },
      route: { type: String },
      pageType: { type: String },
      firm: Firm.schema,
      verticals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vertical" }],
      areas: {
        head: {
          metaTags: [{ tag: { type: String }, content: { type: String } }],
          title: { type: String },
        },
        nav: {
          logobox: {
            sections: [
              {
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
          nav1: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
          nav2: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
          sitelinks: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
        },
        header: {
          hero: {
            heroText: {
              sections: [
                {
                  functions: [
                    {
                      component: { type: String },
                      callBack: { type: String },
                      function: { type: String },
                    },
                  ],
                  content: {
                    reviews: [
                      {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Review",
                      },
                    ],
                    blogs: [
                      { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                    ],
                    articles: [
                      {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Article",
                      },
                    ],
                    quizs: [
                      { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                    ],
                  },
                  areaSection: { type: String },
                  img: [
                    {
                      name: { type: String },
                      sectionArea: { type: String },
                      height: { type: Number },
                      width: { type: Number },
                      theme: { type: String },
                    },
                  ],
                  vid: [
                    {
                      url: { type: String },
                      sectionArea: { type: String },
                      height: { type: Number },
                      width: { type: Number },
                      theme: { type: String },
                    },
                  ],
                  h1: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h2: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h3: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h4: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h5: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  p: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  li: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  a: [
                    {
                      linkType: "",
                      text: { type: String },
                      url: { type: String },
                      sectionArea: { type: String },
                    },
                  ],
                  fa: [
                    {
                      faLogo: { type: String },
                      faPosition: { type: String },
                      component: { type: String },
                    },
                  ],
                  components: [
                    {
                      componentName: { type: String },
                      componentEffect: { type: String },
                      theme: { type: String },
                    },
                  ],
                },
              ],
            },
            heroImage: {
              sections: [
                {
                  functions: [
                    {
                      component: { type: String },
                      callBack: { type: String },
                      function: { type: String },
                    },
                  ],
                  content: {
                    reviews: [
                      {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Review",
                      },
                    ],
                    blogs: [
                      { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                    ],
                    articles: [
                      {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Article",
                      },
                    ],
                    quizs: [
                      { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                    ],
                  },
                  areaSection: { type: String },
                  img: [
                    {
                      name: { type: String },
                      sectionArea: { type: String },
                      height: { type: Number },
                      width: { type: Number },
                      theme: { type: String },
                    },
                  ],
                  vid: [
                    {
                      url: { type: String },
                      sectionArea: { type: String },
                      height: { type: Number },
                      width: { type: Number },
                      theme: { type: String },
                    },
                  ],
                  h1: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h2: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h3: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h4: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h5: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  p: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  li: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  a: [
                    {
                      linkType: "",
                      text: { type: String },
                      url: { type: String },
                      sectionArea: { type: String },
                    },
                  ],
                  fa: [
                    {
                      faLogo: { type: String },
                      faPosition: { type: String },
                      component: { type: String },
                    },
                  ],
                  components: [
                    {
                      componentName: { type: String },
                      componentEffect: { type: String },
                      theme: { type: String },
                    },
                  ],
                },
              ],
            },
            heroForm: {
              sections: [
                {
                  functions: [
                    {
                      component: { type: String },
                      callBack: { type: String },
                      function: { type: String },
                    },
                  ],
                  content: {
                    reviews: [
                      {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Review",
                      },
                    ],
                    blogs: [
                      { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                    ],
                    articles: [
                      {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Article",
                      },
                    ],
                    quizs: [
                      { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                    ],
                  },
                  areaSection: { type: String },
                  img: [
                    {
                      name: { type: String },
                      sectionArea: { type: String },
                      height: { type: Number },
                      width: { type: Number },
                      theme: { type: String },
                    },
                  ],
                  vid: [
                    {
                      url: { type: String },
                      sectionArea: { type: String },
                      height: { type: Number },
                      width: { type: Number },
                      theme: { type: String },
                    },
                  ],
                  h1: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h2: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h3: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h4: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  h5: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  p: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  li: [
                    {
                      text: { type: String },
                      sectionArea: { type: String },
                      colorTheme: { type: String },
                      fontTheme: { type: String },
                    },
                  ],
                  a: [
                    {
                      linkType: "",
                      text: { type: String },
                      url: { type: String },
                      sectionArea: { type: String },
                    },
                  ],
                  fa: [
                    {
                      faLogo: { type: String },
                      faPosition: { type: String },
                      component: { type: String },
                    },
                  ],
                  components: [
                    {
                      componentName: { type: String },
                      componentEffect: { type: String },
                      theme: { type: String },
                    },
                  ],
                },
              ],
            },
          },
        },
        main: {
          rows: [
            {
              left: {
                sections: [
                  {
                    functions: [
                      {
                        component: { type: String },
                        callBack: { type: String },
                        function: { type: String },
                      },
                    ],
                    content: {
                      reviews: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Review",
                        },
                      ],
                      blogs: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Blog",
                        },
                      ],
                      articles: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Article",
                        },
                      ],
                      quizs: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Quiz",
                        },
                      ],
                    },
                    areaSection: { type: String },
                    img: [
                      {
                        name: { type: String },
                        sectionArea: { type: String },
                        height: { type: Number },
                        width: { type: Number },
                        theme: { type: String },
                      },
                    ],
                    vid: [
                      {
                        url: { type: String },
                        sectionArea: { type: String },
                        height: { type: Number },
                        width: { type: Number },
                        theme: { type: String },
                      },
                    ],
                    h1: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h2: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h3: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h4: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h5: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    p: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    li: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    a: [
                      {
                        linkType: "",
                        text: { type: String },
                        url: { type: String },
                        sectionArea: { type: String },
                      },
                    ],
                    fa: [
                      {
                        faLogo: { type: String },
                        faPosition: { type: String },
                        component: { type: String },
                      },
                    ],
                    components: [
                      {
                        componentName: { type: String },
                        componentEffect: { type: String },
                        theme: { type: String },
                      },
                    ],
                  },
                ],
              },
              center: {
                sections: [
                  {
                    functions: [
                      {
                        component: { type: String },
                        callBack: { type: String },
                        function: { type: String },
                      },
                    ],
                    content: {
                      reviews: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Review",
                        },
                      ],
                      blogs: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Blog",
                        },
                      ],
                      articles: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Article",
                        },
                      ],
                      quizs: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Quiz",
                        },
                      ],
                    },
                    areaSection: { type: String },
                    img: [
                      {
                        name: { type: String },
                        sectionArea: { type: String },
                        height: { type: Number },
                        width: { type: Number },
                        theme: { type: String },
                      },
                    ],
                    vid: [
                      {
                        url: { type: String },
                        sectionArea: { type: String },
                        height: { type: Number },
                        width: { type: Number },
                        theme: { type: String },
                      },
                    ],
                    h1: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h2: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h3: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h4: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h5: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    p: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    li: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    a: [
                      {
                        linkType: "",
                        text: { type: String },
                        url: { type: String },
                        sectionArea: { type: String },
                      },
                    ],
                    fa: [
                      {
                        faLogo: { type: String },
                        faPosition: { type: String },
                        component: { type: String },
                      },
                    ],
                    components: [
                      {
                        componentName: { type: String },
                        componentEffect: { type: String },
                        theme: { type: String },
                      },
                    ],
                  },
                ],
              },
              right: {
                sections: [
                  {
                    functions: [
                      {
                        component: { type: String },
                        callBack: { type: String },
                        function: { type: String },
                      },
                    ],
                    content: {
                      reviews: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Review",
                        },
                      ],
                      blogs: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Blog",
                        },
                      ],
                      articles: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Article",
                        },
                      ],
                      quizs: [
                        {
                          type: mongoose.Schema.Types.ObjectId,
                          ref: "Quiz",
                        },
                      ],
                    },
                    areaSection: { type: String },
                    img: [
                      {
                        name: { type: String },
                        sectionArea: { type: String },
                        height: { type: Number },
                        width: { type: Number },
                        theme: { type: String },
                      },
                    ],
                    vid: [
                      {
                        url: { type: String },
                        sectionArea: { type: String },
                        height: { type: Number },
                        width: { type: Number },
                        theme: { type: String },
                      },
                    ],
                    h1: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h2: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h3: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h4: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    h5: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    p: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    li: [
                      {
                        text: { type: String },
                        sectionArea: { type: String },
                        colorTheme: { type: String },
                        fontTheme: { type: String },
                      },
                    ],
                    a: [
                      {
                        linkType: "",
                        text: { type: String },
                        url: { type: String },
                        sectionArea: { type: String },
                      },
                    ],
                    fa: [
                      {
                        faLogo: { type: String },
                        faPosition: { type: String },
                        component: { type: String },
                      },
                    ],
                    components: [
                      {
                        componentName: { type: String },
                        componentEffect: { type: String },
                        theme: { type: String },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        footer: {
          logobox: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
          footer1: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
          footer2: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
          sitelinks: {
            sections: [
              {
                functions: [
                  {
                    component: { type: String },
                    callBack: { type: String },
                    function: { type: String },
                  },
                ],
                content: {
                  reviews: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
                  ],
                  blogs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
                  ],
                  articles: [
                    {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "Article",
                    },
                  ],
                  quizs: [
                    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
                  ],
                },
                areaSection: { type: String },
                img: [
                  {
                    name: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                vid: [
                  {
                    url: { type: String },
                    sectionArea: { type: String },
                    height: { type: Number },
                    width: { type: Number },
                    theme: { type: String },
                  },
                ],
                h1: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h2: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h3: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h4: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                h5: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                p: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                li: [
                  {
                    text: { type: String },
                    sectionArea: { type: String },
                    colorTheme: { type: String },
                    fontTheme: { type: String },
                  },
                ],
                a: [
                  {
                    linkType: "",
                    text: { type: String },
                    url: { type: String },
                    sectionArea: { type: String },
                  },
                ],
                fa: [
                  {
                    faLogo: { type: String },
                    faPosition: { type: String },
                    component: { type: String },
                  },
                ],
                components: [
                  {
                    componentName: { type: String },
                    componentEffect: { type: String },
                    theme: { type: String },
                  },
                ],
              },
            ],
          },
        },
      },
    },
  ],
});

module.exports = mongoose.model("site", SiteSchema);
