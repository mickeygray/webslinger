import styled from "styled-components";

let name = "sdasdsadsa";
const textinacircleArray = [];
for (var i = 0; i < name.length; i++) {
  const spanItem = `.textinacircle span:nth-child(${i}) {
    --units: ${i};
    --rotationUnit: calc((1turn / var(--noOfItems)) * var(--units, 1));
    position: absolute;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    top: 1rem;
    left: 1rem;
    transform: rotate(var(--rotationUnit));
    transform-origin: center;
  }`;

  textinacircleArray.push(spanItem);
}

export const StyledHeroText = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:900i&display=swap");
  :root {
    --light: 80;
    --threshold: 60;
    --noOfItems: ${({ theme }) => theme.name.length};
  }

  body {
    --switch: calc((var(--light) - var(--threshold)) * -100%);
    background-color: hsl(0, 0%, var(--switch));
  }

  .text-success {
    color: ${({ theme }) => theme.success};
  }
  .text-danger {
    color: ${({ theme }) => theme.danger};
  }
  .text-light {
    color: ${({ theme }) => theme.light};
  }
  .text-dark {
    color: ${({ theme }) => theme.dark};
  }
  .text-secondary {
    color: ${({ theme }) => theme.secondary};
  }
  .text-primary {
    color: ${({ theme }) => theme.primary};
  }
  .text-background {
    color: ${({ theme }) => theme.background};
  }

  .text-xsmall {
    font-size: 70%;
  }
  .text-small {
    font-size: 85%;
  }
  .text-large {
    font-size: 110%;
  }
  .text-xlarge {
    font-size: 125%;
  }

  .text-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .halfhalf {
    font-family: "Inter", sans-serif;
    font-size: 8vw;
    font-weight: 900;
    display: block;
    padding: 0.5em;
  }

  .halfhalf:nth-child(2) {
    position: absolute;
    clip-path: inset(-1% -1% 50% -1%);
  }

  .halfhalf p {
    font-size: 2vw;
    font-weight: 900;
    margin-top: 1em;
    text-align: center;
    span {
      display: block;
      transform: rotate(90deg);
      margin-top: 0.25em;
    }
  }

  .rotate {
    transform: rotate(180deg);
  }

  .vertical {
    display: grid;
    height: 100%;
    justify-content: center;
    align-content: center;
    grid-template-columns: max-content max-content;
  }

  .vertical h2 {
    font-size: 100px;
    margin: 0;
    writing-mode: vertical-lr;
    text-align: center;
    line-height: 0.9;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.dark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.hover};
    }
  }

  .main {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .main p {
    cursor: pointer;
    position: relative;
    display: inline-block;
    font-size: 3rem;
    background: linear-gradient(to bottom, #000, #000 60%, #fff 60%, #fff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-repeat: no-repeat;
    transition: background 0.2s ease-out;
    white-space: nowrap;
  }

  span {
    position: relative;
  }

  .main p span:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 15px;
    background: #000;
    bottom: 9px;
    transition: all 0.2s ease-out;
  }

  .main p:hover {
    background-position: 0 11px;
  }

  .main span:hover:before {
    transform: translateY(10px);
  }

  .rainbowshadow {
    font-size: 15rem;
    text-align: center;
    height: 90vh;
    line-height: 90vh;
    color: #fcedd8;
    background: #d52e3f;
    font-family: "Niconne", cursive;
    font-weight: 700;
    text-shadow: 5px 5px 0px #eb452b, 10px 10px 0px #efa032,
      15px 15px 0px #46b59b, 20px 20px 0px #017e7f, 25px 25px 0px #052939,
      30px 30px 0px #c11a2b, 35px 35px 0px #c11a2b, 40px 40px 0px #c11a2b,
      45px 45px 0px #c11a2b;
  }

  .popart {
    font-family: "Montserrat", sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 120px;
    letter-spacing: 0.1em;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: white;
    text-shadow: 8px 8px #ff1f8f, 20px 20px #000000;
  }

  .dimensioncolors {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    --switch: calc((var(--light) - var(--threshold)) * -100%);
    color: hsl(0, 0%, var(--switch));
  }

  .dimensioncolors-primary {
    font-size: 10vw;
    text-shadow: 4px 4px 0px ${({ theme }) => theme.primary};
    mix-blend-mode: screen;
    animation: fadeIn 2.5s linear forwards;
  }

  .dimensioncolors-secondary {
    font-size: 10vw;
    text-shadow: 4px 4px 0px ${({ theme }) => theme.secondary};
    mix-blend-mode: screen;
    animation: fadeIn 2.5s linear forwards;
  }

  .dimensioncolors-dark {
    font-size: 10vw;
    text-shadow: 4px 4px 0px ${({ theme }) => theme.dark};
    mix-blend-mode: screen;
    animation: fadeIn 2.5s linear forwards;
  }

  .dimensioncolors-success {
    font-size: 10vw;
    text-shadow: 4px 4px 0px ${({ theme }) => theme.success};
    mix-blend-mode: screen;
    animation: fadeIn 2.5s linear forwards;
  }

  .dimensioncolors-light {
    font-size: 10vw;
    text-shadow: 4px 4px 0px ${({ theme }) => theme.light};
    mix-blend-mode: screen;
    animation: fadeIn 2.5s linear forwards;
  }
  .dimensioncolors-danger {
    font-size: 10vw;
    text-shadow: 4px 4px 0px ${({ theme }) => theme.danger};
    mix-blend-mode: screen;
    animation: fadeIn 2.5s linear forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .textinacircle {
    width: 28rem;
    height: 28rem;
    position: relative;
    text-align: center;
    background: radial-gradient(${({ theme }) => theme.danger}, red);
    color: white;
    border-radius: 50%;
  }

  .textinacircle span {
    --units: 1;
    --rotationUnit: calc((1turn / var(--noOfItems)) * var(--units, 1));
    position: absolute;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    top: 1rem;
    left: 1rem;
    transform: rotate(var(--rotationUnit));
    transform-origin: center;
  }

  ${textinacircleArray.map((span) => span)}

  .deconstructedContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
  }

  .deconstructed {
    position: relative;
    margin: auto;
    height: 0.71em;
    color: transparent;
    font-family: "Cambay", sans-serif;
    font-size: 10vw;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.03em;
  }

  .deconstructed > .primary {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.primary};
    pointer-events: none;
  }

  .deconstructed > .secondary {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.secondary};
    pointer-events: none;
  }
  .deconstructed > .light {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.light};
    pointer-events: none;
  }
  .deconstructed > .dark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.dark};
    pointer-events: none;
  }
  .deconstructed > .success {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.success};
    pointer-events: none;
  }
  .deconstructed > .danger {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${({ theme }) => theme.danger};
    pointer-events: none;
  }

  .deconstructed > div:nth-child(1) {
    -webkit-mask-image: linear-gradient(black 25%, transparent 25%);
    mask-image: linear-gradient(black 25%, transparent 25%);
    animation: deconstructed1 5s infinite;
  }

  .deconstructed > div:nth-child(2) {
    -webkit-mask-image: linear-gradient(
      transparent 25%,
      black 25%,
      black 50%,
      transparent 50%
    );
    mask-image: linear-gradient(
      transparent 25%,
      black 25%,
      black 50%,
      transparent 50%
    );
    animation: deconstructed2 5s infinite;
  }

  .deconstructed > div:nth-child(3) {
    -webkit-mask-image: linear-gradient(
      transparent 50%,
      black 50%,
      black 75%,
      transparent 75%
    );
    mask-image: linear-gradient(
      transparent 50%,
      black 50%,
      black 75%,
      transparent 75%
    );
    animation: deconstructed3 5s infinite;
  }

  .deconstructed > div:nth-child(4) {
    -webkit-mask-image: linear-gradient(transparent 75%, black 75%);
    mask-image: linear-gradient(transparent 75%, black 75%);
    animation: deconstructed4 5s infinite;
  }

  @keyframes deconstructed1 {
    0% {
      transform: translateX(100%);
    }
    26% {
      transform: translateX(0%);
    }
    83% {
      transform: translateX(-0.1%);
    }
    100% {
      transform: translateX(-120%);
    }
  }

  @keyframes deconstructed2 {
    0% {
      transform: translateX(100%);
    }
    24% {
      transform: translateX(0.5%);
    }
    82% {
      transform: translateX(-0.2%);
    }
    100% {
      transform: translateX(-125%);
    }
  }

  @keyframes deconstructed3 {
    0% {
      transform: translateX(100%);
    }
    22% {
      transform: translateX(0%);
    }
    81% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-130%);
    }
  }

  @keyframes deconstructed4 {
    0% {
      transform: translateX(100%);
    }
    20% {
      transform: translateX(0%);
    }
    80% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-135%);
    }
  }

  .textreveal {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    color: #000;
    background-color: ${({ theme }) => theme.background};
    font-family: ${({ theme }) => theme.font};
  }

  .textreveal h1 {
    font-size: 3em;
    font-weight: normal;
  }

  /* title styles */
  .textreveal .home-title span {
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 1.2;
  }

  .textreveal .home-title span::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: white;
    animation: a-ltr-after 2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
    transform: translateX(-101%);
  }

  .textreveal .home-title span::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    animation: a-ltr-before 2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
    transform: translateX(0);
  }

  .textreveal .home-title span:nth-of-type(1)::before,
  .textreveal .home-title span:nth-of-type(1)::after {
    animation-delay: 1s;
  }

  .textreveal .home-title span:nth-of-type(2)::before,
  .textreveal .home-title span:nth-of-type(2)::after {
    animation-delay: 1.5s;
  }

  @keyframes a-ltr-after {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(101%);
    }
  }

  @keyframes a-ltr-before {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(200%);
    }
  }

  .wrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 80em;
  }

  .wrapper .textbox {
    display: flex;
    flex-direction: column;
    float: left;
    justify-content: center;
    min-height: 100vh;
    padding: 1em;
    width: 100%;
  }

  .wrapper .textbox h1 {
    animation: text-shadow 1.5s ease-in-out infinite;
    font-size: 5em;
    font-weight: 900;
    line-height: 1;
  }

  .wrapper .textbox h1:hover {
    animation-play-state: paused;
  }

  @keyframes text-shadow {
    0% {
      transform: translateY(0);
      text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b, 0 0 0 #fefc4b;
    }

    20% {
      transform: translateY(-1em);
      text-shadow: 0 0.125em 0 #0c2ffb, 0 0.25em 0 #2cfcfd, 0 -0.125em 0 #fb203b,
        0 -0.25em 0 #fefc4b;
    }

    40% {
      transform: translateY(0.5em);
      text-shadow: 0 -0.0625em 0 #0c2ffb, 0 -0.125em 0 #2cfcfd,
        0 0.0625em 0 #fb203b, 0 0.125em 0 #fefc4b;
    }

    60% {
      transform: translateY(-0.25em);
      text-shadow: 0 0.03125em 0 #0c2ffb, 0 0.0625em 0 #2cfcfd,
        0 -0.03125em 0 #fb203b, 0 -0.0625em 0 #fefc4b;
    }

    80% {
      transform: translateY(0);
      text-shadow: 0 0 0 #0c2ffb, 0 0 0 #2cfcfd, 0 0 0 #fb203b, 0 0 0 #fefc4b;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`;
