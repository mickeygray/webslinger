import React, { useContext } from "react";
import styled from "styled-components";
import { AppWrapper } from "../state/appState";
import { ComponentWrapper } from "../state/componentState";
import SiteContext from "../../../context/site/siteContext";

import Site from "./Site";
import { ContentWrapper } from "../state/contentState";
const App = ({ _id }) => {
  const { current } = useContext(SiteContext);
  return (
    <AppWrapper>
      <ComponentWrapper>
        <ContentWrapper>
          <Site current={current} />
        </ContentWrapper>
      </ComponentWrapper>
    </AppWrapper>
  );
};
export default App;
