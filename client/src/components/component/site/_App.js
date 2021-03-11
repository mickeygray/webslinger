import React, { Fragment, useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "../state/useTheme";
import { GlobalStyles } from "../state/globals";
import WebFont from "webfontloader";

const App = ({ current }) => {
  const { themeChange, setThemeChange, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState({
    primary: "",
    dark: "",
    light: "",
    danger: "",
    success: "",
    font: "",
  });

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts(),
      },
    });
  });

  return (
    <Fragment>
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />

        <Site>
          <nav>
            <Navbar></Navbar>
          </nav>
          <header>
            <Hero></Hero>
          </header>
          <main>
            <Body></Body>
          </main>
          <footer>
            <Footer></Footer>
          </footer>
        </Site>
      </ThemeProvider>
    </Fragment>
  );
};
export default App;

const Site = styled.div`
  .grid {
    display: grid;
    grid-template-areas: 
    "nav nav nav nav nav"
    "header header header header header"
    "header header header header header"
    "header header header header header"
    "main main main main main"
    "main main main main main"
    "main main main main main"
    "main main main main main"
    "main main main main main"
    "main main main main main"
    "footer footer footer footer footer"
    grid-gap: 1em;
  }

  nav { 
    grid-area: nav
  }
  header {
    grid-area: header
  }
  main {
    grid-area: main
  }
  footer {
    grid-area: footer
  }

  @media all and (max-width: 700px) {
    body {
      grid-column: 1 / 4;
    }
  }

  /* Demo Specific Styles */
`;

const Navbar = styled.nav`

    display: grid;
    grid-template-areas: 
    "logobox nav1 nav2 sitelinks sitelinks"
    grid-gap: 1em;
  

  @media all and (max-width: 700px) {
    nav {
      grid-template-rows: 4
    }
  }

  /* Demo Specific Styles */
`;
const Hero = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  grid-template-rows: repeat(7, minmax(100px, 1fr));
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  grid-auto-rows: 75px;
  grid-auto-flow: dense;
  .header {
    grid-area: 4 / 4 / 5 / 5;
  }
  .hero {
    grid-area: 3 / 3 / 4 / 5;
  }
  .body {
    grid-area: 3 / 5 / 5 / 6;
  }
  .footer {
    grid-area: 5 / 4 / 6 / 6;
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  grid-template-rows: repeat(7, minmax(100px, 1fr));
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  grid-auto-rows: 75px;
  grid-auto-flow: dense;
  .header {
    grid-area: 4 / 4 / 5 / 5;
  }
  .hero {
    grid-area: 3 / 3 / 4 / 5;
  }
  .body {
    grid-area: 3 / 5 / 5 / 6;
  }
  .footer {
    grid-area: 5 / 4 / 6 / 6;
  }
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  grid-template-rows: repeat(7, minmax(100px, 1fr));
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  grid-auto-rows: 75px;
  grid-auto-flow: dense;
  .header {
    grid-area: 4 / 4 / 5 / 5;
  }
  .hero {
    grid-area: 3 / 3 / 4 / 5;
  }
  .body {
    grid-area: 3 / 5 / 5 / 6;
  }
  .footer {
    grid-area: 5 / 4 / 6 / 6;
  }
`;
