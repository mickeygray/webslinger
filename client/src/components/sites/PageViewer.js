import React, { Fragment, useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

const PageViewer = ({ page }) => {
  const [selectedTheme, setSelectedTheme] = useState({
    primary: "",
    dark: "",
    light: "",
    danger: "",
    success: "",
    font: "",
  });

  const { areas } = page;

  return (
    <Fragment>
      <Page>
        {Object.keys(areas).map((area) =>
          Object.values(areas).map((sections) => {
            sections
              .filter((section) => {
                section.area = area;
              })
              .map((child) => {
                let obj;
                if (area === "head") {
                  obj.code = <meta name={child.tag} content={child.content} />;
                } else if (area === "nav") {
                  obj.code = Object.values(child).map((props) => {
                    const ComponentName = child.func;
                    return (
                      <nav>
                        <Navbar>
                          <ComponentName {...props}></ComponentName>
                        </Navbar>
                      </nav>
                    );
                  });
                } else if (area === "footer") {
                  obj.code = Object.values(child).map((props) => {
                    const ComponentName = child.func;
                    return (
                      <footer>
                        <Footer>
                          <ComponentName {...props}></ComponentName>
                        </Footer>
                      </footer>
                    );
                  });
                } else if (area === "main") {
                  obj.code = Object.values(child).map((props) => {
                    const ComponentName = child.func;
                    return (
                      <main>
                        <Body>
                          <ComponentName {...props}></ComponentName>
                        </Body>
                      </main>
                    );
                  });
                } else if (area === "header") {
                  obj.code = Object.values(child).map((props) => {
                    const ComponentName = child.func;
                    return (
                      <header>
                        <Hero>
                          {" "}
                          <ComponentName {...props}></ComponentName>{" "}
                        </Hero>
                      </header>
                    );
                  });
                }
              });
          })
        )}
      </Page>
    </Fragment>
  );
};
export default PageViewer;

const Page = styled.div`
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
