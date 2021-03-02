import styled from "styled-components";

let img;
let img2;

export const StyledHeroImage = styled.div`
  body {
    background: #111b25;
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    color: #fff;
    padding: 0;
    margin: 0;
  }

  .info {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  a {
    color: beige;
  }

  .w {
    margin: 0 auto;
    white-space: nowrap;
    max-width: 1200px;
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: rgba(#424242, 0.5) url(${img}) repeat fixed;
    background-position: 50% 100%;
    background-size: cover;
    position: relative;
    z-index: 5;
    font-size: 0;
  }
  .i {
    width: $itemWidth;
    height: 100%;
    display: inline-block;
    position: relative;
    z-index: 4;
    padding: 2px;
    transition: all 1.3s ease-in-out;
    background: rgba(#424242, 0.5) url(${img2}) repeat fixed;
    background-size: cover;
    background-position: 50% 100%;
    border-radius: 0%;

    &:hover {
      transition: all 0s linear;
      opacity: 0;
    }
  }
  .h {
    display: block;
    position: absolute;
    z-index: 2;
    width: 100%;
    text-align: center;
    top: 35px;
    font-size: 40px;
    color: rgba(245, 245, 220, 1);
    text-shadow: 0 5px 17px rgba(87, 87, 80, 0.85);
  }

  @import url("https://fonts.googleapis.com/css?family=Bad+Script|Bellefair|Comfortaa|Satisfy|Slabo+27px|Vidaloka");

  /* لون خلفية الصفحة */
  body {
    background: #ddcecd;
  }

  .layover-fade {
    width: auto;
    max-width: 500px;
    height: auto;
    margin: 5em auto;
    overflow: hidden;
    border: 10px solid #eee5e5;
    outline: 5px dashed #eee5e5;
    position: relative;
    z-index: 1;
  }
  .layover-fade img {
    width: 100%;
    height: 100%;
    margin-bottom: -5px;
    transition: all 0.3s ease-out;
    position: relative;
    z-index: 2;
  }

  .layover-fade img:hover {
    transform: scale(1.2, 1.2);
  }

  .layover-fade:hover img {
    transform: scale(1.2, 1.2);
    z-index: 9;
  }

  .box-text {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    padding: 10px;
    background-image: linear-gradient(
      135deg,
      rgba(129, 255, 239, 0.5) 10%,
      rgba(240, 103, 180, 0.65) 100%
    );
    opacity: 1;
    transition: 0.3s linear;
    color: #fff;
    font-family: "Bellefair", serif;
    font-family: "Satisfy", cursive;
    /* font-family: 'Slabo 27px', serif; */
    /* font-family: 'Vidaloka', serif; */
    text-shadow: 2px 2px 2px #333;
  }
  .box-text h1 {
    font-size: 2.2em;
    font-family: "Bellefair", serif;
    font-family: "Comfortaa", cursive;
  }
  .box-text p {
    font-size: 1.5em;
  }
  .box-text:hover {
    opacity: 0;
  }

  @import url(https://fonts.googleapis.com/css?family=Raleway:400,800);
  @import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
  .focused-layover {
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
    text-align: center;
  }
  .focused-layover * {
    -webkit-box-sizing: padding-box;
    box-sizing: padding-box;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .focused-layover img {
    opacity: 0.8;
    width: 100%;
  }
  .focused-layover .figcaption {
    bottom: 0;
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .focused-layover h2 {
    font-weight: 400;
    left: 0;
    right: 0;
    letter-spacing: -1px;
    margin: 0 auto;
    position: absolute;
    text-transform: uppercase;
    bottom: 50%;
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
  }
  .focused-layover h2 span {
    font-weight: 800;
  }
  .focused-layover p {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 50%;
    opacity: 0;
    font-size: 14px;
    -webkit-transform: translateY(-20%) scale(0.7);
    transform: translateY(-20%) scale(0.7);
  }
  .focused-layover .square {
    height: 78px;
    width: 78px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    -webkit-transform: rotate(45deg) translate(-50%, -50%);
    transform: rotate(45deg) translate(-50%, -50%);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .focused-layover .square:before,
  .focused-layover .square:after,
  .focused-layover .square div:before,
  .focused-layover .square div:after {
    background-color: #ffffff;
    position: absolute;
    content: "";
    display: block;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .focused-layover .square:before,
  .focused-layover .square:after {
    width: 65%;
    height: 2px;
  }
  .focused-layover .square div:before,
  .focused-layover .square div:after {
    width: 2px;
    height: 65%;
  }
  .focused-layover .square:before,
  .focused-layover .square div:before {
    left: 0;
    top: 0;
  }
  .focused-layover .square:after,
  .focused-layover .square div:after {
    bottom: 0;
    right: 0;
  }
  .focused-layover a {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .focused-layover:hover img,
  .focused-layover.hover img {
    opacity: 0.25;
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .focused-layover:hover h2,
  .focused-layover.hover h2 {
    opacity: 1;
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
  .focused-layover:hover p,
  .focused-layover.hover p {
    opacity: 1;
    -webkit-transform: translateY(0px) scale(1);
    transform: translateY(0px) scale(1);
  }
  .focused-layover:hover .square:before,
  .focused-layover.hover .square:before {
    width: 38%;
  }
  .focused-layover:hover .square div:before,
  .focused-layover.hover .square div:before {
    height: 38%;
  }
  .focused-layover:hover .square:after,
  .focused-layover.hover .square:after {
    width: 55%;
  }
  .focused-layover:hover .square div:after,
  .focused-layover.hover .square div:after {
    height: 55%;
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
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) :hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
