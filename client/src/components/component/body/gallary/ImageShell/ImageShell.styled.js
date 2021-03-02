import styled from "styled-components";
import { useContext } from "react";

let img;
export const StyledImageShell = styled.div`
  * {
    margin: 0;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .logostack {
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

  .horizontalimg {
    width: 100%;
    ${({ theme }) => theme.background}
  }

  .horizontalimg .image {
    perspective: 3000px;
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
  }
  .horizontalimg .image img {
    transform: rotateX(70deg) rotateZ(-60deg) translate3d(-120px, 0px, 70px);
    box-shadow: -80px 60px 15px 5px rgba(0, 0, 0, 0.4);
    transition: all 0.4s;
    transform-style: preserve-3d;
  }
  .horizontalimg .image:hover img {
    transform: rotateX(0deg) rotateZ(0deg) translate3d(0px, 0px, 0px);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }

  .reflection-container {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    transform-style: preserve-3d;
    perspective: 1000px;
    &:before {
      content: "Hover me ➜";
      color: #fff;
      position: absolute;
      left: -1rem;
      top: 50%;
      font-size: 6vh;
      transform: translateX(-100%) translateY(-50%);
    }
    .reflection-content {
      height: 80vh;
      width: 80vh;
      background: #000 url(${img});
      background-size: cover;
      background-position: center;
      transform: rotateX(0) rotateY(0);
      pointer-events: none;
      transition: 100ms linear transform;
      overflow: hidden;
      &:before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        left: -50%;
        top: -50%;
        background: linear-gradient(
          rgba(255, 255, 255, 0.2),
          rgba(0, 0, 0, 0.2)
        );
      }
    }
    .reflection-grid-cell {
      position: absolute;
      z-index: 1;
      width: 10%;
      height: 10%;
    }
    @for $r from 1 to 11 {
      @for $c from 1 to 11 {
        .reflection-grid-cell-#{( ($r*10) + $c - 10)} {
          top: ($r * 10%)-10%;
          left: ($c * 10%)-10%;
        }
        .reflection-grid-cell-#{( ($r*10) + $c - 10)}:hover
          ~ .reflection-content {
          transform: rotateX((($r * -5)+25deg)) rotateY((-25deg+ ($c * 5)));
          &:before {
            transform: translateY(25- (5% * $r));
          }
        }
      }
    }
  }

  .expandingcircle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

 .expandingcircle .expandingcircle__image {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-image: url(${img});
    background-size: cover;
    transition: ease-in-out 0.3s;
    z-index: 2;
  }
.expandingcircle .expandingcircle__image:before {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: inherit;
    background-position: bottom;
    filter: blur(40px) saturate(0%);
    transform: scaleX(0.4);
    transition: ease-in-out 0.4s;
    border-radius: 120px;
    transform-origin: right;
    opacity: 0;
    z-index: -1;
  }

  .expandingcircle .expandingcircle__image .container__info{
      position:relative;
      
      line-height:1.8;
      transition:ease-in-out .3s;
      opacity:0;
    }
   .expandingcircle .expandingcircle__image .container__location{
      transition-delay: .15s;
    }
  .expandingcircle .expandingcircle__image .container__location:hover{
      border-radius:0;
      width:450px;
      height:310px;
      
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(9, 55, 53, 0.08), 0px 16px 24px rgba(9, 55, 53, 0.1), 0px 24px 32px rgba(9, 55, 53, 0.14);
      &:before{
        width:100%;
        
        opacity: 0.18;
        filter:blur(10px) saturate(100%);
        transform:scale(2.8) translate3d(-18%, 0px, 0px);
      }
      
      .expandingcircle .expandingcircle__image .container__location .container__info{
        transform:translate3d(-60%,0px,0px);
        opacity:1;
      }
    }
  }
}
.expandingcircle .expandingcircle__image .container__info .link{
  border-bottom: 1px solid transparent;
  color:#06C0A8;
  text-decoration:none;
  transition: ease-in .13s;
  &:hover{
     background-color: #06C0A8;
     color:#ffffff;
   }
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

  .images-selector input {
  position: absolute;
  z-index: 10;
}

.images-selector input:checked + .img-card {
  filter: none;
  transform: scaleY(1);
}

.images-selector .img-card {
  display: inline-block;
  width: 250px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 200ms ease-in;
  filter: grayscale(1) opacity(.8);
}

.images-selector .img-card:hover {
  filter: grayscale(0) opacity(1);
/*   box-shadow:  0px 8px 4px rgba(0, 0, 0, 0.3),
               0px 10px 2px rgba(0, 0, 0, 0.1); */
}

.images-selector .img-card::before,
.images-selector .img-card::after {
  transform: scaleY(-1);
}

/*reflection*/
.images-selector .img-card:hover::after {
  content: '';
  background-image: inherit;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  width: inherit;
  height: 40%;
  position: absolute;
  bottom: -25%;
}

/*fade reflection*/
.img-card:hover::before {
  content: '';
  width: inherit;
  height: 42%;
  position: absolute;
  bottom: -25%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, .9),rgba(255, 255, 255, .5));
  z-index: 1;
}

.image-expander {
  display: flex;
  width: 100%;
  padding: 4% 2%;
  box-sizing: border-box;
  
}

.image-expander .box {
  flex: 1;
  overflow: hidden;
  transition: .5s;
  margin: 0 2%;
  box-shadow: 0 20px 30px rgba(0,0,0,.1);
  line-height: 0;
}

.image-expander .box > img {
  width: 200%;
  height: calc(100% - 10vh);
  object-fit: cover; 
  transition: .5s;
}

.image-expander .image-expander .box > span {
  font-size: 3.8vh;
  display: block;
  text-align: center;
  height: 10vh;
  line-height: 2.6;
}

.image-expander .box:hover { flex: 1 1 50%; }
.image-expander .box:hover > img {
  width: 100%;
  height: 100%;
}
 
`;
