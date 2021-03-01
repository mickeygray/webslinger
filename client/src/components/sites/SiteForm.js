import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SketchPicker } from "react-color";
import SiteContext from "../../context/site/siteContext";
const SiteForm = ({ site }) => {
  const siteContext = useContext(SiteContext);
  const {
    getSites,
    getSite,
    setCurrentSite,
    clearCurrentSite,
    deleteSite,
    postSite,
    putSite,
    previewComponent,
    mountComponent,
    getComponent,
    getComponents,
    getCSSLibrary,
    getSiteLayouts,
    getSiteLayout,
    enforceSiteLayout,
    setSiteLayout,
    clearSiteLayout,
    getPages,
    postPages,
    putPages,
    deletePage,
    createSiteCSS,
    insertCSSOverride,
    clearSiteCSS,
    getFirms,
    getVerticals,
    getBlogs,
    getArticles,
    getQuizs,
    getReviews,
    getRangeFirms,
    getRangeVerticals,
    getRangeBlogs,
    getRangeArticles,
    getRangeQuizs,
    getRangeReviews,
  } = siteContext;

  const [website, setSite] = useState({
    globalCSS: { ...colors, ...siteType.style },
    url: "",
    title: "",
    firm: "",
    verticals: [],
    pages: [{ ...page }],
  });

  const [siteType, setSiteType] = useState({
    style: {},
    components: [],
    pages: [{ ...page }],
    type: "",
  });

  const [colors, setColors] = useState({
    primary: `--primary-color: #30526a`,
    secondary: "--secondary-color: #7aa4c3",
    light: "--dark-color: #0c151c",
    dark: "--light-color: #c3d6e4",
    danger: "--danger-color: #ff0000",
    success: "--success-color: #00ff00",
    background: "--background-color: #f8f8ff",
  });

  const siteTypes = [
    "splashDownload",
    "splashFeatured",
    "splashFormFocused",
    "verticalEnthusiast",
    "verticalProfessional",
    "verticalEducational",
    "personalFirmMarketing",
    "personalFirmMedia",
    "companyFirmSales",
    "companyFirmMarketing",
  ];

  const pageTypes = [
    "homePage",
    "aboutPage",
    "blogPage",
    "articlePage",
    "quizPage",
    "reviewPage",
    "firmPage",
    "gallaryPage",
    "verticalPage",
  ];

  const [nav, setNavbar] = useState({
    components: [],
    sections: [{ ...section }],
    style: {},
    navigationTypeFull: "",
    navigationTypeMobile: "",
    logo: "",
  });

  const [footer, setFooter] = useState({
    components: [],
    sections: [{ ...section }],
    style: {},
    logo: "",
    links: [
      {
        linkText: "",
        url: "",
        linkType: "",
      },
    ],
    siteRouting: [
      {
        linkText: "",
        url: "",
        linkType: "",
      },
    ],
  });

  const [page, setPage] = useState({
    route: "",
    pageStyle: "",
    enforcePageStyle: "true",
    newCSS: {},
    pageTypes: [""],
    pageBody: {
      heading: {},
      hero: {},
      body: {},
      form: {},
      footer: {},
    },
    title: "",
  });

  const metaTag = { tag: "", content: "" };

  const [about, setAbout] = useState({
    aboutHeading: { components: [], sections: [{ ...section }], style: {} },
    aboutHero: {
      components: [],
      sections: [{ ...section }],
      style: {},
    },
    aboutForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    aboutBody: {
      asSeenOn: {
        networks: [{ name: "", logo: "" }],
        sections: [{ ...section }],
        components: [],
        style: {},
      },
      aboutReviews: {
        firm: "",
        components: [],
        sections: [{ ...section }],
        style: {},
      },
      awards: {
        images: [{ name: "", logo: "" }],
        sections: [{ ...section }],
        components: [],
        style: {},
      },
      experiences: {
        credits: [
          {
            name: "",
            descrip: "",
            years: "",
          },
        ],
        sections: [{ ...section }],
        components: [],
        style: {},
      },
      faq: {
        qna: [
          {
            ...question,
            ...answer,
          },
        ],
        components: [],
        sections: [{ ...section }],
      },
      contact: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phoneNumber: "",
        hasGoogleMap: "false",
        sections: [{ ...section }],
        components: [],
        style: {},
      },
    },
    metaTags: [{ ...metaTag }],
    firm: "",
    vertical: "",
  });

  const [home, setHome] = useState({
    homeHeading: { components: [], sections: [{ ...section }], style: {} },
    homeHero: {
      components: [],
      sections: [{ ...section }],
      style: {},
    },
    homeBody: {
      latest: {
        blog: {
          components: [],
          sections: [{ ...section }],
          style: {},
          blogs: [],
        },
        quiz: {
          components: [],
          sections: [{ ...section }],
          style: {},
          quizs: [],
        },
        article: {
          components: [],
          sections: [{ ...section }],
          style: {},
          articles: [],
        },
        review: {
          components: [],
          sections: [{ ...section }],
          style: {},
          reviews: [],
        },
      },
      greatest: {
        blog: {
          components: [],
          sections: [{ ...section }],
          style: {},
          blogs: [],
        },
        quiz: {
          components: [],
          sections: [{ ...section }],
          style: {},
          quizs: [],
        },
        article: {
          components: [],
          sections: [{ ...section }],
          style: {},
          articles: [],
        },
        review: {
          components: [],
          sections: [{ ...section }],
          style: {},
          reviews: [],
        },
      },
      siteSummary: {
        components: [],
        sections: [{ ...section }],
        style: {},
        points: [
          {
            pointHeader: "",
            pointCopy: "",
            faLogoP: "",
          },
        ],
      },
      siteLinks: {
        components: [],
        sections: [{ ...section }],
        style: {},
        links: [
          {
            route: "",
            img: "",
            faLogoL: "",
            copy: "",
          },
        ],
      },
      socialProof: {
        components: [],
        sections: [{ ...section }],
        style: {},
        accounts: [{ social: "", login: "", password: "", sharedLink: "" }],
      },
    },
    homeForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    metaTags: [{ ...metaTag }],
    firm: "",
    verticals: [],
  });

  const [splashes, setSplashes] = useState([
    {
      splashHeading: { components: [], sections: [{ ...section }], style: {} },
      splashHero: {
        components: [],
        sections: [{ ...section }],
        style: {},
      },
      splashBody: {
        featured: {
          blog: {
            components: [],
            sections: [{ ...section }],
            style: {},
            blogs: [],
          },
          quiz: {
            components: [],
            sections: [{ ...section }],
            style: {},
            quizs: [],
          },
          article: {
            components: [],
            sections: [{ ...section }],
            style: {},
            articles: [],
          },
          review: {
            components: [],
            sections: [{ ...section }],
            style: {},
            reviews: [],
          },
        },
        downloader: {
          components: [],
          sections: [{ ...section }],
          style: {},
          content: {},
        },
      },
      splashForm: {
        components: [],
        sections: [{ ...section }],
        emailAddress: "",
        style: {},
      },
      metaTags: [{ ...metaTag }],
      vertical: "",
      firm: "",
    },
  ]);

  const [blogPage, setBlogPage] = useState({
    blogPageHero: { components: [], sections: [{ ...section }], style: {} },
    blogPageBody: {
      components: [],
      sections: [{ ...section }],
      style: {},
      blogs: [],
    },
    blogPageForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });

  const [gallaryPage, setGallaryPage] = useState({
    gallaryPageHero: { components: [], sections: [{ ...section }], style: {} },
    gallaryPageBody: {
      components: [],
      sections: [{ ...section }],
      style: {},
      videos: [],
    },
    gallaryPageForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });

  const [articlePage, setArticlePage] = useState({
    articlePageHero: { components: [], sections: [{ ...section }], style: {} },
    articlePageBody: {
      components: [],
      sections: [{ ...section }],
      style: {},
      articles: [],
    },
    articlePageForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });
  const [quizPage, setQuizPage] = useState({
    quizPageHero: { components: [], sections: [{ ...section }], style: {} },
    quizPageBody: {
      components: [],
      sections: [{ ...section }],
      style: {},
      quizs: [],
    },
    quizPageForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });
  const [reviewPage, setReviewPage] = useState({
    reviewPageHero: { components: [], sections: [{ ...section }], style: {} },
    reviewPageBody: {
      components: [],
      sections: [{ ...section }],
      style: {},
      reviews: [],
    },
    reviewPageForm: {
      components: [],
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });

  const [section, setSection] = useState({
    img: "",
    heading: "",
    style: {},
    component: { ...sectionComponent },
    copy: [{ ...sectionCopy }],
    video: [{ ...sectionVideo }],
    img: [{ ...sectionImg }],
    position: "",
    sectionOrientation: "",
  });

  const sectionComponent = { component: "", sectionArea: "" };
  const question = { copy: "", faLogoQ: "" };
  const answer = { copy: "", faLogoA: "" };
  const sectionCopy = { text: "", sectionArea: "" };
  const sectionVideo = { url: "", sectionArea: "" };
  const sectionImg = { name: "", sectionArea: "" };

  return (
    <div>
      <SketchPicker />
    </div>
  );
};

export default SiteForm;
