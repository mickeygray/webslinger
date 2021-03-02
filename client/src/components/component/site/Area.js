import React, { useState } from "react";
import styled from "styled-components";
import { useComponentContext } from "../state/componentState";

const Area = ({ area, content }) => {
  const { components } = useComponentContext();
  const [sections, setSections] = useState([{ ...section }]);
  const section = {
    areaName: "",
    components: components,
    content: content,
  };

  return (
    <Area>
      {() => {
        switch (area.areaName) {
          case "header":
            return <Header sections={sections} />;
          case "hero":
            return <Hero sections={sections} />;
          case "body":
            return <Body sections={sections} />;
          case "footer":
            return <Footer sections={sections} />;
          default:
            return "Please See Administration About Non-functioning component";
        }
      }}
    </Area>
  );
};
const Header = styled.div`
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

export default Area;
