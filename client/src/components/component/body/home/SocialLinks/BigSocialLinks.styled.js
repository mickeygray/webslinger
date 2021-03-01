import styled from "styled-components";

export const StyledSocialLinks = styled.ul`
  position: relative;
  display: flex;
  transform: rotate(-25deg) skew(25deg);
  transform-style: preserve-3d;

  ul li {
    position: relative;
    list-style: none;
    width: 60px;
    height: 60px;
    margin: 0px 20px;
  }
  ul li:before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -5px;
    width: 100%;
    height: 10px;
    background: #2a2a2a;
    trnasform-origin: top;
    transform: skewX(-41deg);
  }
  ul li:after {
    content: "";
    position: absolute;
    top: 5px;
    left: -9px;
    width: 9px;
    height: 100%;
    background: #2a2a2a;
    trnasform-origin: right;
    transform: skewY(-49deg);
  }
  ul li span {
    position: absolute;
    top: 0;
    lef: 0;
    width: 100%;
    height: 100%;
    display: flex !important;
    background: #2a2a2a;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 30px !important;
    transition: 1.5s ease-out;
  }
  ul li:hover span {
    z-index: 1000;
    transition: 0.3s;
    color: #fff;
    box-shadw: -1px 1px 1px rgba(0, 0, 0, 0.5);
  }
  ul li:hover span:nth-child(5) {
    transform: translate(40px, -40px);
    opacity: 1;
  }
  ul li:hover span:nth-child(4) {
    transform: translate(30px, -30px);
    opacity: 0.8;
  }
  ul li:hover span:nth-child(3) {
    transform: translate(20px, -20px);
    opacity: 0.6;
  }
  ul li:hover span:nth-child(2) {
    transform: translate(10px, -10px);
    opacity: 0.4;
  }
  ul li:hover span:nth-child(1) {
    transform: translate(0px, 0px);
    opacity: 0.2;
  }
  ul li:nth-child(1):hover span {
    background: #52e19f !important;
  }
  ul li:nth-child(2):hover span {
    background: #2c3456 !important;
  }
  ul li:nth-child(3):hover span {
    background: #ea6e96 !important;
  }
  ul li:nth-child(4):hover span {
    background: #fceb00 !important;
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

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
