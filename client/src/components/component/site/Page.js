import React, { useState, useContext } from "react";
import styled from "styled-components";
import Area from "./Area";
import { useComponentContext } from "../state/componentState";

const Page = ({ page, content }) => {
  const { components } = useContext(useComponentContext);
  const [areas, setAreas] = useState([{ ...section }]);
  const section = {
    areaName: "",
    components,
    componentSize: 0,
    componentIndex: 0,
  };

  return (
    <Body>
      {areas.map((area) => {
        return <Area content={content} key={area.areaName} area={area} />;
      })}
    </Body>
  );
};
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
export default Page;
