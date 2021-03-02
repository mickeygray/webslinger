import React, { useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "../../state/useOnClickOutside";
import { GlobalStyles } from "../../state/globals";
import { theme } from "../../state/theme";
import Hamburger from "./Hamburger";
import Menu from "./Menu";
const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div ref={node}>
          <Hamburger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </>
    </ThemeProvider>
  );
};
export default BurgerMenu;
