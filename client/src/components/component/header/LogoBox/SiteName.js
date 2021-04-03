import React, { useState, useEffect } from "react";
import { StyledSiteName } from "./SiteName.styled";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../../../context/site/hooks/globals";
import { useTheme } from "../../../../context/site/hooks/useTheme";
import { uniq } from "lodash";

const SiteName = ({ p, h, pallet, compStyle }) => {
 const { themes } = useTheme();

 const [selectedTheme, setSelectedTheme] = useState(null);
 const [colorPack, setColorPack] = useState(null);
 const [theme, setTheme] = useState({
  primary: "",
  dark: "",
  light: "",
  danger: "",
  text: "",
  success: "",
  mobile: "576px",
 });

 console.log(p);
 useEffect(() => {
  if (h.length > 0) {
   h.map(({ color, text }) => {
    if (color.includes("#")) {
     const themeName = themes
      .filter((theme) => Object.values(theme).includes(color))
      .map((theme) => {
       const key = Object.keys(theme)
        .filter((key) => theme[key] === color)
        .toString();
       return key;
      });

     const obj = {
      [`${themeName[0]}`]: color,
      text: text,
      mobile: "576px",
     };

     setTheme(obj);
     setSelectedTheme(themeName[0]);
    }
   });
  }
  if (p.length > 0 && !h) {
   p.map(({ color, text }) => {
    if (color.includes("#")) {
     const themeName = themes
      .filter((theme) => Object.values(theme).includes(color))
      .map((theme) => {
       const key = Object.keys(theme)
        .filter((key) => theme[key] === color)
        .toString();
       return key;
      });

     const obj = {
      [`${themeName[0]}`]: color,
      text: text,
      mobile: "576px",
     };

     setTheme(obj);
     setSelectedTheme(themeName[0]);
    }
   });
  }
 }, [h, p]);

 var particleAlphabet = {
  Particle: function (x, y) {
   this.x = x;
   this.y = y;
   this.radius = 3.5;
   this.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.radius, this.radius);
    ctx.restore();
   };
  },
  init: function () {
   particleAlphabet.canvas = document.querySelector("canvas");
   particleAlphabet.ctx = particleAlphabet.canvas.getContext("2d");
   particleAlphabet.W = 500;
   particleAlphabet.H = 500;
   particleAlphabet.particlePositions = [];
   particleAlphabet.particles = [];
   particleAlphabet.tmpCanvas = document.createElement("canvas");
   particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext("2d");

   particleAlphabet.canvas.width = particleAlphabet.W;
   particleAlphabet.canvas.height = particleAlphabet.H;

   setInterval(function () {
    particleAlphabet.changeLetter();
    particleAlphabet.getPixels(
     particleAlphabet.tmpCanvas,
     particleAlphabet.tmpCtx
    );
   }, 1200);

   particleAlphabet.makeParticles(1000);
   particleAlphabet.animate();
  },
  currentPos: 0,
  changeLetter: function () {
   var letters = "ABCDEFGHIJKLMNOPQRSTUVXYZ",
    letters = letters.split("");
   particleAlphabet.time = letters[particleAlphabet.currentPos];
   particleAlphabet.currentPos++;
   if (particleAlphabet.currentPos >= letters.length) {
    particleAlphabet.currentPos = 0;
   }
  },
  makeParticles: function (num) {
   for (var i = 0; i <= num; i++) {
    particleAlphabet.particles.push(
     new particleAlphabet.Particle(
      particleAlphabet.W / 2 + Math.random() * 400 - 200,
      particleAlphabet.H / 2 + Math.random() * 400 - 200
     )
    );
   }
  },
  getPixels: function (canvas, ctx) {
   var keyword = particleAlphabet.time,
    gridX = 6,
    gridY = 6;
   canvas.width = 500;
   canvas.height = 500;
   ctx.fillStyle = "red";
   ctx.font = "italic bold 330px Noto Serif";
   ctx.fillText(
    keyword,
    canvas.width / 2 - ctx.measureText(keyword).width / 2,
    canvas.height / 2 + 100
   );
   var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
   var buffer32 = new Uint32Array(idata.data.buffer);
   if (particleAlphabet.particlePositions.length > 0)
    particleAlphabet.particlePositions = [];
   for (var y = 0; y < canvas.height; y += gridY) {
    for (var x = 0; x < canvas.width; x += gridX) {
     if (buffer32[y * canvas.width + x]) {
      particleAlphabet.particlePositions.push({ x: x, y: y });
     }
    }
   }
  },
  animateParticles: function () {
   var p, pPos;
   for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
    p = particleAlphabet.particles[i];
    pPos = particleAlphabet.particlePositions[i];
    if (
     particleAlphabet.particles.indexOf(p) ===
     particleAlphabet.particlePositions.indexOf(pPos)
    ) {
     p.x += (pPos.x - p.x) * 0.3;
     p.y += (pPos.y - p.y) * 0.3;
     p.draw(particleAlphabet.ctx);
    }
   }
  },
  animate: function () {
   requestAnimationFrame(particleAlphabet.animate);
   particleAlphabet.ctx.fillStyle = "rgba(23, 41, 58, .8)";
   particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
   particleAlphabet.animateParticles();
  },
 };

 useEffect(() => {
  if (compStyle === "typedanimation") {
   particleAlphabet.init();
  }
 }, [compStyle]);

 console.log(selectedTheme);

 return (
  <ThemeProvider theme={theme}>
   <GlobalStyles />
   <StyledSiteName>
    {compStyle === "vertical" ? (
     <div className='vertical'>
      <h2
       style={{
        color: `${Object.values(theme).filter((f) => f.includes("#"))[0]}`,
       }}
       className='rotate'>
       {h &&
        h.filter(
         (h) => h.componentName === "Site Name" && h.compStyle === "vertical"
        )[0].text}
      </h2>
      <h2
       style={{
        color: `${Object.values(theme).filter((f) => f.includes("#"))[0]}`,
       }}>
       {" "}
       {h &&
        h.filter(
         (h) => h.componentName === "Site Name" && h.compStyle === "vertical"
        )[1].text}
      </h2>
     </div>
    ) : (
     ""
    )}
    {compStyle === "halfhalf-animated" ? (
     <div className='main'>
      <span>
       <p>
        {" "}
        {p &&
         p.filter(
          (h) =>
           h.componentName === "Site Name" &&
           h.compStyle === "halfhalf-animated"
         )[0].text}
       </p>
      </span>
     </div>
    ) : (
     ""
    )}

    {compStyle === "rainbowshadow" ? (
     <div className='rainbowshadow'>
      <p>
       {" "}
       {p &&
        p.filter(
         (h) =>
          h.componentName === "Site Name" && h.compStyle === "rainbowshadow"
        )[0].text}
      </p>
     </div>
    ) : (
     ""
    )}

    {compStyle === "shiningtext" ? (
     <div className='shiningtext'>
      <p>
       {" "}
       {p &&
        p.filter(
         (h) => h.componentName === "Site Name" && h.compStyle === "shiningtext"
        )[0].text}
      </p>
     </div>
    ) : (
     ""
    )}

    {compStyle === "typographyanimation" ? (
     <div style={{ background: "#333" }} className='typographyanimation'>
      <canvas></canvas>
     </div>
    ) : (
     ""
    )}

    {compStyle === "popart" ? (
     <div className='popart'>
      <p>
       {" "}
       {p &&
        p.filter(
         (h) => h.componentName === "Site Name" && h.compStyle === "popart"
        )[0].text}
      </p>
     </div>
    ) : (
     ""
    )}

    {selectedTheme && compStyle === `dimension-${selectedTheme}` ? (
     <div className={`dimensioncolors dimensioncolors-${selectedTheme}`}>
      {" "}
      {p &&
       p.filter(
        (h) =>
         h.componentName === "Site Name" &&
         h.compStyle === `dimension-${selectedTheme}`
       )[0].text}
     </div>
    ) : (
     ""
    )}

    {selectedTheme && compStyle === `textinacircle-${selectedTheme}` ? (
     <div className={`textinacircle-${selectedTheme}`}>
      {p &&
       Array.from(
        p.filter(
         (h) =>
          h.componentName === "Site Name" &&
          h.compStyle === `textinacircle-${selectedTheme}`
        )[0].text
       ).map((char) => <span>{char}</span>)}
     </div>
    ) : (
     ""
    )}

    {selectedTheme && compStyle === `deconstructed-${selectedTheme}` ? (
     <div className='deconstructedContainer deconstructed'>
      <p>
       {" "}
       {p &&
        p.filter(
         (h) =>
          h.componentName === "Site Name" &&
          h.compStyle === `deconstructed-${selectedTheme}`
        )[0].text}
      </p>
      <div className={`${selectedTheme}`}>
       <p>
        {" "}
        {p &&
         p.filter(
          (h) =>
           h.componentName === "Site Name" &&
           h.compStyle === `deconstructed-${selectedTheme}`
         )[1].text}
       </p>
      </div>
      <div className={`${selectedTheme}`}>
       <p>
        {" "}
        {p &&
         p.filter(
          (h) =>
           h.componentName === "Site Name" &&
           h.compStyle === `deconstructed-${selectedTheme}`
         )[2].text}
       </p>
      </div>
      <div className={`${selectedTheme}`}>
       <p>
        {" "}
        {p &&
         p.filter(
          (h) =>
           h.componentName === "Site Name" &&
           h.compStyle === `deconstructed-${selectedTheme}`
         )[3].text}
       </p>
      </div>
      <div className={`${selectedTheme}`}>
       <p>
        {" "}
        {p &&
         p.filter(
          (h) =>
           h.componentName === "Site Name" &&
           h.compStyle === `deconstructed-${selectedTheme}`
         )[4].text}
       </p>
      </div>
     </div>
    ) : (
     ""
    )}

    {selectedTheme && compStyle === `threeD` ? (
     <div className='threeD'>
      <p>
       {" "}
       {p &&
        p.filter(
         (h) => h.componentName === "Site Name" && h.compStyle === "threeD"
        )[0].text}
      </p>
     </div>
    ) : (
     ""
    )}
   </StyledSiteName>
  </ThemeProvider>
 );
};

export default SiteName;
