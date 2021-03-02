import styled from "styled-components";

export const StyledAnimatedLogo = styled.div`
  .logostack {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logostack-container {
    position: relative;
    width: 360px;
    height: 640px;
    margin-top: 150px;
    background: rgba(0, 0, 0, 0);
    transform: rotate(-30deg) skew(25deg) scale(0.8);
    transition: 0.5s;
  }
  .logostack-container img {
    position: absolute;
    width: 100%;
    transition: 0.5s;
  }
  .logostack-container:hover img:nth-child(4) {
    transform: translate(160px, -160px);
    opacity: 1;
  }
  .logostack-container:hover img:nth-child(3) {
    transform: translate(120px, -120px);
    opacity: 0.8;
  }
  .logostack-container:hover img:nth-child(2) {
    transform: translate(80px, -80px);
    opacity: 0.6;
  }
  .logostack-container:hover img:nth-child(1) {
    transform: translate(40px, -40px);
    opacity: 0.4;
  }

  .imageset {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }

  .imageset img {
    width: 200px;
    height: 280px;
    object-fit: cover;
    filter: grayscale(100%) contrast(120%);
    box-shadow: 10px 15px 25px 0 rgba(0, 0, 0, 0.2);
    display: block;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-top: -10px;
  }

  .imageset:hover img {
    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  .imageset .glow-wrap {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    margin-top: -10px;
  }

  .imageset .glow {
    display: block;
    position: absolute;
    width: 40%;
    height: 200%;
    background: rgba(255, 255, 255, 0.2);
    top: 0;
    filter: blur(5px);
    transform: rotate(45deg) translate(-450%, 0);
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .imageset:hover .glow {
    transform: rotate(45deg) translate(450%, 0);
    transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .imageset:hover img,
  .imageset:hover .glow-wrap {
    margin-top: 0;
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
