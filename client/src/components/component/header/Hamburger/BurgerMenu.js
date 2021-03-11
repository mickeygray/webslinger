import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "../../state/useOnClickOutside";
import { GlobalStyles } from "../../state/globals";
import { useTheme } from "../../state/useTheme";
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
