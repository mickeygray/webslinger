import React from "react";
import { StyledContactUs } from "./ContactUs.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../state/globals";
import { theme } from "../../../state/theme";

const ContactUs = ({ section, contactStyle }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledContactUs>
        {contactStyle === "dropdowncontact" ? (
          <div class='dropdown-contact'>
            <img src={section.img} alt='' />
            <div className='figcaption'>
              <div>
                <a href='#'>
                  <i class='ion-image'></i>
                </a>
                <a href='#'>
                  <i class='ion-person-add'></i>
                </a>
                <a href='#'>
                  <i class='ion-map'></i>
                </a>
              </div>
              <h2>
                {section.heading}
                <span>{section.heading}</span>
              </h2>
            </div>
          </div>
        ) : (
          ""
        )}
      </StyledContactUs>
    </ThemeProvider>
  );
};

export default ContactUs;
