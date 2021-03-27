import React, {
 useState,
 useCallback,
 useContext,
 useEffect,
 useRef,
} from "react";
import SiteContext from "../../context/site/siteContext";
import ImageContext from "../../context/image/imageContext";

import PageViewer from "./PageViewer";
import SiteManager from "./SiteManager";
import PageManager from "./PageManager";

import AuthContext from "../../context/auth/authContext";
import ColorPalletPicker from "./ColorPalletPicker";
import FontStylePicker from "./FontStylePicker";
import { useTheme } from "../../components/component/state/useTheme";
import SectionManager from "./SectionManager";

import ContentManager from "./ContentManager";
import WebFont from "webfontloader";
import { _uniq } from "lodash";
import { useComponentContext } from "../component/state/componentState";
import { v4 as uuidV4 } from "uuid";
import SecViewer from "./SecViewer";

const SiteForm = () => {
 const { themeChange, setThemeChange, getFonts } = useTheme();
 const { user } = useContext(AuthContext);
 const userid = user._id;

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
 const {
  getContentImage,
  image,
  contentImage,
  clearCurrentImage,
 } = imageContext;

 console.log(contentImage);
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
  setGrid,
  grid,
  clearCurrentContent,
  currentContent,
  body,
  addCell,
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  cellStructure,
 } = siteContext;

 useEffect(() => {
  if (userid !== null) {
   //getSites(userid);
   //getPages(userid);
   //getComponents(userid);
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
  buttonStyle: "",
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
  action: [],
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
 const [keya, setKey] = useState("");
 const [mount, setMount] = useState(null);
 const [compStyle, setCompStyle] = useState(null);
 const [loaded, setLoaded] = useState(false);
 const [currComponent, setCurrComponent] = useState(null);
 const [VariableComponent, setVariableComponent] = useState(null);
 const [sectAr, setSectionArea] = useState(null);
 const [displayState, setDisplayState] = useState("component");
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
 const [component, setComponents] = useState([]);
 const [viewIndex, setViewIndex] = useState(-1);
 const [viewStyleToggle, setViewStyleToggle] = useState(true);
 const [gridViewToggle, setGridViewToggle] = useState(false);
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

 console.log(img);

 useEffect(() => {
  if (VariableComponent != null) {
   setComponents((prevState) => [...prevState, VariableComponent]);
   setVariableComponent(null);
  }
 }, [VariableComponent]);

 const onChangeH = (i, e, delCheck, key) => {
  const { value, name } = e.currentTarget;
  let newResults = [...h];
  if (typeof delCheck !== "number" && !currentContent) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (key === "font") {
   newResults[i] = {
    ...newResults[i],
    ["font"]: delCheck,
   };
  }
  if (typeof delCheck !== "number" && currentContent) {
   newResults[i] = {
    ...newResults[i],
    [name]: currentContent.content,
   };
  }
  if (components.map((comp) => comp.name).includes(delCheck)) {
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.h];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, h: [...newResults] },
    },
   ]);
  }
  setH(newResults);
 };

 console.log(h);

 const onChangeP = (i, e, delCheck, font, pallet) => {
  const { value, name } = e.currentTarget;
  let newResults = [...p];
  if (typeof delCheck !== "number" && !currentContent) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (font === "font") {
   newResults[i] = {
    ...newResults[i],
    ["font"]: delCheck,
   };
  }

  if (typeof delCheck !== "number" && currentContent) {
   newResults[i] = {
    ...newResults[i],
    [name]: currentContent.content,
   };
  }
  if (components.map((comp) => comp.name).includes(delCheck)) {
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.p];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, p: [...newResults] },
    },
   ]);
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
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.icon];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, icon: [...newResults] },
    },
   ]);
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
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.a];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, a: [...newResults] },
    },
   ]);
  }
  setA(newResults);
 };
 const onChangeButton = (i, e, delCheck, check) => {
  const { value, name } = e.currentTarget;

  let newResults = [...button];

  if (!delCheck) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (check === "font") {
   newResults[i] = {
    ...newResults[i],
    ["font"]: delCheck,
   };
  }

  if (typeof delCheck !== "number" && currentContent) {
   newResults[i] = {
    ...newResults[i],
    [name]: currentContent.content,
   };
  }

  if (value === "toggleModal" && delCheck.actionComponent1) {
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
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.button];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, button: [...newResults] },
    },
   ]);
  }
  setButton(newResults);
 };

 const onChangeImg = (i, e, delCheck) => {
  const { value, name } = e.currentTarget;
  let newResults = [...img];

  if (delCheck && delCheck.content) {
   getContentImage(delCheck.content, i, "img");
   newResults[i] = {
    ...newResults[i],
    ["name"]: delCheck.content,
   };
   setImg(newResults);
   clearCurrentContent();
  }

  if (typeof delCheck === "number") {
   setImg(newResults);
  }

  if (!delCheck && e && e.currentTarget) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
   setImg(newResults);
  }
  if (components.map((comp) => comp.name).includes(delCheck)) {
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.img];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
     code: URL.createObjectURL(new Blob([image], { type: "img/png" })),
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, img: [...newResults] },
    },
   ]);
  }
 };

 useEffect(() => {
  if (contentImage !== null && contentImage.background === false) {
   let newResults = [...img];
   newResults[contentImage.imgIndex] = {
    ...newResults[contentImage.imgIndex],
    ["name"]: contentImage.name,
    ["code"]: contentImage.code,
   };
   setImg(newResults);
   clearCurrentImage();
  }
 }, [contentImage, imageContext]);

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
   const comp = component.filter((c) => c.type.name != delCheck);

   const i = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[i].props.vid];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[i],
     props: { ...component[i].props, vid: [...newResults] },
    },
   ]);
  }

  setVid(newResults);
 };

 const onChangeLi = (i, e, delCheck, key) => {
  const { value, name } = e.currentTarget;
  let newResults = [...li];
  if (!delCheck) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (key === "font") {
   newResults[i] = {
    ...newResults[i],
    ["font"]: delCheck,
   };
  }
  if (components.map((comp) => comp.name).includes(delCheck)) {
   const comp = component.filter((c) => c.type.name != delCheck);

   const index = component.findIndex((x) => x === comp[0]);

   let newResults = [...component[index].props.button];

   for (let i = 0; i < newResults.length; i++) {
    newResults[i] = {
     ...newResults[i],
     [e.currentTarget.name]: e.currentTarget.value,
    };
   }
   setComponents([
    ...component,
    {
     ...component[index],
     props: { ...component[index].props, button: [...newResults] },
    },
   ]);
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
    key={uuidV4()}
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

 /*   <div className='card bg-light'>
    <div className='my-1'>
     {sites && <SiteList changeDisplay={changeDisplay} />}
    </div>
    <div className='my-1'>
     {pages && <PageList changeDisplay={changeDisplay} />}
    </div>
    <div className='my-1'>
     {myComponents && <ComponentList changeDisplay={changeDisplay} />}
    </div>
   </div>*/

 console.log(img, "img array");
 return (
  <div>
   <div className='bg-light'>
    <div style={{ position: "relative", top: "0" }}>
     <div className='navbar'>
      <ul>
       {" "}
       {pallet && (
        <li className='card mx text-center bg-dark' style={{ height: "50px" }}>
         Pallet: {pallet.name}
        </li>
       )}
       {font && (
        <li style={{ height: "50px" }} className='card mx text-center bg-dark'>
         Font: {font}
        </li>
       )}
       {currentContent && (
        <li style={{ height: "50px" }} className='card mx text-center bg-dark'>
         Content Set
        </li>
       )}
      </ul>
     </div>
    </div>
    <div style={{ position: "relative", bottom: "0" }}>
     <div className='navbar'>
      <ul>
       <li className='py-1 mx'>
        {" "}
        <select
         name='displayState'
         onChange={(e) => setDisplayState(e.target.value)}>
         <option value='component'>Component</option>
         <option value='page'>Page</option>
        </select>
       </li>
       <li className='mx'>
        <label htmlFor='years' style={{ textSize: "5px" }}>
         Cells
        </label>
        <input
         type='radio'
         name='viewIndex'
         onClick={() => setViewIndex(1)}
         checked={viewIndex === 1}
        />
        <br />
        <label htmlFor='years' style={{ textSize: "1px", color: "red" }}>
         Menu
        </label>
        <input
         type='radio'
         name='viewIndex'
         onClick={() => setViewIndex(-1)}
         checked={viewIndex === -1}
        />
        <br />
        <label htmlFor='years' style={{ textSize: "5px" }}>
         View
        </label>
        <input
         type='checkbox'
         name='viewStyleToggle'
         onClick={() => setViewStyleToggle((prevState) => !prevState)}
         checked={viewStyleToggle === true}
        />
        <br />
        <label htmlFor='years' style={{ textSize: "5px" }}>
         Grid
        </label>
        <input
         type='checkbox'
         name='viewStyleToggle'
         onClick={() => setGridViewToggle((prevState) => !prevState)}
         checked={gridViewToggle === true}
        />
       </li>
       <li className='py-1 mx'>
        {" "}
        <button
         className='btn btn-dark btn-block'
         onClick={() =>
          (displayState === "site" && postSite(site)) ||
          (displayState === "page" && postPage(page)) ||
          (displayState === "component" && postComponent(section))
         }>
         Save
        </button>
       </li>
       <li className='py-1 mx'>
        <button className='btn btn-sm btn-dark' onClick={() => addCell()}>
         + Cell
        </button>
       </li>

       <li className='py-1 mx'>
        <button className='btn btn-sm btn-dark' onClick={() => addColumn()}>
         + Col
        </button>
       </li>
       <li className='py-1 mx'>
        <button className='btn btn-sm btn-dark' onClick={() => addRow()}>
         + Row
        </button>
       </li>
       <li className='py-1 mx'></li>
       <li className='py-1 mx'>
        <select name='verticalAlignment' onChange={(e) => setGrid(e)}>
         <option>Vertical</option>
         <option value='start'>Start</option>
         <option value='end'>End</option>
         <option value='center'>Center</option>
         <option value='space-between'>Between</option>
         <option value='space-around'>Around</option>
         <option value='space-evenly'>Evenly</option>
         <option value='stretch'>Stretch</option>
        </select>
       </li>

       <li className='py-1 mx'>
        <select name='horitzontalAlignment' onChange={(e) => setGrid(e)}>
         <option>Horizontal</option>
         <option value='start'>Start</option>
         <option value='end'>End</option>
         <option value='center'>Center</option>
         <option value='space-between'>Between</option>
         <option value='space-around'>Around</option>
         <option value='space-evenly'>Evenly</option>
        </select>
       </li>

       <li className='py-1 mx'>
        <select name='layout' onChange={(e) => setGrid(e)}>
         <option>Layout</option>
         <option value='row'>Row</option>
         <option value='column'>Column</option>
         <option value='row dense'>Row Dense</option>
        </select>
       </li>
      </ul>
     </div>
    </div>
   </div>
   {gridViewToggle === true ? (
    <div className='grid-2 bg-secondary'>
     <div>
      {grid.columns.map(({ size, unit }, i) => (
       <div>
        <div style={{ display: "flex" }}>
         <input
          placeholder='Column Size...'
          type='text'
          name='size'
          value={size}
          onChange={(e) => setGrid(e, "column", i)}
         />
         <select
          name='unit'
          value={unit}
          onChange={(e) => setGrid(e, "column", i)}>
          <option>Select A Unit</option>
          <option value='px'>Pixels</option>
          <option value='fr'>Fractions</option>
          <option value='repeat(auto-fit,minmax(120px,1fr))'>Responsive</option>
         </select>
         <span
          style={{ float: "right" }}
          className='color-background lead'
          onClick={() => deleteColumn(i)}>
          <a>X</a>
         </span>
        </div>
       </div>
      ))}
     </div>

     <div>
      {grid.rows.map(({ size, unit }, i) => (
       <div style={{ display: "flex" }}>
        <input
         placeholder='Row Size...'
         type='text'
         name='size'
         value={size}
         onChange={(e) => setGrid(e, "row", i)}
        />
        <select name='unit' value={unit} onChange={(e) => setGrid(e, "row", i)}>
         <option></option>
         <option value='px'>Pixels</option>
         <option value='fr'>Fractions</option>
        </select>
        <span
         style={{ float: "right" }}
         className='color-background lead'
         onClick={() => deleteRow(i)}>
         <a>X</a>
        </span>
       </div>
      ))}
     </div>
    </div>
   ) : (
    ""
   )}

   <div className='grid-3b'>
    <div
     style={
      viewStyleToggle === true ? { background: "#f4f4f4" } : { display: "none" }
     }>
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
      {currComponent && cellStructure ? (
       <select
        name='sectionArea'
        onChange={(e) => setSectionArea(e.target.value)}>
        <option></option>
        {cellStructure.map((cell) => {
         const { name, id, children } = cell;
         const subs = children.map((sub) => {
          const { name, id, bodyCells } = sub;

          const body = bodyCells.map(({ name, id }) => (
           <option value={id}>{name}</option>
          ));

          return [<option value={id}>{name}</option>, ...body];
         });

         const cell1 = <option value={id}>{name}</option>;

         const cellMap = [cell1, ...subs.flat()];

         return cellMap;
        })}
       </select>
      ) : (
       ""
      )}
      {currComponent && currComponent.hasOwnProperty("styles") ? (
       <select name='compStyle' onChange={(e) => setCompStyle(e.target.value)}>
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
        const comp = convertStringToComponent(currComponent, compStyle, sectAr);
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
     <div
      style={
       viewStyleToggle === true
        ? {
           marginLeft: "-75vw",
           marginRight: "75vw",
           overflowY: "scroll",
           overflowX: "scroll",
           width: "150vw",
           height: "100%",
           zIndex: `${parseInt(viewIndex)}`,
           position: "absolute",
          }
        : {
           marginLeft: "-60vw",
           overflowY: "scroll",
           overflowX: "scroll",
           width: "150vw",
           height: "100%",
           zIndex: `${parseInt(viewIndex)}`,
           position: "absolute",
          }
      }>
      {viewStyleToggle === false ? (
       <div
        style={
         displayState === "component"
          ? {
             left: "74vw",
             position: "relative",
             zIndex: `${parseInt(viewIndex)}`,
             border: "#ccc 5px dotted",
             height: "55vw",
             width: "54vw",
            }
          : {
             left: "52vw",
             position: "relative",
             zIndex: `${parseInt(viewIndex)}`,
             border: "#ccc 5px dotted",
             height: "100%",
             width: "99vw",
            }
        }>
        <SecViewer
         a={a}
         icon={icon}
         li={li}
         p={p}
         h={h}
         vid={vid}
         img={img}
         button={button}
         font={font}
         pallet={pallet}
         component={component}
        />
       </div>
      ) : (
       <div
        style={
         displayState === "component"
          ? {
             left: "74vw",
             position: "relative",
             zIndex: `${parseInt(viewIndex)}`,
             border: "#ccc 5px dotted",
             height: "55vw",
             width: "54vw",
            }
          : {
             left: "52vw",
             position: "relative",
             zIndex: `${parseInt(viewIndex)}`,
             border: "#ccc 5px dotted",
             height: "100%",
             width: "100vw",
            }
        }>
        <SecViewer
         a={a}
         icon={icon}
         li={li}
         p={p}
         h={h}
         vid={vid}
         img={img}
         button={button}
         font={font}
         pallet={pallet}
         component={component}
        />
       </div>
      )}
     </div>
    </div>
    <div
     style={
      viewStyleToggle === true ? { background: "#f4f4f4" } : { display: "none" }
     }>
     <ContentManager />
    </div>
   </div>
   <div
    style={
     viewStyleToggle === true
      ? { minHeight: "150px", background: "#f4f4f4" }
      : { display: "none" }
    }>
    <div className='card bg-light'>
     <SectionManager
      onChangeA={onChangeA}
      onChangeButton={onChangeButton}
      onChangeP={onChangeP}
      onChangeH={onChangeH}
      onChangeIcon={onChangeIcon}
      onChangeImg={onChangeImg}
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
      component={component}
     />
    </div>
   </div>
  </div>
 );
};

export default SiteForm;
