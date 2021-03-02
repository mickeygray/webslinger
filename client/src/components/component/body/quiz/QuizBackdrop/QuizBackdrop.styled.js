import styled from "styled-components";

export const StyledQuizBackdrop = styled.div`
  @import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
  .curl-reveal {
    color: #fff;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 220px;
    max-width: 310px;
    max-height: 220px;
    width: 100%;
    background: #000000;
    text-align: center;
  }
  .curl-reveal * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .curl-reveal img {
    opacity: 1;
    width: 100%;
    -webkit-transition: opacity 0.35s;
    transition: opacity 0.35s;
  }
  .curl-reveal > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .curl-reveal > div::before {
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
      45deg,
      #000000 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.15)
    );
  }
  .curl-reveal i {
    display: inline-block;
    font-size: 36px;
    color: #ffffff;
    padding: 6px 16px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    opacity: 0;
    z-index: 1;
    -webkit-transition: 0.05s linear;
    transition: 0.05s linear;
    -webkit-transition-delay: 0.01s;
    transition-delay: 0.01s;
  }
  .curl-reveal .curl {
    width: 0px;
    height: 0px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      225deg,
      #ffffff,
      #f3f3f3 20%,
      #bbbbbb 38%,
      #aaaaaa 44%,
      #888888 50%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.3)
    );
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: all 0.4s ease;
  }
  .curl-reveal .curl:before,
  .curl-reveal .curl:after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 12%;
    bottom: 6%;
    width: 70%;
    max-width: 300px;
    max-height: 100px;
    height: 55%;
    box-shadow: 0 12px 15px rgba(0, 0, 0, 0.3);
    transform: skew(-10deg) rotate(-6deg);
  }
  .curl-reveal .curl:after {
    left: auto;
    right: 6%;
    bottom: auto;
    top: 14%;
    transform: skew(-15deg) rotate(-84deg);
  }
  .curl-reveal a {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    color: #ffffff;
  }
  .curl-reveal:hover > div::before,
  .curl-reveal.hover > div::before {
    opacity: 1;
  }
  .curl-reveal:hover i,
  .curl-reveal.hover i {
    opacity: 0.7;
    -webkit-transition-delay: 0.15s;
    transition-delay: 0.15s;
  }
  .curl-reveal:hover .curl,
  .curl-reveal.hover .curl {
    width: 90px;
    height: 90px;
  }
`;
