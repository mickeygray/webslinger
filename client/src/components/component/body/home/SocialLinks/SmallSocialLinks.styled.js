import styled from "styled-components";

export const StyledSocialLinks = styled.div`
  width: 280px;
  height: 80px;
  background: #dfe6e9;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.3s linear;

  .share-button:hover {
    transform: scale(1.1);
  }
  .share-button span {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #2d3436;
    color: #f1f1f1;
    text-align: center;
    line-height: 80px;
    z-index: 999;
    transition: 0.6s linear;
    border-radius: 40px;
  }
  .share-button:hover span {
    transform: translateX(-100%);
    transition-delay: 0.3s;
  }
  .share-button a {
    flex: 1;
    font-size: 26px;
    margin-right: 20px;
    color: #2d3436;
    text-align: center;
    transform: translateX(-100%);
    opacity: 0;
    transition: 0.3s linear;
  }
  .share-button:hover a {
    opacity: 1;
    transform: translateX(0);
  }
  .share-button a:nth-of-type(1) {
    transition-delay: 1s;
  }
  .share-button a:nth-of-type(2) {
    transition-delay: 0.8s;
  }
  .share-button a:nth-of-type(3) {
    transition-delay: 0.6s;
  }
  .share-button a:nth-of-type(4) {
    transition-delay: 0.4s;
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
