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
import Navbar from "../header/Navbar";
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

const ComponentContext = createContext();

export function ComponentWrapper({ children }) {
  const components = {
    HeroImage,
    HeroText,
    Button1,
    Button2,
    Dropdown,
    BurgerMenu,
    AnimatedLogo,
    SiteName,
    VerticalNavlinks,
    StickyNavbar,
    Navbar,
    ContactUs,
    ThemeButton,
    ServiceBox,
    ImageShell,
    BouncySiteLinks,
    GradientPillSiteLinks,
    LayoverBoxSiteLinks,
    SlidingSiteLinks,
    BigSocialLinks,
    SmallSocialLinks,
    QuizBackdrop,
  };

  return (
    <ComponentContext.Provider value={components}>
      {children}
    </ComponentContext.Provider>
  );
}

export function useComponentContext() {
  return useContext(ComponentContext);
}
