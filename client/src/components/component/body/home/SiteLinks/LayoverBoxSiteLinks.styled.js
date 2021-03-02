import styled from "styled-components";

export const StyledSiteLinks = styled.div`
  .layover-box {
    font-family: "Fauna One", Arial, sans-serif;
    position: relative;
    margin: 10px 20px;
    min-width: 230px;
    max-width: 295px;
    min-height: 220px;
    width: 100%;
    color: #ffffff;
    text-align: right;
    line-height: 1.4em;
    background-color: #1a1a1a;
    font-size: 16px;
  }
  .layover-box * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
  }
  .layover-box img {
    position: absolute;
    right: 0%;
    top: 50%;
    opacity: 1;
    width: 100%;
    -webkit-transform: translate(0%, -50%);
    transform: translate(0%, -50%);
  }
  .layover-box .figcaption {
    position: absolute;
    width: 50%;
    top: 50%;
    left: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 20px 0 20px 20px;
  }
  .layover-box h2,
  .layover-box p {
    margin: 0;
    width: 100%;
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
    opacity: 0;
  }
  .layover-box h2 {
    font-family: "Playfair Display", Arial, sans-serif;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .layover-box p {
    font-size: 0.8em;
  }
  .layover-box a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .layover-box:hover img,
  .layover-box.hover img {
    width: 55%;
    right: -10%;
  }
  .layover-box:hover .figcaption h2,
  .layover-box.hover .figcaption h2,
  .layover-box:hover .figcaption p,
  .layover-box.hover .figcaption p {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
    opacity: 1;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
