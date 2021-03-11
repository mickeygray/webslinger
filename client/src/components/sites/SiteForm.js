import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
  Component,
} from "react";
import App from "../component/site/_App";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";
import AuthContext from "../../context/auth/authContext";
import ColorPalletPicker from "./ColorPalletPicker";
import FontStylePicker from "./FontStylePicker";
import ElementCreator from "./ElementCreator";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../../components/component/state/useTheme";
import { GlobalStyles } from "../../components/component/state/globals";
import SectionManager from "./SectionManager";
import SectionViewer from "./SectionViewer";
import ContentManager from "./ContentManager";
import WebFont from "webfontloader";
import { useComponentContext } from "../component/state/componentState";
import { NIL } from "uuid";
import { set } from "lodash";

const SiteForm = ({ site }) => {
  const { themeChange, setThemeChange, getFonts } = useTheme();

  const { components } = useComponentContext();

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  });
  const siteContext = useContext(SiteContext);
  const authContext = useContext(AuthContext);
  const imageContext = useContext(ImageContext);
  const { getContentImage, image } = imageContext;
  const { user } = authContext;
  const { _id } = user;
  const {
    setCurrentFont,
    setCurrentPallet,
    getSites,
    getSite,
    setCurrentSite,
    clearCurrentSite,
    deleteSite,
    postSite,
    putSite,
    previewComponent,
    mountComponent,
    getThemes,
    getSiteLayouts,
    setSiteLayout,
    clearSiteLayout,
    postPage,
    current,
    putPage,
    deletePage,
    getFirms,
    getVerticals,
    setCurrentElements,
    currentElements,
    getBlogs,
    getArticles,
    getQuizs,
    getReviews,
    content,
    font,
    pallet,
    currentContent,
    clearCurrentContent,
  } = siteContext;

  useEffect(() => {
    if (content.length === 0) {
      getVerticals(_id);
      getBlogs(_id);
      getArticles(_id);
      getQuizs(_id);
      getReviews(_id);
      getFirms(_id);
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
        [key]: currentContent,
      };
    }

    if (components.map((comp) => comp.name).includes(delCheck)) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };

      componentH.current = [...componentH.current, { ...newResults[i] }];
      forceUpdate();
    }

    setH(newResults);
  };

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
        [name]: currentContent,
      };
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
    setI(newResults);
  };
  const onChangeA = (i, e, delCheck) => {
    const { value, name } = e.currentTarget;
    let newResults = [...a];
    if (!delCheck) {
      newResults[i] = {
        ...newResults[i],
        [name]: value,
      };
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
    setLi(newResults);
  };

  const section = {
    html: "",
    javascript: "",
    staticAssets: "",
  };

  const [pages, setPages] = useState([
    {
      url: "",
      route: "",
      pageType: "",
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
    },
  ]);

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
  const [currentComponent, setCurrentComponent] = useState(null);
  const [VariableComponent, setVariableComponent] = useState(null);
  const [sectAr, setSectionArea] = useState(null);
  useEffect(() => {
    if (mount != null) {
      const component = components.filter((comp) => comp.name === mount)[0];

      setCurrentComponent(component);
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

  const convertStringToComponent = (currentComponent, compStyle, sectAr) => {
    if (currentComponent && currentComponent.styles && compStyle) {
      const strArr = currentComponent.styles
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
            componentName: currentComponent.name,
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
          currentComponent.els.forEach((el) => {
            el === "p" &&
              setP((prevState) => [
                ...prevState,
                {
                  ...sectionP,
                  sectionArea: sectAr,
                  text: "Sample Text",
                  compStyle: compStyle,
                  componentName: currentComponent.name,
                },
              ]);
            componentP.current = [
              ...componentP.current,
              {
                ...sectionP,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currentComponent.name,
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
                  componentName: currentComponent.name,
                },
              ]);
            componentLi.current = [
              ...componentLi.current,
              {
                ...sectionLi,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currentComponent.name,
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
                  componentName: currentComponent.name,
                },
              ]);
            componentI.current = [
              ...componentI.current,
              {
                ...sectionI,
                sectionArea: sectAr,
                faIcon: "fas fa-glasses",
                compStyle: compStyle,
                componentName: currentComponent.name,
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
                  componentName: currentComponent.name,
                },
              ]);
            componentA.current = [
              ...componentI.current,
              {
                ...sectionA,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currentComponent.name,
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
                  componentName: currentComponent.name,
                },
              ]);
            componentButton.current = [
              ...componentButton.current,
              {
                ...sectionButton,
                sectionArea: sectAr,
                text: "Sample Text",
                compStyle: compStyle,
                componentName: currentComponent.name,
              },
            ];
            el === "img" &&
              setImg((prevState) => [
                ...prevState,
                {
                  ...sectionImg,
                  sectionArea: sectAr,
                  compStyle: compStyle,
                  componentName: currentComponent.name,
                },
              ]);
            componentImg.current = [
              ...componentImg.current,
              {
                ...sectionImg,
                sectionArea: sectAr,
                compStyle: compStyle,
                componentName: currentComponent.name,
              },
            ];
            el === "vid" &&
              setVid((prevState) => [
                ...prevState,
                {
                  ...sectionVid,
                  sectionArea: sectAr,
                  compStyle: compStyle,
                  componentName: currentComponent.name,
                },
              ]);
            componentVid.current = [
              ...componentVid.current,
              {
                ...sectionVid,
                sectionArea: sectAr,
                compStyle: compStyle,
                componentName: currentComponent.name,
              },
            ];
          });
        }
      }
    }
    const ComponentName = currentComponent.func;

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

  console.log(h);
  return (
    <div>
      <div style={{ height: "75px" }} className='grid-4 bg-light'>
        {pallet && (
          <div
            className='card text-center py-1 bg-dark'
            style={{ height: "50px", width: "200px" }}>
            Pallet: {pallet.name}
          </div>
        )}
        {font && <div className='card lead bg-dark '>Font: {font}</div>}
        {currentContent && (
          <div className='card lead bg-dark '>Content Set</div>
        )}
        <div>Section array for this area</div>
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
            {currentComponent && (
              <input
                type='text'
                name='sectAr'
                onChange={(e) => setSectionArea(e.target.value)}
              />
            )}
            {currentComponent && currentComponent.hasOwnProperty("styles") ? (
              <select
                name='compStyle'
                onChange={(e) => setCompStyle(e.target.value)}>
                <option></option>
                {currentComponent.styles.map((style, i) => (
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
                  currentComponent,
                  compStyle,
                  sectAr
                );
                setVariableComponent(comp);
                setTimeout(
                  setLoaded((prevState) => !prevState),
                  2000
                );
                setCurrentComponent(null);
              }}>
              Add Component
            </button>
          </div>
        </div>
        <div>
          <SectionViewer
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
        </div>
        <div>
          <ContentManager />
        </div>
      </div>
      <SectionManager
        onChangeA={onChangeA}
        onChangeButton={onChangeButton}
        onChangeP={onChangeP}
        onChangeH={onChangeH}
        onChangeIcon={onChangeIcon}
        onChangeImg={onChangeImg}
        onChangeImg2={onChangeImg2}
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
    </div>
  );
};

export default SiteForm;
