import styled from "styled-components";

export const StyledContactUs = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Raleway:400,200,300,800);
  @import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
  .dropdown-contact {
    font-family: "Raleway", Arial, sans-serif;
    color: #fff;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 220px;
    max-width: 310px;
    max-height: 220px;
    width: 100%;
    background: #000000;
  }
  .dropdown-contact * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .dropdown-contact img {
    opacity: 1;
    width: 100%;
    -webkit-transition: opacity 0.35s;
    transition: opacity 0.35s;
  }
  .dropdown-contact .figcaption {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;
  }
  .dropdown-contact .figcaption h2 {
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    margin: 0;
    padding: 20px 15px;
    position: absolute;
    font-size: 1em;
    bottom: 35%;
    right: 30px;
    left: 30px;
    word-spacing: -0.1em;
    font-weight: 300;
    text-transform: uppercase;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.85);
    background-color: #000000;
    -webkit-transition: -webkit-transform 0.35s;
    transition: -webkit-transform 0.35s, -moz-transform 0.35s,
      -o-transform 0.35s, transform 0.35s;
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  .dropdown-contact .figcaption h2 span {
    font-weight: 800;
  }
  .dropdown-contact .figcaption > div {
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    position: absolute;
    left: 45px;
    right: 45px;
    bottom: 40px;
    text-align: center;
    padding: 5px;
    -webkit-transition: -webkit-transform 0.35s;
    transition: -webkit-transform 0.35s, -moz-transform 0.35s,
      -o-transform 0.35s, transform 0.35s;
    -webkit-transform: translate(0, -40px);
    transform: translate(0, -40px);
  }
  .dropdown-contact .figcaption > div i {
    font-size: 23px;
    padding: 6px;
    color: #000000;
    opacity: 0;
    position: relative;
    top: -50px;
    -webkit-transition: top 0.35s, opacity 0.35s;
    transition: top 0.35s, opacity 0.35s;
  }
  .dropdown-contact .figcaption a {
    opacity: 0.8;
  }
  .dropdown-contact .figcaption a:hover {
    opacity: 1;
  }
  .dropdown-contact .figcaption::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
    opacity: 0;
    -webkit-transition: opacity 0.4s;
    transition: opacity 0.4s;
    background-image: linear-gradient(
      to top,
      #000000 0%,
      transparent 50%,
      #000000 100%
    );
  }
  .dropdown-contact:hover img,
  .dropdown-contact.hover img {
    opacity: 0.7;
  }
  .dropdown-contact:hover .figcaption h2,
  .dropdown-contact.hover .figcaption h2 {
    -webkit-transform: translate(0, -25%);
    transform: translate(0, -25%);
  }
  .dropdown-contact:hover .figcaption > div,
  .dropdown-contact.hover .figcaption > div {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
  }
  .dropdown-contact:hover .figcaption::before,
  .dropdown-contact.hover .figcaption::before {
    opacity: 0.8;
  }
  .dropdown-contact:hover .figcaption i,
  .dropdown-contact.hover .figcaption i {
    top: 0px;
    opacity: 0.7;
  }
  .dropdown-contact:hover a:first-child i,
  .dropdown-contact.hover a:first-child i {
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
  .dropdown-contact:hover a:nth-child(2) i,
  .dropdown-contact.hover a:nth-child(2) i {
    -webkit-transition-delay: 0.25s;
    transition-delay: 0.25s;
  }
  .dropdown-contact:hover a:nth-child(3) i,
  .dropdown-contact.hover a:nth-child(3) i {
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
  }
`;
