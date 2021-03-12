import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
import PageList from "./PageList";
import SiteList from "./SiteList";
import PageViewer from "./PageViewer";
import SiteManager from "./SiteManager";
import PageManager from "./PageManager";
import ComponentList from "./ComponentList";
import AuthContext from "../../context/auth/authContext";
import ColorPalletPicker from "./ColorPalletPicker";
import FontStylePicker from "./FontStylePicker";
import { useTheme } from "../../components/component/state/useTheme";
import SectionManager from "./SectionManager";
import SectionViewer from "./SectionViewer";
import ContentManager from "./ContentManager";
import WebFont from "webfontloader";
import { useComponentContext } from "../component/state/componentState";

const SiteForm = () => {
  const { themeChange, setThemeChange, getFonts } = useTheme();
  const { user } = useContext(AuthContext);
  const userid = user._id;

  console.log(userid);
  const { components } = useComponentContext();

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  });
  const siteContext = useContext(SiteContext);

  const imageContext = useContext(ImageContext);
  const { getContentImage, image } = imageContext;

  const {
    setCurrentFont,
    setCurrentPallet,
    clearCurrentPage,
    clearCurrentComponent,
    clearCurrentSite,
    currentSite,
    currentPage,
    currentComponent,
    postSite,
    putSite,
    postPage,
    putPage,
    postComponent,
    putComponent,
    getComponents,
    getPages,
    getSites,
    myComponents,
    sites,
    pages,
    getFirms,
    getVerticals,
    getBlogs,
    getArticles,
    getQuizs,
    getReviews,
    content,
    font,
    pallet,
    currentContent,
  } = siteContext;

  useEffect(() => {
    if (userid !== null) {
      getSites(userid);
      getPages(userid);
      getComponents(userid);
      getVerticals(userid);
      getBlogs(userid);
      getArticles(userid);
      getQuizs(userid);
      getReviews(userid);
      getFirms(userid);
    }
  }, []);

  const sectionH = {
    headingSize: "",
    sectionArea: "",
    text: "",
    font: "",
    color: "",
    type: "h",
    fontStyle: "",
    background: "",
    faIcon: "",
    faIconPosition: "",
    sectionOrdinality: 0,
  };

  const sectionP = {
    type: "p",
    sectionArea: "",
    text: "",
    fontStyle: "",
    font: "",
    color: "",
    background: "",
    sectionOrdinality: 0,
  };
  const sectionI = {
    type: "i",
    sectionArea: "",
    faIcon: "",
    background: "",
    color: "",
    sectionOrdinality: 0,
  };
  const sectionA = {
    sectionArea: "",
    text: "",
    url: "",
    type: "a",
    faIcon: "",
    faIconPosition: "",
    fontStyle: "",
    font: "",
    buttonStyle: "",
    background: "",
    color: "",
    sectionOrdinality: 0,
  };
  const sectionLi = {
    sectionArea: "",
    type: "li",
    text: "",
    font: "",
    color: "",
    background: "",
    listName: "",
    faIcon: "",
    faIconPosition: "",
    fontStyle: "",
    sectionOrdinality: 0,
  };
  const sectionVid = {
    url: "",
    sectionArea: "",
    height: "",
    type: "vid",
    width: "",
    autoplay: 0,
    sectionOrdinality: 0,
  };
  const sectionImg = {
    name: "",
    sectionArea: "",
    alt: "",
    type: "img",
    background: "",
    code: "",
    height: "",
    width: "",
    sectionOrdinality: 0,
  };
  const sectionButton = {
    type: "button",
    text: "",
    action: "",
    actionComponent1: "",
    actionComponent2: "",
    attachedContent: "",
    simulatedState: "",
    code: {},
    sectionArea: "",
    font: "",
    color: "",
    background: "",
    faIcon: "",
    faIconPosition: "",
    sectionOrdinality: 0,
  };

  const [h, setH] = useState([]);
  const [p, setP] = useState([]);
  const [li, setLi] = useState([]);
  const [icon, setI] = useState([]);
  const [a, setA] = useState([]);
  const [button, setButton] = useState([]);
  const [img, setImg] = useState([]);
  const [vid, setVid] = useState([]);
  const [simulateModal, setSimulateModal] = useState(false);
  const [simulateElArr, setSimulateElArr] = useState(0);

  const HTMLElement = (key) => {
    const newH = [...h, { ...sectionH }];
    const newP = [...p, { ...sectionP }];
    const newLi = [...li, { ...sectionLi }];
    const newI = [...icon, { ...sectionI }];
    const newButton = [...button, { ...sectionButton }];
    const newA = [...a, { ...sectionA }];
    const newImg = [...img, { ...sectionImg }];
    const newVid = [...vid, { ...sectionVid }];

    key === "h" && setH(newH);
    key === "p" && setP(newP);
    key === "li" && setLi(newLi);
    key === "i" && setI(newI);
    key === "a" && setA(newA);
    key === "button" && setButton(newButton);
    key === "img" && setImg(newImg);
    key === "vid" && setVid(newVid);
  };

  const onChangeH = (i, e, delCheck, key) => {
    let value;
    let name;

    if (e.currentTarget) {
      value = e.currentTarget.value;
      name = e.currentTarget.name;
    }

    let newResults = [...h];

    if (typeof delCheck !== "number" && !currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }

    if (typeof delCheck !== "number" && currentContent) {
      newResults[i] = {
        ...newResults[i],
        [key]: currentContent.content,
      };
    }
    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, h: newResults },
      });
    }

    setH(newResults);

    console.log(VariableComponent);
  };
  const [componentString, setComponentString] = useState("");
  const onChangeP = (i, e, delCheck, font, pallet) => {
    const { value, name } = e.currentTarget;
    let newResults = [...p];
    if (typeof delCheck !== "number" && !currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }

    if (typeof delCheck !== "number" && currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: currentContent.content,
      };
    }
    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, p: newResults },
      });
    }
    setP(newResults);
  };
  const onChangeIcon = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...icon];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }

    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, icon: newResults },
      });
    }
    setI(newResults);
  };
  const onChangeA = (i, e, delCheck) => {
    //STYLE AS BUTTON TOGGLE FOR EXTERNAL LINKS
    const { value, name } = e.currentTarget;
    let newResults = [...a];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }

    if (typeof delCheck !== "number" && currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: currentContent.content,
      };
    }
    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, a: newResults },
      });
    }
    setA(newResults);
  };
  const onChangeButton = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...button];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }

    let button = newResults[i];

    if (typeof delCheck !== "number" && currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: currentContent.content,
      };
    }

    if (button["action"] === "toggleModal" && delCheck.actionComponent1) {
      newResults[i] = {
        ...newResults[i],
        code: {
          importStatements: ['import {useState} from "react"'],
          funcCode: [
            `const [${delCheck.actionComponent1}Modal, toggle${delCheck.actionComponent1}Modal] = useState(false)`,
          ],
          actionComponent1: `(e)=>toggle${delCheck.actionComponent1}Modal(prevState=>!prevState)`,
          actionComponent2Load: `{${delCheck.actionComponet1}Modal === "true" && MyComponent }`,
          actionComponent2Revert: `(e)=>toggle${delCheck.actionComponent1}Modal(prevState=>!prevState)`,
        },
        actionComponent1: delCheck.actionComponent1,
        actionComponent2: delCheck.actionComponent2,
        simulateState: simulateModal,
        simulateFunc: setSimulateModal((prevState) => !prevState),
      };
    } else if (value === "postForm" && delCheck.actionComponent1) {
      newResults[i] = {
        ...newResults[i],
        code: {
          importStatements: [
            'import { useAppContext } from "../contexts/state.js";',
            'import { useRouter } from "next/router";',
          ],
          funcCode: [
            `const {addLead}= useAppContext()`,
            "const router = useRouter();",
          ],
          actionComponent1:
            delCheck.actionComponent2 === delCheck.actionComponent1
              ? `(e)=>{ addLead(lead); toggle${delCheck.actionComponent1}Modal(prevState=>!prevState)};`
              : `(e)=>{ addLead(lead); router.push({
                pathname: /${delCheck.actionComponent2.name}/${delCheck.actionComponent2.id},
                query: { data: ${delCheck.actionComponent2.id} },
              });}`,
        },
        actionComponent1: delCheck.actionComponent1,
        actionComponent2: delCheck.actionComponent2,
      };
    } else if (value === "getContent" && delCheck.actionComponent1) {
      newResults[i] = {
        ...newResults[i],
        code: {
          importStatements: [
            'import { useAppContext } from "../contexts/state.js";',
            'import { useRouter } from "next/router";',
          ],
          funcCode: [
            `const {getContent}= useAppContext()`,
            "const router = useRouter();",
          ],
          actionComponent1:
            delCheck.actionComponent2 === delCheck.actionComponent1
              ? `(e)=>{ getContent(_id); toggle${delCheck.actionComponent1}Modal(prevState=>!prevState)};`
              : `(e)=>{ addLead(lead); router.push({
                pathname: /${delCheck.actionComponent2.name}/${delCheck.actionComponent2.id},
                query: { data: ${delCheck.actionComponent2.id} },
              });}`,
        },
        actionComponent1: delCheck.actionComponent1,
        actionComponent2: delCheck.actionComponent2,
        attachedContent: "",
      };
    } else if (value === "internalSiteLink" && delCheck.actionComponent1) {
      newResults[i] = {
        ...newResults[i],
        code: {
          importStatements: ['import { useRouter } from "next/router";'],
          funcCode: ["const router = useRouter();"],
          actionComponent1: `(e)=>{ router.push({
                pathname: /${delCheck.actionComponent2.name}/${delCheck.actionComponent2.id},
                query: { data: ${delCheck.ctionComponent2.id} },
              });}`,
        },
        actionComponent1: delCheck.actionComponent1,
        actionComponent2: delCheck.actionComponent2,
      };
    } else if (value === "prevElement" && delCheck.actionComponent1) {
      newResults[i] = {
        ...newResults[i],
        code: {
          importStatements: ['import {useState} from "react"'],
          funcCode: [
            `const [${delCheck.actionComponent1}Incrementer, toggle${delCheck.actionComponent1}Incrementer] = useState(0)`,
          ],
          actionComponent1: `toggle${delCheck.actionComponent1}Incrementer(${delCheck.actionComponent1}Incrementer-1)`,
          actionComponent2Load: `{${delCheck.actionComponet1}Modal === "true" && MyComponent }`,
          actionComponent2Revert: `(e)=>toggle${delCheck.actionComponent1}Modal(prevState=>!prevState)`,
        },
        actionComponent1: delCheck.actionComponent1,
        actionComponent2: delCheck.actionComponent2,
        simulateState: simulateElArr,
        simulateFunc: setSimulateElArr(simulateElArr - 1),
      };
    } else if (value === "nextElement" && delCheck.actionComponent1) {
      newResults[i] = {
        ...newResults[i],
        code: {
          importStatements: ['import {useState} from "react"'],
          funcCode: [
            `const [${delCheck.actionComponent1}Incrementer, toggle${delCheck.actionComponent1}Incrementer] = useState(0)`,
          ],
          actionComponent1: `toggle${delCheck.actionComponent1}Incrementer(${delCheck.actionComponent1}Incrementer+1)`,
          actionComponent2Load: `{${delCheck.actionComponet1}Modal === "true" && MyComponent }`,
          actionComponent2Revert: `(e)=>toggle${delCheck.actionComponent1}Modal(prevState=>!prevState)`,
        },
        actionComponent1: delCheck.actionComponent1,
        actionComponent2: delCheck.actionComponent2,
        simulateState: simulateElArr,
        simulateFunc: setSimulateElArr(simulateElArr + 1),
      };
    }

    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, button: newResults },
      });
    }
    setButton(newResults);
  };

  const onChangeImg = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...img];

    if (typeof delCheck === "string" && image !== null) {
      newResults[i] = {
        ...newResults[i],
        ["name"]: delCheck,
        code: URL.createObjectURL(new Blob([image], { type: "img/png" })),
      };
      setImg(newResults);
    }

    if (typeof delCheck !== "number" && currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: currentContent.content,
      };
    }

    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, img: newResults },
      });
    }
  };

  const onChangeImg2 = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...img];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }

    setImg(newResults);
  };

  const onChangeVid = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...vid];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }
    if (typeof delCheck !== "number" && currentContent) {
      newResults[i] = {
        ...newResults[i],
        [name]: currentContent.content,
      };
    }
    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, vid: newResults },
      });
    }

    setVid(newResults);
  };

  const onChangeLi = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...li];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
    }
    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      setVariableComponent({
        ...VariableComponent,
        props: { ...VariableComponent.props, li: newResults },
      });
    }
    setLi(newResults);
  };

  const section = {
    components: [
      {
        html: "",
        javascript: "",
        name: "",
        sectionArea: "",
      },
    ],
    staticAssets: "",
    area: "",
  };

  const [page, setPage] = useState({
    url: "",
    route: "",
    pageType: "",
    name: "",
    firm: {},
    verticals: [{}],
    areas: {
      head: {
        metaTags: [{ tag: "", content: "" }],
        title: "",
      },
      nav: {
        logobox: {
          sections: [{ ...section }],
        },
        nav1: {
          sections: [{ ...section }],
        },
        nav2: {
          sections: [{ ...section }],
        },
        siteLinks: {
          sections: [{ ...section }],
        },
      },
      header: {
        heroText: {
          sections: [{ ...section }],
        },
        heroImage: {
          sections: [{ ...section }],
        },
        featuredContent: {
          sections: [{ ...section }],
        },
        heroForm: {
          sections: [{ ...section }],
        },
      },
      main: {
        rows: [
          {
            left: [{ ...section }],
            center: [{ ...section }],
            right: [{ ...section }],
          },
        ],
      },
      footer: {
        logobox: {
          sections: [{ ...section }],
        },
        footer1: {
          sections: [{ ...section }],
        },
        footer2: {
          sections: [{ ...section }],
        },
        siteLinks: {
          sections: [{ ...section }],
        },
      },
    },
  });

  const [site, setSite] = useState({
    name: "",
    url: "",
    type: "",
    staticAssets: [],
    pages: [{ ...page }],
    firm: "",
    verticals: [],
    metaTags: [{ tag: "", content: "" }],
  });

  const siteTypes = [
    {
      splashDownload: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      splashFeatured: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      splashFormFocused: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      verticalEnthusiast: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      verticalProfessional: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      verticalEducational: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      personalFirmMarketing: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      personalFirmMedia: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      companyFirmSales: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
      companyFirmMarketing: {
        homePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        aboutPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        blogPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        articlePage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        quizPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        reviewPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        firmPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        gallaryPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
        verticalPage: {
          site: "",
          nav: "",
          header: "",
          main: "",
          footer: "",
        },
      },
    },
  ];

  const [currentTheme, setCurrentTheme] = useState({
    primary: "",
    light: "",
    dark: "",
    success: "",
    danger: "",
    font: "",
  });

  useEffect(() => {
    if (font !== currentTheme.font) {
      setCurrentTheme({
        ...currentTheme,
        font: font,
      });
    } else if (pallet && pallet.primary !== currentTheme.primary) {
      setCurrentTheme({
        ...currentTheme,
        primary: pallet.primary,
        light: pallet.light,
        dark: pallet.dark,
        success: pallet.success,
        danger: pallet.danger,
      });
    }
  }, [font, pallet]);

  const getSetColor = () => {
    const string = sessionStorage.getItem("colorPallet");
    const pallet = JSON.parse(string);

    return setCurrentPallet(pallet);
  };

  const getSetFont = () => {
    const font = sessionStorage.getItem("font");

    return setCurrentFont(font);
  };

  const [keya, setKey] = useState("");
  const [mount, setMount] = useState(null);
  const [compStyle, setCompStyle] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [currComponent, setCurrComponent] = useState(null);
  const [VariableComponent, setVariableComponent] = useState(null);
  const [sectAr, setSectionArea] = useState(null);
  const [displayState, setDisplayState] = useState("");
  const [contentList, setContentList] = useState([]);
  const changeDisplay = useCallback((displayState) => {
    setDisplayState(displayState);
  }, []);

  useEffect(() => {
    if (mount != null) {
      const component = components.filter((comp) => comp.name === mount)[0];

      setCurrComponent(component);
    }
  }, [mount]);

  const componentH = useRef(h);
  const componentP = useRef(p);
  const componentI = useRef(icon);
  const componentImg = useRef(img);
  const componentVid = useRef(vid);
  const componentA = useRef(a);
  const componentLi = useRef(li);
  const componentButton = useRef(button);

  const component = {
    h,
    p,
    icon,
    img,
    vid,
    a,
    li,
    button,
    contentList,
    componentString,
  };

  console.log(component);
  const convertStringToComponent = (currComponent, compStyle, sectAr) => {
    if (currComponent && currComponent.styles && compStyle) {
      const strArr = currComponent.styles
        .filter((comp) => comp.compStyle === compStyle)
        .map((comp) => comp.els)[0];

      for (const el of strArr) {
        if (el.includes("h") && el.length > 1) {
          const sectH = {
            headingSize: el,
            sectionArea: sectAr,
            text: "Sample Text",
            font: "",
            color: "",
            compStyle: compStyle,
            componentName: currComponent.name,
            type: "h",
            fontStyle: "",
            background: "",
            faIcon: "",
            faIconPosition: "",
            sectionOrdinality: 0,
          };

          setH((prevState) => [...prevState, { ...sectH }]);
          componentH.current = [...componentH.current, { ...sectH }];
        } else {
          strArr.forEach((el) => {
            el === "p" &&
              setP((prevState) => [
                ...prevState,
                {
                  ...sectionP,
                  sectionArea: sectAr,
                  text: "Sample Text",
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentP.current = [
              ...componentP.current,
              {
                ...sectionP,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
            el === "li" &&
              setLi((prevState) => [
                ...prevState,
                {
                  ...sectionLi,
                  sectionArea: sectAr,
                  text: "Sample Text",
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentLi.current = [
              ...componentLi.current,
              {
                ...sectionLi,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
            el === "i" &&
              setI((prevState) => [
                ...prevState,
                {
                  ...sectionI,
                  sectionArea: sectAr,
                  faIcon: "fas fa-glasses",
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentI.current = [
              ...componentI.current,
              {
                ...sectionI,
                sectionArea: sectAr,
                faIcon: "fas fa-glasses",
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
            el === "a" &&
              setA((prevState) => [
                ...prevState,
                {
                  ...sectionA,
                  sectionArea: sectAr,
                  text: "Sample Text",
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentA.current = [
              ...componentI.current,
              {
                ...sectionA,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
            el === "button" &&
              setButton((prevState) => [
                ...prevState,
                {
                  ...sectionButton,
                  sectionArea: sectAr,
                  text: "Sample Text",
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentButton.current = [
              ...componentButton.current,
              {
                ...sectionButton,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
            el === "img" &&
              setImg((prevState) => [
                ...prevState,
                {
                  ...sectionImg,
                  sectionArea: sectAr,
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentImg.current = [
              ...componentImg.current,
              {
                ...sectionImg,
                sectionArea: sectAr,
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
            el === "vid" &&
              setVid((prevState) => [
                ...prevState,
                {
                  ...sectionVid,
                  sectionArea: sectAr,
                  compStyle: compStyle,
                  componentName: currComponent.name,
                },
              ]);
            componentVid.current = [
              ...componentVid.current,
              {
                ...sectionVid,
                sectionArea: sectAr,
                compStyle: compStyle,
                componentName: currComponent.name,
              },
            ];
          });
        }
      }
    }
    const ComponentName = currComponent.func;

    return (otherProps) => (
      <ComponentName
        {...otherProps}
        content={content}
        font={font}
        pallet={pallet}
        sectionArea={sectAr}
        h={componentH.current}
        icon={componentI.current}
        p={componentP.current}
        compStyle={compStyle}
        vid={componentVid.current}
        img={componentImg.current}
        a={componentA.current}
        li={componentLi.current}
        button={componentButton.current}></ComponentName>
    );
  };

  console.log(componentString);
  return (
    <div>
      <div style={{ height: "75px" }} className='navbar bg-light'>
        <ul>
          {pallet && (
            <li
              className='card text-center py-1 bg-dark'
              style={{ height: "50px", width: "200px" }}>
              Pallet: {pallet.name}
            </li>
          )}
          {font && <div className='card lead bg-dark '>Font: {font}</div>}
          {currentContent && (
            <li
              style={{ height: "50px", width: "200px" }}
              className='card lead bg-dark '>
              Content Set
            </li>
          )}
          {currentComponent || currentSite || currentPage ? (
            <li
              style={{ height: "50px", width: "200px" }}
              className='card lead bg-dark '>
              <button
                className='btn btn-secondary btn-sm'
                onClick={() => {
                  (currentComponent && putComponent(currentComponent._id)) ||
                    (currentPage && putPage(currentPage._id)) ||
                    (currentSite && putSite(currentSite._id));
                  (currentComponent && clearCurrentComponent()) ||
                    (currentPage && clearCurrentPage()) ||
                    (currentSite && clearCurrentSite());
                }}>
                Update
                {(currentComponent && currentComponent.name) ||
                  (currentPage && currentPage.name) ||
                  (currentSite && currentSite.name)}
              </button>
            </li>
          ) : (
            <li className='card all-center grid-2 mx-3'>
              <div>
                {" "}
                <select
                  name='displayState'
                  onChange={(e) => setDisplayState(e.target.value)}>
                  <option>Get Started...</option>
                  <option value='site'>Create New Site</option>
                  <option value='page'>Create New Page</option>
                  <option value='component'>Create New Component</option>
                </select>
              </div>
              <div>
                {" "}
                <button
                  className='btn btn-dark btn-block'
                  onClick={() =>
                    (displayState === "site" && postSite(site)) ||
                    (displayState === "page" && postPage(page)) ||
                    (displayState === "component" && postComponent(section))
                  }>
                  Save New{" "}
                  {displayState.slice(0, 1).toUpperCase() +
                    displayState.slice(1, displayState.length)}
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className='grid-3b'>
        <div style={{ margin: "0px !important" }}>
          <ColorPalletPicker />
          <br />
          <button className='btn btn-dark' onClick={() => getSetColor()}>
            Initialize Selected Pallet
          </button>
          <br />
          <br />
          <FontStylePicker />
          <br />
          <button className='btn btn-light' onClick={() => getSetFont()}>
            Initialize Selected Font
          </button>
          <br />
          <br />
          <div>
            {" "}
            <select name='key' onChange={(e) => setKey(e.target.value)}>
              <option></option>
              <option value='h'>Heading</option>
              <option value='p'>Paragraph</option>
              <option value='li'>List Item</option>
              <option value='i'>Icon</option>
              <option value='a'>Link</option>
              <option value='button'>Button</option>
              <option value='img'>Image</option>
              <option value='vid'>Youtube Video</option>
            </select>
            <br />
            <button
              className='btn primary btn-block'
              onClick={() => HTMLElement(keya)}>
              Add HTML Element
            </button>
          </div>
          <br />
          <br />
          <div>
            <select
              name='component'
              onChange={(e) => {
                setMount(e.target.value);
              }}>
              <option></option>
              {components.map((component) => (
                <option key={component.name} value={component.name}>
                  {component.name}
                </option>
              ))}
            </select>
            {currComponent && (
              <input
                type='text'
                name='sectAr'
                onChange={(e) => setSectionArea(e.target.value)}
              />
            )}
            {currComponent && currComponent.hasOwnProperty("styles") ? (
              <select
                name='compStyle'
                onChange={(e) => setCompStyle(e.target.value)}>
                <option></option>
                {currComponent.styles.map((style, i) => (
                  <option key={i} value={style.compStyle}>
                    {style.compStyle}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
            <button
              className='btn primary btn-block'
              onClick={() => {
                const comp = convertStringToComponent(
                  currComponent,
                  compStyle,
                  sectAr
                );
                setVariableComponent(comp);
                setTimeout(
                  setLoaded((prevState) => !prevState),
                  2000
                );
                setCurrComponent(null);
              }}>
              Add Component
            </button>
          </div>
        </div>
        <div>
          {displayState === "component" && (
            <SectionViewer
              a={a}
              icon={icon}
              li={li}
              p={p}
              componentString={componentString}
              setComponentString={setComponentString}
              h={h}
              vid={vid}
              img={img}
              button={button}
              section={section}
              loaded={loaded}
              pallet={pallet}
              VariableComponent={VariableComponent}
            />
          )}

          {displayState === "page" && (
            <PageViewer
              a={a}
              icon={icon}
              li={li}
              p={p}
              h={h}
              vid={vid}
              img={img}
              button={button}
              section={section}
              loaded={loaded}
              pallet={pallet}
              VariableComponent={VariableComponent}
            />
          )}

          {displayState === "site" && (
            <SiteManager changeDisplay={changeDisplay} />
          )}
        </div>
        <div>
          <ContentManager />
        </div>
      </div>

      <div className='card bg-light'>
        {displayState === "component" && (
          <SectionManager
            onChangeA={onChangeA}
            onChangeButton={onChangeButton}
            onChangeP={onChangeP}
            onChangeH={onChangeH}
            onChangeIcon={onChangeIcon}
            onChangeImg={onChangeImg}
            onChangeImg2={onChangeImg2}
            setContentList={setContentList}
            onChangeVid={onChangeVid}
            onChangeLi={onChangeLi}
            a={a}
            icon={icon}
            li={li}
            p={p}
            h={h}
            vid={vid}
            img={img}
            button={button}
          />
        )}
        {displayState === "page" && (
          <PageManager changeDisplay={changeDisplay} />
        )}
      </div>

      <div className='card bg-light'>
        <div className='my-1'>
          {sites && <SiteList changeDisplay={changeDisplay} />}
        </div>
        <div className='my-1'>
          {pages && <PageList changeDisplay={changeDisplay} />}
        </div>
        <div className='my-1'>
          {myComponents && <ComponentList changeDisplay={changeDisplay} />}
        </div>
      </div>
    </div>
  );
};

export default SiteForm;
