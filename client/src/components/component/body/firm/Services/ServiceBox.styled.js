import styled from "styled-components";

export const StyledServiceBox = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Raleway:400,500,700);
  .simple-layover {
    font-family: "Raleway", Arial, sans-serif;
    position: relative;
    margin: 10px;
    min-width: 310px -60px;
    max-width: 310px;
    width: 100%;
    color: #ffffff;
    text-align: left;
    background-color: #000000;
    font-size: 16px;
  }
  .simple-layover * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.4s ease-in;
    transition: all 0.4s ease-in;
  }
  .simple-layover img {
    position: relative;
    max-width: 100%;
    vertical-align: top;
  }
  .simple-layover .figcaption {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    padding: 20px 30px;
  }
  .simple-layover .figcaption:before,
  .simple-layover .figcaption:after {
    width: 1px;
    height: 0;
  }
  .simple-layover .figcaption:before {
    right: 0;
    top: 0;
  }
  .simple-layover .figcaption:after {
    left: 0;
    bottom: 0;
  }
  .simple-layover h3,
  .simple-layover p {
    line-height: 1.5em;
  }
  .simple-layover h3 {
    margin: 0 0 5px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .simple-layover p {
    font-size: 0.8em;
    font-weight: 500;
    margin: 0 0 15px;
  }
  .simple-layover a {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
  .simple-layover:before,
  .simple-layover:after,
  .simple-layover .figcaption:before,
  .simple-layover .figcaption:after {
    position: absolute;
    content: "";
    background-color: #ffffff;
    z-index: 1;
    -webkit-transition: all 0.4s ease-in;
    transition: all 0.4s ease-in;
    opacity: 0.8;
  }
  .simple-layover:before,
  .simple-layover:after {
    height: 1px;
    width: 0%;
  }
  .simple-layover:before {
    top: 0;
    left: 0;
  }
  .simple-layover:after {
    bottom: 0;
    right: 0;
  }
  .simple-layover:hover img,
  .simple-layover.hover img {
    opacity: 0.4;
  }
  .simple-layover:hover .figcaption,
  .simple-layover.hover .figcaption {
    opacity: 1;
  }
  .simple-layover:hover .figcaption:before,
  .simple-layover.hover .figcaption:before,
  .simple-layover:hover .figcaption:after,
  .simple-layover.hover .figcaption:after {
    height: 100%;
  }
  .simple-layover:hover:before,
  .simple-layover.hover:before,
  .simple-layover:hover:after,
  .simple-layover.hover:after {
    width: 100%;
  }
  .simple-layover:hover:before,
  .simple-layover.hover:before,
  .simple-layover:hover:after,
  .simple-layover.hover:after,
  .simple-layover:hover .figcaption:before,
  .simple-layover.hover .figcaption:before,
  .simple-layover:hover .figcaption:after,
  .simple-layover.hover .figcaption:after {
    opacity: 0.1;
  }

  @import url(https://fonts.googleapis.com/css?family=Raleway:400,500,800);
  .layover-collapse {
    font-family: "Raleway", Arial, sans-serif;
    color: #fff;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 220px;
    max-width: 310px;
    max-height: 220px;
    width: 100%;
    color: #ffffff;
    text-align: left;
    background-color: #07090c;
    font-size: 16px;
    -webkit-perspective: 50em;
    perspective: 50em;
  }
  .layover-collapse * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.6s ease;
    transition: all 0.6s ease;
  }
  .layover-collapse img {
    opacity: 1;
    width: 100%;
    -webkit-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
  .layover-collapse .figcaption {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    -webkit-transform: rotateX(-90deg);
    transform: rotateX(-90deg);
    -webkit-transform-origin: 50% -50%;
    -ms-transform-origin: 50% -50%;
    transform-origin: 50% -50%;
    z-index: 1;
    opacity: 0;
    padding: 20px 30px;
  }
  .layover-collapse h3,
  .layover-collapse p {
    line-height: 1.5em;
  }
  .layover-collapse h3 {
    margin: 0;
    font-weight: 800;
    text-transform: uppercase;
  }
  .layover-collapse p {
    font-size: 0.8em;
    font-weight: 500;
    margin: 0 0 15px;
  }
  .layover-collapse .read-more {
    border: 2px solid #ffffff;
    padding: 0.5em 1em;
    font-size: 0.8em;
    text-decoration: none;
    color: #ffffff;
    display: inline-block;
  }
  .layover-collapse .read-more:hover {
    background-color: #ffffff;
    color: #000000;
  }
  .layover-collapse:hover img,
  .layover-collapse.hover img {
    -webkit-transform: rotateX(90deg);
    transform: rotateX(90deg);
    opacity: 0;
  }
  .layover-collapse:hover .figcaption,
  .layover-collapse.hover .figcaption {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    opacity: 1;
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  @import url(https://fonts.googleapis.com/css?family=Raleway:400,500);
  .image-open {
    font-family: "Raleway", Arial, sans-serif;
    color: #fff;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 220px;
    max-width: 310px;
    max-height: 220px;
    width: 100%;
    color: #000000;
    text-align: center;
  }
  .image-open * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.6s ease;
    transition: all 0.6s ease;
  }
  .image-open img {
    opacity: 1;
    width: 100%;
    -webkit-transition: opacity 0.35s;
    transition: opacity 0.35s;
  }
  .image-open:after {
    background: #ffffff;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    content: "";
    opacity: 0.75;
    -webkit-transform: skew(-45deg) scaleX(0);
    transform: skew(-45deg) scaleX(0);
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .image-open .figcaption {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 1;
  }
  .image-open h2,
  .image-open p {
    margin: 0;
    width: 100%;
    opacity: 0;
  }
  .image-open h2 {
    padding: 0 30px;
    display: inline-block;
    font-weight: 400;
    text-transform: uppercase;
  }
  .image-open p {
    padding: 0 50px;
    font-size: 0.8em;
    font-weight: 500;
  }
  .image-open a {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    z-index: 1;
  }
  .image-open:hover:after,
  .image-open.hover:after {
    -webkit-transform: skew(-45deg) scaleX(1);
    transform: skew(-45deg) scaleX(1);
    transition: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .image-open:hover .figcaption h2,
  .image-open.hover .figcaption h2,
  .image-open:hover .figcaption p,
  .image-open.hover .figcaption p {
    -webkit-transform: translate3d(0%, 0%, 0);
    transform: translate3d(0%, 0%, 0);
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
  .image-open:hover .figcaption h2,
  .image-open.hover .figcaption h2 {
    opacity: 1;
  }
  .image-open:hover .figcaption p,
  .image-open.hover .figcaption p {
    opacity: 0.7;
  }
`;
