import React, {
 useState,
 useCallback,
 useContext,
 useEffect,
 useRef,
 Fragment,
} from "react";
import ReactDOM from "react-dom";
import SiteContext from "../../context/site/siteContext";
import { useAppContext } from "../../context/site/SiteState";
import ImageContext from "../../context/image/imageContext";
import SiteManager from "./SiteManager";
import PageManager from "./PageManager";
import ComponentList from "./ComponentList";
import ComponentViewer from "./ComponentViewer";
import AuthContext from "../../context/auth/authContext";
import ColorPalletPicker from "./ColorPalletPicker";
import FontStylePicker from "./FontStylePicker";
import { useTheme } from "../../context/site/hooks/useTheme";
import SectionManager from "./SectionManager";
import StateManager from "./StateManager";
import ContentManager from "./ContentManager";
import WebFont from "webfontloader";
import CSSBar from "./CSSBar";
import ReactDOMServer from "react-dom/server";
import parse from "html-react-parser";
import { _uniq } from "lodash";
import { useComponentContext } from "../component/state/componentState";
import { v4 as uuidV4 } from "uuid";
import SecViewer from "./SecViewer";
import _ from "lodash";
import Pagination from "../layout/Pagination";
const SiteForm = () => {
 const { themeChange, setThemeChange, getFonts } = useTheme();
 const { user } = useContext(AuthContext);
 const userid = user._id;

 const { components } = useComponentContext();
 const { NewComponent, setComponentString, userState } = useAppContext();

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
  componentImages,
  getComponentImage,
  clearComponentImages,
 } = imageContext;

 const {
  setCurrentFont,
  setCurrentPallet,
  clearCurrentComponent,
  currentComponent,
  postComponent,
  putComponent,
  clearComponentContent,
  myComponents,
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
  getComponents,
  addRow,
  deleteColumn,
  deleteRow,
  cellStructure,
  setPageId,

  pages,
 } = siteContext;

 //console.log();

 useEffect(() => {
  if (userid !== null) {
   //getSites(userid);
   //getPages(userid);
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
 const [nodeView, setNodeView] = useState(true);
 const [newComponentName, setNewComponentName] = useState("");
 const [newArea, setNewArea] = useState("");
 const [saveState, setSaveModalState] = useState(false);
 const [LoadedComponents, setLoadedComponents] = useState([]);
 const [styleTags, setStyleTags] = useState([]);

 const [site, setSite] = useState({
  name: "",
  url: "",
  type: "",
  staticAssets: [],
  pages: [],
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

 useEffect(() => {
  if (VariableComponent != null) {
   setComponents((prevState) => [...prevState, VariableComponent]);
   setVariableComponent(null);
  }
 }, [VariableComponent]);

 const onChangeH = (i, e, delCheck, key, current) => {
  const { value, name } = e.currentTarget;
  let newResults = [...h];

  if (current === "current") {
   newResults[i] = {
    ...newResults[i],
    [key]: delCheck,
   };
  }

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

 const onChangeP = (i, e, delCheck, font, current) => {
  const { value, name } = e.currentTarget;
  let newResults = [...p];
  if (typeof delCheck !== "number" && !currentContent) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  } else if (font === "font") {
   newResults[i] = {
    ...newResults[i],
    ["font"]: delCheck,
   };
  } else if (current === "current") {
   newResults[i] = {
    ...newResults[i],
    [font]: delCheck,
   };
  } else if (components.map((comp) => comp.name).includes(delCheck)) {
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
  } else {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
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
 const onChangeA = (i, e, delCheck, key, current) => {
  //STYLE AS BUTTON TOGGLE FOR EXTERNAL LINKS
  const { value, name } = e.currentTarget;
  let newResults = [...a];
  if (!delCheck) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }
  if (current === "current") {
   newResults[i] = {
    ...newResults[i],
    [key]: delCheck,
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
 const onChangeButton = (i, e, delCheck, check, current) => {
  const { value, name } = e.currentTarget;

  let newResults = [...button];

  if (!delCheck) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (current === "current") {
   newResults[i] = {
    ...newResults[i],
    [check]: delCheck,
   };
  }

  if (check === "font") {
   newResults[i] = {
    ...newResults[i],
    ["font"]: delCheck,
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
  console.log(img);
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

 const onChangeVid = (i, e, delCheck, key, current) => {
  const { value, name } = e.currentTarget;
  let newResults = [...vid];
  if (!delCheck) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (current === "current") {
   newResults[i] = {
    ...newResults[i],
    [key]: delCheck,
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

 const onChangeLi = (i, e, delCheck, key, current) => {
  const { value, name } = e.currentTarget;
  let newResults = [...li];
  if (!delCheck) {
   newResults[i] = {
    ...newResults[i],
    [name]: value,
   };
  }

  if (current === "current") {
   newResults[i] = {
    ...newResults[i],
    [key]: delCheck,
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
  html: NewComponent ? NewComponent.html : null,
  user: userid,
  content: NewComponent ? NewComponent.content : null,
  userState: NewComponent ? NewComponent.userState : null,
  p,
  h,
  icon,
  a,
  img,
  vid,
  li,
  button,
  component,
  name: newComponentName,
  area: newArea,
 };

 console.log(newArea);
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

 const toggleDisplayState = useCallback((e) => {
  setDisplayState(e.target.value);
 }, []);

 /*   <div className='card bg-light'>
    <div className='my-1'>
     {sites && <SiteList changeDisplay={changeDisplay} />}
    </div>
    <div className='my-1'>
     {pages && <PageList changeDisplay={changeDisplay} />}
    </div>

   </div>*/

 /*
   <div className='bg-light'  >

           */
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage, setPostsPerPage] = useState(1);

 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 const currentPagePage =
  pages && pages.slice(indexOfFirstPost, indexOfLastPost);

 const index = pages && pages.findIndex((x) => x.id === currentPagePage[0].id);
 return (
  <div style={{ minHeight: "250vh", postion: "absolute" }}>
   <div
    className='bg-light'
    style={
     displayState === "component"
      ? { background: "#f4f4f4" }
      : { display: "none" }
    }>
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
         name='gridViewToggle'
         onClick={() => setGridViewToggle((prevState) => !prevState)}
         checked={gridViewToggle === true}
        />
        <br />
        <label htmlFor='years' style={{ textSize: "5px" }}>
         Node
        </label>
        <input
         type='checkbox'
         name='nodeView'
         onClick={() => setNodeView((prevState) => !prevState)}
         checked={nodeView === true}
        />
       </li>
       <li className='py-1 mx'>
        {saveState === false ? (
         <button
          className='btn btn-dark btn-block'
          onClick={() => setSaveModalState((prevState) => !prevState)}>
          Save
         </button>
        ) : (
         <div className='card bg-primary lead'>
          <span style={{ float: "right" }} className='lead bg-light' />
          <a onClick={() => setSaveModalState((prevState) => !prevState)}>X</a>
          <h5>Name Your Component</h5>
          <input
           type='text'
           name='newComponentName'
           value={newComponentName}
           onChange={(e) => setNewComponentName(e.target.value)}
          />
          <h5>Assign Primary Area </h5>
          <select onChange={(e) => setNewArea(e.target.value)}>
           <option></option>

           <option value='nav'>Nav</option>
           <option value='header'>Header</option>
           <option value='main'>Main</option>
           <option value='footer'>Footer</option>
           <option value='article'>Article</option>
          </select>

          {displayState === "component" && (
           <button
            className='btn btn-block btn-dark'
            onClick={() => postComponent(section)}>
            Save New Component
           </button>
          )}
         </div>
        )}
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
   {displayState === "page" ? (
    <div>
     <CSSBar
      toggleDisplayState={toggleDisplayState}
      pallet={pallet}
      pages={pages}
      index={index}
      font={font}
     />
    </div>
   ) : (
    ""
   )}
   {gridViewToggle === true ? (
    <div className='grid-2 bg-secondary'>
     <Fragment>
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
     </Fragment>

     <Fragment>
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
     </Fragment>
    </div>
   ) : (
    ""
   )}
   <div className='grid-3b'>
    <div
     style={
      displayState === "component"
       ? { background: "#f4f4f4" }
       : { display: "none" }
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
     <div>
      <StateManager />
     </div>
    </div>

    <div>
     <div
      style={
       displayState === "component"
        ? {
           marginLeft: "-250px",
           width: "100vw",
           minHeight: "75vh",
           overflowY: "scroll",
           zIndex: `${parseInt(viewIndex)}`,
           position: "absolute",
          }
        : {
           marginLeft: "-200px",
           width: "100vw",
           overflow: "scroll",
           height: "100%",
           zIndex: `9999999999`,
           position: "absolute",
          }
      }>
      <div
       style={
        displayState === "component"
         ? {
            left: "235px",
            top: "20",
            width: "49vw",
            height: "100vh",
            zIndex: `${parseInt(viewIndex)}`,
            position: "relative",
            border: "3px dotted #333",
           }
         : {
            left: "0",
            top: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "99999999999",
            position: "relative",
           }
       }>
       {displayState === "component" ? (
        <SecViewer
         setStyleTags={setStyleTags}
         a={a}
         icon={icon}
         li={li}
         p={p}
         h={h}
         nodeView={nodeView}
         vid={vid}
         img={img}
         button={button}
         font={font}
         pallet={pallet}
         component={component}
        />
       ) : (
        <div>
         <Pagination
          postsPerPage={postsPerPage}
          totalPosts={pages && pages.length}
          paginate={paginate}
          setPageId={setPageId}
          pages={pages}
         />
         <div
          style={{
           border: "3px dotted #333",
           width: "100vw",
           minHeight: "100vh",
          }}>
          {pages &&
           currentPagePage.map((page) => (
            <ComponentViewer pg={page} key={page.id} />
           ))}
         </div>
        </div>
       )}
      </div>
     </div>
    </div>
    <div
     style={
      displayState === "component"
       ? { background: "#f4f4f4" }
       : { display: "none" }
     }>
     <ContentManager />
    </div>
   </div>
   <div
    style={
     displayState === "component"
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
   </div>{" "}
   <div style={{ position: "relative", top: "100vh" }} className='my-1'>
    {myComponents && <ComponentList />}
   </div>
  </div>
 );
};

export default SiteForm;
