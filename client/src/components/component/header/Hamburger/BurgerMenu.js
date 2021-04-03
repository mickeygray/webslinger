import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "../../../../context/site/hooks/useOnClickOutside";
import { GlobalStyles } from "../../../../context/site/hooks/globals";
import { useTheme } from "../../../../context/site/hooks/useTheme";
import Hamburger from "./Hamburger";
import Menu from "./Menu";
const BurgerMenu = ({ pallet, font, h, p, icon, a, button, li, img, vid }) => {
 const [open, setOpen] = useState(false);
 const node = useRef();
 useOnClickOutside(node, () => setOpen(false));
 const { theme } = useTheme();
 return (
  <>
   <div ref={node}>
    <Hamburger open={open} setOpen={setOpen} />
    <Menu open={open} setOpen={setOpen} />
   </div>
  </>
 );
};
export default BurgerMenu;
