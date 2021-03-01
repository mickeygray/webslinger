import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
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
  });

  const [siteType, setSiteType] = useState({
    style: {},
    components: [],
    pages: [{ ...page }],
    type: "",
  });

  const [colors, setColors] = useState({
    primary: "",
    secondary: "",
    light: "",
    dark: "",
    danger: "",
    success: "",
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

  const [nav, setNavbar] = useState({
    component: "",
    sections: [{ ...section }],
    style: {},
    navigationTypeFull: "",
    navigationTypeMobile: "",
    logo: "",
  });

  const [footer, setFooter] = useState({
    component: "",
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
    pageBody: [],
    title: "",
  });

  const metaTag = { tag: "", content: "" };

  const [about, setAbout] = useState({
    aboutHero: {
      component: "",
      sections: [{ ...section }],
      style: {},
    },
    aboutForm: {
      component: "",
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    aboutBody: {
      asSeenOn: {
        networks: [{ name: "", logo: "" }],
        sections: [{ ...section }],
        component: "",
        style: {},
      },
      aboutReviews: {
        firm: "",
        component: "",
        sections: [{ ...section }],
        style: {},
      },
      awards: {
        images: [{ name: "", logo: "" }],
        sections: [{ ...section }],
        component: "",
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
        component: "",
        style: {},
      },
      faq: {
        qna: [
          {
            ...question,
            ...answer,
          },
        ],
        component: "",
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
        component: "",
        style: {},
      },
    },
    metaTags: [{ ...metaTag }],
    firm: "",
    vertical: "",
  });

  const [home, setHome] = useState({
    homeHero: {
      component: "",
      sections: [{ ...section }],
      style: {},
    },
    homeBody: {
      latest: {
        blog: {
          component: "",
          sections: [{ ...section }],
          style: {},
          blogs: [],
        },
        quiz: {
          component: "",
          sections: [{ ...section }],
          style: {},
          quizs: [],
        },
        article: {
          component: "",
          sections: [{ ...section }],
          style: {},
          articles: [],
        },
        review: {
          component: "",
          sections: [{ ...section }],
          style: {},
          reviews: [],
        },
      },
      greatest: {
        blog: {
          component: "",
          sections: [{ ...section }],
          style: {},
          blogs: [],
        },
        quiz: {
          component: "",
          sections: [{ ...section }],
          style: {},
          quizs: [],
        },
        article: {
          component: "",
          sections: [{ ...section }],
          style: {},
          articles: [],
        },
        review: {
          component: "",
          sections: [{ ...section }],
          style: {},
          reviews: [],
        },
      },
      siteSummary: {
        component: "",
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
        component: "",
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
        component: "",
        sections: [{ ...section }],
        style: {},
        accounts: [{ social: "", login: "", password: "", sharedLink: "" }],
      },
    },
    homeForm: {
      component: "",
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
      splashHero: {
        component: "",
        sections: [{ ...section }],
        style: {},
      },
      splashBody: {
        featured: {
          blog: {
            component: "",
            sections: [{ ...section }],
            style: {},
            blogs: [],
          },
          quiz: {
            component: "",
            sections: [{ ...section }],
            style: {},
            quizs: [],
          },
          article: {
            component: "",
            sections: [{ ...section }],
            style: {},
            articles: [],
          },
          review: {
            component: "",
            sections: [{ ...section }],
            style: {},
            reviews: [],
          },
        },
        downloader: {
          component: "",
          sections: [{ ...section }],
          style: {},
          content: {},
        },
      },
      splashForm: {
        component: "",
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
    blogPageHero: { component: "", sections: [{ ...section }], style: {} },
    blogPageBody: {
      component: "",
      sections: [{ ...section }],
      style: {},
      blogs: [],
    },
    blogPageForm: {
      component: "",
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });

  const [vlogPage, setVlogPage] = useState({
    vlogPageHero: { component: "", sections: [{ ...section }], style: {} },
    vlogPageBody: {
      component: "",
      sections: [{ ...section }],
      style: {},
      videos: [],
    },
    vlogPageForm: {
      component: "",
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });

  const [articlePage, setArticlePage] = useState({
    articlePageHero: { component: "", sections: [{ ...section }], style: {} },
    articlePageBody: {
      component: "",
      sections: [{ ...section }],
      style: {},
      articles: [],
    },
    articlePageForm: {
      component: "",
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });
  const [quizPage, setQuizPage] = useState({
    quizPageHero: { component: "", sections: [{ ...section }], style: {} },
    quizPageBody: {
      component: "",
      sections: [{ ...section }],
      style: {},
      quizs: [],
    },
    quizPageForm: {
      component: "",
      sections: [{ ...section }],
      emailAddress: "",
      style: {},
    },
    vertical: "",
    firm: "",
  });
  const [reviewPage, setReviewPage] = useState({
    reviewPageHero: { component: "", sections: [{ ...section }], style: {} },
    reviewPageBody: {
      component: "",
      sections: [{ ...section }],
      style: {},
      reviews: [],
    },
    reviewPageForm: {
      component: "",
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
    copy: [{ ...sectionCopy }],
    video: [{ ...sectionVideo }],
    img: [{ ...sectionImg }],
    position: "",
  });

  const question = { copy: "", faLogoQ: "" };
  const answer = { copy: "", faLogoA: "" };
  const sectionCopy = { text: "", sectionArea: "" };
  const sectionVideo = { url: "", sectionArea: "" };
  const sectionImg = { name: "", sectionArea: "" };

  return <div></div>;
};

export default SiteForm;
