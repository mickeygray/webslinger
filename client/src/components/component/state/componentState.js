import HeroImage from "../hero/HeroImage/HeroImage";
import HeroText from "../hero/HeroText/HeroText";
import Button1 from "../header/Button/Button1";
import Button2 from "../header/Button/Button2";
import Dropdown from "../header/Dropdown/StyledDropdown";
import BurgerMenu from "../header/Hamburger/BurgerMenu";
import AnimatedLogo from "../header/LogoBox/AnimatedLogo";
import SiteName from "../header/LogoBox/SiteName";
import VerticalNavlinks from "../header/VerticalNavlinks/VerticalNavlinks";
import StickyNavbar from "../header/StickyNavbar";
import ContactUs from "../body/about/ContactUs/ContactUs";
import ThemeButton from "../body/common/Buttons/ThemeButton";
import ServiceBox from "../body/firm/Services/ServiceBox";
import ImageShell from "../body/gallary/ImageShell/ImageShell";
import BouncySiteLinks from "../body/home/SiteLinks/BouncySiteLinks";
import GradientPillSiteLinks from "../body/home/SiteLinks/GradientPillSiteLinks";
import LayoverBoxSiteLinks from "../body/home/SiteLinks/LayoverBoxSiteLinks";
import SlidingSiteLinks from "../body/home/SiteLinks/SlidingSiteLinks";
import BigSocialLinks from "../body/home/SocialLinks/BigSocialLinks";
import SmallSocialLinks from "../body/home/SocialLinks/SmallSocialLinks";
import QuizBackdrop from "../body/quiz/QuizBackdrop/QuizBackdrop";
import { createContext, useContext, useReducer } from "react";
import SiteForm from "../../sites/SiteForm";

const ComponentContext = createContext();

