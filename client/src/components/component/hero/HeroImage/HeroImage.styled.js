import { useContext } from "react";
import styled from "styled-components";
import SiteContext from "../../../../context/site/siteContext";

const siteContext = useContext(SiteContext);

const { current } = siteContext;

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
    background: rgba(#424242, 0.5) url(${current.img}) repeat fixed;
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
    background: rgba(#424242, 0.5) url(${current.img2}) repeat fixed;
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
