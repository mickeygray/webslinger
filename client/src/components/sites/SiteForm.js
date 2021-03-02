import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SketchPicker } from "react-color";
import Site from "../component/site/Site";
import SiteContext from "../../context/site/siteContext";
import { useAppContext } from "../component/state/appState";
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

  const sectionH1 = { text: "", sectionArea: "" };
  const sectionH2 = { text: "", sectionArea: "" };
  const sectionH3 = { text: "", sectionArea: "" };
  const sectionH4 = { text: "", sectionArea: "" };
  const sectionH5 = { text: "", sectionArea: "" };
  const sectionP = { text: "", sectionArea: "" };
  const sectionA = { text: "", url: "", sectionArea: "" };
  const sectionLi = { text: "", sectionArea: "" };
  const sectionVid = { url: "", sectionArea: "" };
  const sectionImg = { name: "", sectionArea: "" };
  const sectionButton = { text: "", action: "", sectionArea: "" };

  const [section, setSection] = useState({
    img: [{ ...sectionImg }],
    vid: [{ ...sectionVid }],
    h1: [{ ...sectionH1 }],
    h2: [{ ...sectionH2 }],
    h3: [{ ...sectionH3 }],
    h4: [{ ...sectionH4 }],
    h5: [{ ...sectionH5 }],
    p: [{ ...sectionP }],
    li: [{ ...sectionLi }],
    a: [{ ...sectionA }],
    faLogo: "",
    faPosition: "",
    componentStyle: "",
    button: [{ ...sectionButton }],
  });

  const [metaTag, setMetaTag] = useState({ tag: "", content: "" });

  const [header, setHeader] = useState({
    components: [],
    sections: [{ ...section }],
    style: {},
    logo: "",
    navigationTypeFull: "",
    naviationTypeMobile: "",
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

  const [hero, setHero] = useState({
    components: [],
    sections: [{ ...section }],
    style: {},
    logo: "",
    navigationTypeFull: "",
    naviationTypeMobile: "",
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

  const [footer, setFooter] = useState({
    components: [],
    sections: [{ ...section }],
    style: {},
    content: [],
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

  const [body, setBody] = useState({
    components: [],
    sections: [{ ...section }],
    content: [],
    style: {},
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
  const [layout, setLayout] = useState({
    header: { ...header },
    hero: { ...hero },
    body: { ...body },
    footer: { ...footer },
    pageType: "",
  });

  const [page, setPage] = useState({
    route: "",
    pageStyle: "",
    enforcePageStyle: "true",
    newCSS: {},
    metaTags: [{ ...metaTag }],
    pageBody: { ...layout },
    title: "",
  });

  const [website, setSite] = useState({
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

  const componentStyles = [
    "dropdowncontact",
    "simplelayover",
    "layovercollapse",
    "imageopen",
    "logostack",
    "horizontalimg",
    "expandingcircle",
    "imagesselector",
    "imageexpander",
    "reflexive",
    "bouncysitelinks",
    "gradientpillsitelinks",
    "layoverboxsitelinks",
    "slidingsitelinks",
    "bigsociallinks",
    "smallsociallinks",
    "curlreveal",
    "navbutton1",
    "navbutton2",
    "dropdown",
    "burgermenu",
    "imageset",
    "halfhalf",
    "vertical",
    "halfhalf-animated",
    "dimension",
    "textinacircle",
    "deconstructed",
    "threeD",
    "verticalnavlinks",
    "dualImage",
    "layoverfade",
    "focusedlayover",
    "shortbounce",
    "textreveal",
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

  return (
    <div>
      <SketchPicker />
      <Site />
    </div>
  );
};

export default SiteForm;