export function ComponentWrapper({ children }) {
  const components = [
    {
      name: "Hero Image",
      func: HeroImage,
      styles: [
        { compStyle: "dualImage", els: ["img", "img", "h1"] },
        { compStyle: "layoverfade", els: ["img", "p", "h1", "a"] },
        { compStyle: "focusedlayover", els: ["img", "p", "h2"] },
      ],
    },
    {
      name: "Hero Text",
      func: HeroText,
      styles: [
        { compStyle: "halfhalf", els: ["h1", "h1"] },
        { compStyle: "vertical", els: ["h2", "h2"] },
        { compStyle: "halfhalf-animated", els: ["p"] },
        { compStyle: "rainbowshadow", els: ["p"] },
        { compStyle: "dimension-primary", els: ["p"] },
        { compStyle: "dimension-danger", els: ["p"] },
        { compStyle: "dimension-success", els: ["p"] },
        { compStyle: "dimension-dark", els: ["p"] },
        { compStyle: "dimension-light", els: ["p"] },
        { compStyle: "textinacircle-primary", els: ["p"] },
        { compStyle: "textinacircle-danger", els: ["p"] },
        { compStyle: "textinacircle-success", els: ["p"] },
        { compStyle: "textinacircle-dark", els: ["p"] },
        { compStyle: "textinacirlce-light", els: ["p"] },
        { compStyle: "deconstructed-primary", els: ["p"] },
        { compStyle: "deconstructed-danger", els: ["p"] },
        { compStyle: "deconstructed-success", els: ["p"] },
        { compStyle: "deconstructed-dark", els: ["p"] },
        { compStyle: "deconstructed-light", els: ["p"] },
        { compStyle: "textreveal", els: ["h1"] },
        { compStyle: "shortbounce", els: ["h1"] },
      ],
    },
    { name: "Button1", func: Button1, els: ["i", "button"] },
    {
      name: "Contact Us",
      func: ContactUs,
      els: ["img", "a", "i", "a", "i", "a", "i"],
    },
    { name: "Button2", func: Button2, els: ["i", "button"] },
    {
      name: "Dropdown",
      func: Dropdown,
      els: ["a", "a", "a", "a", "a", "a"],
    },
    {
      name: "BurgerMenu",
      func: BurgerMenu,
      els: ["a", "a", "a", "a", "a", "a"],
    },
    {
      name: "Animated Logo",
      func: AnimatedLogo,
      styles: [
        { compStyle: "logostack", els: ["img", "img", "img", "img"] },
        { compStyle: "imageset", els: ["a", "img", "i"] },
      ],
    },
    {
      name: "Site Name",
      func: SiteName,
      styles: [
        { compStyle: "vertical", els: ["h2", "h2"] },
        { compStyle: "halfhalf-animated", els: ["p"] },
        { compStyle: "rainbowshadow", els: ["p"] },
        { compStyle: "shiningtext", els: ["p"] },
        { compStyle: "typographyanimation", els: ["p"] },
        { compStyle: "popart", els: ["p"] },
        { compStyle: "dimension-primary", els: ["p"] },
        { compStyle: "dimension-danger", els: ["p"] },
        { compStyle: "dimension-success", els: ["p"] },
        { compStyle: "dimension-dark", els: ["p"] },
        { compStyle: "dimension-light", els: ["p"] },
        { compStyle: "textinacircle-primary", els: ["p"] },
        { compStyle: "textinacircle-danger", els: ["p"] },
        { compStyle: "textinacircle-success", els: ["p"] },
        { compStyle: "textinacircle-dark", els: ["p"] },
        { compStyle: "textinacirlce-light", els: ["p"] },
        { compStyle: "deconstructed-primary", els: ["p"] },
        { compStyle: "deconstructed-danger", els: ["p"] },
        { compStyle: "deconstructed-success", els: ["p"] },
        { compStyle: "deconstructed-dark", els: ["p"] },
        { compStyle: "deconstructed-light", els: ["p"] },
        { compStyle: "threeD", els: ["p"] },
      ],
    },
    {
      name: "Vertical Navlinks",
      func: VerticalNavlinks,
      els: ["li", "li", "li"],
    },
    { name: "Sticky Navbar", func: StickyNavbar },
    {
      name: "Theme Button",
      func: ThemeButton,
      els: ["i", "button"],
    },
    {
      name: "Service Box",
      func: ServiceBox,
      styles: [
        { compStyle: "simplelayover", els: ["h3", "p", "img", "a"] },
        { compStyle: "layovercollapse", els: ["img", "h3", "p", "a"] },
        { compStyle: "imageopen", els: ["img", "h3", "p", "a"] },
      ],
    },
    {
      name: "Image Shell",
      func: ImageShell,
      styles: [
        { compStyle: "logostack", els: ["img", "img", "img", "img"] },
        { compStyle: "horizontalimg", els: ["img"] },
        { compStyle: "reflexive", els: ["img", "a"] },
        { compStyle: "expandingcircle", els: ["img", "h3", "p", "a"] },
        { compStyle: "imageselector", els: ["img", "radio"] },
        { compStyle: "imageexpander", els: ["img"] },
      ],
    },
    {
      name: "Bouncy Multi Button",
      func: BouncySiteLinks,
      els: ["button", "i", "button", "i", "button", "i"],
    },
    {
      name: "Gradient Pill Multi Button",
      func: GradientPillSiteLinks,
      els: ["button", "i", "button", "i", "button", "i"],
    },
    {
      name: "Layover Box Multi Button",
      func: LayoverBoxSiteLinks,
      els: ["a", "img", "h2", "p"],
    },
    {
      name: "Sliding Multi Button",
      func: SlidingSiteLinks,
      els: ["button", "i", "button", "i", "button", "i"],
    },
    {
      name: "Big Social Links",
      func: BigSocialLinks,
      els: ["a", "a", "a", "a"],
    },
    {
      name: "Small Social Links",
      func: SmallSocialLinks,
      els: ["a", "a", "a", "a"],
    },
    {
      name: "Quiz Backdrop",
      func: QuizBackdrop,
      els: ["a", "img", "i"],
    },
  ];

  const props = { components };

  return (
    <ComponentContext.Provider value={props}>
      {children}
    </ComponentContext.Provider>
  );
}

export function useComponentContext() {
  return useContext(ComponentContext);
}
