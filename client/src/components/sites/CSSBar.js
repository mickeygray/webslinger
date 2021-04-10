import React, { useContext } from "react";
import SiteContext from "../../context/site/siteContext";

//add importance

const CSSBar = () => {
 return (
  <div>
   {Object.keys(css).map((key) => {
    if (key.includes("Color")) {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}
       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option>Set Color...</option>
        <option value={pallet && pallet.primary}>Primary</option>
        <option value={pallet && pallet.dark}>Dark</option>
        <option value={pallet && pallet.light}>Light</option>
        <option value={pallet && pallet.danger}>Danger</option>
        <option value={pallet && pallet.success}>Success</option>
       </select>
      </label>
     );
    } else if (key === "animation") {
     return (
      <label key={key}>
       <div className='card'>
        <button
         className='btn btn-sm btn-dark'
         onClick={() => addCellAnimation(i)}>
         + Animation
        </button>
        <h5>Current Animation Order</h5>
        <ul>
         {css.animation.length > 0 &&
          css.animation.map(
           (
            {
             animationName,
             animationDuration,
             animationTimingFunction,
             animationDelay,
             animationIterationCount,
             animationDirection,
             animationFillMode,
             cubicNs,
             steps,
             keyframes,
            },
            index
           ) => (
            <div>
             <h5>Animation Name</h5>
             <input
              type='text'
              name='animationName'
              value={animationName}
              onChange={(e) => onChangeCell(i, e, "animation", index)}
             />
             <h5>Animation Duration</h5>
             <input
              type='text'
              name='animationDuration'
              value={animationDuration}
              onChange={(e) => onChangeCell(i, e, "animation", index)}
             />
             <h5>Animation Function</h5>
             <select
              name='animationTimingFunction'
              value={animationTimingFunction}
              onChange={(e) => onChangeCell(i, e, "animation", index)}>
              <option></option>
              <option value='ease'>Ease</option>
              <option value='ease-in'>Ease In</option>
              <option value='ease-in-out'>Ease In Out</option>
              <option value='step-end'>Step End</option>
              <option value='step-start'>Step Start</option>
              <option value='cubic-bezier'>Cubic Bezier</option>
              <option value='steps'>Steps</option>
              <option value='inherit'>Inherit</option>
              <option value='initial'>Initial</option>
             </select>
             <h5>Animation Delay</h5>
             <input
              placeholder='enter a value in seconds'
              type='text'
              name='animationDelay'
              value={animationDelay}
              onChange={(e) => onChangeCell(i, e, "animation", index)}
             />
             {animationTimingFunction === "cubic-bezier" &&
              Object.keys(cubicNs).map((n) => (
               <div>
                <h5>Cubic Bez (n,n,n,n)</h5>
                <div key={n}>
                 <h5>N {parseInt(n) + 1}</h5>
                 <Slider
                  axis='x'
                  x={css["animation"][index]["cubicNs"][n]}
                  value={parseFloat(css["animation"][index]["cubicNs"][n])}
                  onChange={(e) => onChangeCell(i, e, "cubicNs", index, n)}
                  orientation='horizontal'
                  name={n}
                  min={0}
                  max={1}
                  step={0.01}
                 />
                </div>
               </div>
              ))}
             <h5>Animation Iteration Count</h5>
             <input
              placeholder='Positive Integers Only'
              type='text'
              name='animationIterationCount'
              value={animationIterationCount}
              onChange={(e) => onChangeCell(i, e, "animation", index)}
             />
             <h5>Animation Iteration Count</h5>
             <input
              placeholder='Positive Integers Only'
              type='text'
              name='animationIterationCount'
              value={animationIterationCount}
              onChange={(e) => onChangeCell(i, e, "animation", index)}
             />
             <h5>Animation Direction</h5>
             <select
              name='animationDirection'
              value={animationDirection}
              onChange={(e) => onChangeCell(i, e, "animation", index)}>
              <option></option>
              <option value='normal'>Normal</option>
              <option value='reverse'>Reverse</option>
              <option value='alternate'>Alternate</option>
              <option value='reverse'>Alternate Reverse</option>
              <option value='inherit'>Inherit</option>
             </select>
             <h5>Animation Fill Mode</h5>
             <select
              name='animationFillMode'
              value={animationFillMode}
              onChange={(e) => onChangeCell(i, e, "animation", index)}>
              <option></option>
              <option value='none'>None</option>
              <option value='forward'>Forward</option>
              <option value='backward'>Backward</option>
              <option value='both'>Both</option>
              <option value='inherit'>Inherit</option>
             </select>
             <h5>Key Frames</h5>
             <button
              className='btn btn-sm btn-dark'
              onClick={() => addCellAnimationKeyframe(i, index)}>
              + Keyframe
             </button>
             lineHeight:'',
            </div>
           )
          )}
        </ul>
       </div>
      </label>
     );
    } else if (key === "pos") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}
       ition
       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='fixed'>Fixed</option>
        <option value='relative'>Relative</option>
        <option value='absolute'>Absolute</option>
       </select>
      </label>
     );
    } else if (key === "backgroundRepeat") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='repeatX'>Repeat X</option>
        <option value='repeatY'>Repeat Y</option>
        <option value='repeat'>Repeat</option>
        <option value='space'>Space</option>
        <option value='round'>Round</option>
        <option value='noRepeat'>No Repeat</option>
       </select>
      </label>
     );
    } else if (key === "backgroundPosition") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='center'>Center</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
        <option value='top'>Top</option>
        <option value='bottom'>Bottom</option>
       </select>
      </label>
     );
    } else if (key === "backgroundSize") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='cover'>Cover</option>
        <option value='contain'>Contain</option>
       </select>
      </label>
     );
    } else if (key === "display") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='block'>Block</option>
        <option value='inline'>Inline</option>
        <option value='inline-block'>Inline Block</option>
        <option value='flex'>Flex</option>
        <option value='none'>None</option>
       </select>
      </label>
     );
    } else if (key === "textDecorationLine") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='none'>None</option>
        <option value='underline'>Underline</option>
        <option value='overline'>Overline</option>
        <option value='line-through'>Line Through</option>
        <option value='blink'>Blink</option>
       </select>
      </label>
     );
    } else if (key === "textDecorationStyle") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='solid'>Solid</option>
        <option value='double'>Double</option>
        <option value='dotted'>Dotted</option>
        <option value='dashed'>Dashed</option>
        <option value='wavy'>Wavy</option>
       </select>
      </label>
     );
    } else if (key === "transition") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <button
        className='btn btn-sm btn-dark'
        onClick={() => addCellTransition(i)}>
        + Transition
       </button>
       <div
        className='card'
        style={{ overflowY: "scroll", overflowX: "scroll" }}>
        {css.transition.map(
         ({ property, duration, timingFunction, cubicNs, delay }, index) => (
          <div key={index} className='card'>
           <h5>Transition Property</h5>
           <select
            onChange={(e) => onChangeCell(i, e, "transition", index)}
            value={property}
            name='property'>
            <option value=''></option>
            {Object.keys(flatCss)
             .filter((e) => typeof parseInt(e) === "number")
             .map((c, i) => (
              <option key={i} value={c}>
               {c}
              </option>
             ))}
            <option value='color'>Color</option>
            <option value='background-color'>Background Color</option>
           </select>
           <h5>Transition Timing</h5>
           <input
            type='text'
            name='duration'
            onChange={(e) => onChangeCell(i, e, "transition", index)}
            value={duration}
            placeholder='Enter A Value in seconds'
           />
           <h5>Transition Function</h5>
           <select
            name='timingFunction'
            value={timingFunction}
            onChange={(e) => onChangeCell(i, e, "transition", index)}>
            <option></option>
            <option value='ease'>Ease</option>
            <option value='ease-in'>Ease In</option>
            <option value='ease-in-out'>Ease In Out</option>
            <option value='step-end'>Step End</option>
            <option value='step-start'>Step Start</option>
            <option value='cubic-bezier'>Cubic Bezier</option>
            <option value='inherit'>Inherit</option>
            <option value='initial'>Initial</option>
           </select>
           <h5>Transition Delay</h5>
           <input
            type='text'
            name='delay'
            value={delay}
            onChange={(e) => onChangeCell(i, e, "transition", index)}
            placeholder='Enter A Value in seconds'
           />

           {timingFunction === "cubic-bezier" &&
            Object.keys(cubicNs).map((n) => (
             <div>
              <h5>Cubic Bez (n,n,n,n)</h5>
              <div key={n}>
               <h5>N {parseInt(n) + 1}</h5>
               <Slider
                axis='x'
                x={css["transition"][index]["cubicNs"][n]}
                value={parseFloat(css["transition"][index]["cubicNs"][n])}
                onChange={(e) => onChangeCell(i, e, "cubicNs", index, n)}
                orientation='horizontal'
                name={n}
                min={0}
                max={1}
                step={0.01}
               />
              </div>
             </div>
            ))}
          </div>
         )
        )}
       </div>
      </label>
     );
    } else if (key === "transform") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        onChange={(e) => onChangeCell(i, e, "transform")}
        multiple>
        <option></option>
        <option value='rotateX'>RotateX</option>
        <option value='rotateY'>RotateY</option>
        <option value='skewX'>SkewX</option>
        <option value='skewY'>SkewY</option>
        <option value='rotateZ'>RotateZ</option>
        <option value='scaleX'>ScaleX</option>
        <option value='scaleY'>ScaleY</option>
        <option value='translateX'>TranslateX</option>
        <option value='translateY'>TranslateY</option>
       </select>
      </label>
     );
    } else if (key === "transformProp") {
     return (
      <label key={key}>
       <div className='card all-center'>
        <h5>Current Transform Order</h5>
        <ul>
         {css.transform.map((m) => (
          <li key={m}>{m}</li>
         ))}
        </ul>
       </div>
       {css.transform.includes("rotateZ") && (
        <div>
         <h5>Rotate Z Deg</h5>
         <Slider
          axis='x'
          x={css["transformProp"]["rotateZ"]}
          value={parseInt(css["transformProp"]["rotateZ"])}
          onChange={(e) => onChangeCell(i, e, "rotateZ", "transformProp")}
          orientation='horizontal'
          name='rotateZ'
          min={0}
          max={360}
          step={1}
         />
        </div>
       )}
       {css.transform.includes("rotateX") && (
        <div>
         <h5>Rotate X Deg</h5>
         <Slider
          axis='x'
          x={css["transformProp"]["rotateX"]}
          value={parseInt(css["transformProp"]["rotateX"])}
          onChange={(e) => onChangeCell(i, e, "rotateX", "transformProp")}
          orientation='horizontal'
          name='rotateX'
          min={0}
          max={360}
          step={1}
         />
        </div>
       )}
       {css.transform.includes("translateX") && (
        <div>
         <h5>Translate X Px</h5>
         <input
          type='text'
          name='translateX'
          value={css["transformProp"]["translateX"]}
          onChange={(e) =>
           onChangeCell(i, e.target.value, "translateX", "transformProp")
          }
         />
        </div>
       )}
       {css.transform.includes("translateY") && (
        <div>
         <h5>Translate Y Px</h5>
         <input
          type='text'
          name='translateY'
          value={css["transformProp"]["translateY"]}
          onChange={(e) =>
           onChangeCell(i, e.target.value, "translateY", "transformProp")
          }
         />
        </div>
       )}
       {css.transform.includes("rotateY") && (
        <div>
         <h5>Rotate Y Deg</h5>
         <Slider
          value={parseInt(css["transformProp"]["rotateY"])}
          onChange={(e) => onChangeCell(i, e, "rotateY", "transformProp")}
          orientation='horizontal'
          name='rotateY'
          min={0}
          max={360}
          step={1}
         />
        </div>
       )}
       {css.transform.includes("skewX") && (
        <div>
         <h5>Skew X Deg</h5>
         <Slider
          value={parseInt(css["transformProp"]["skewX"])}
          onChange={(e) => onChangeCell(i, e, "skewX", "transformProp")}
          orientation='horizontal'
          name='skewX'
          min={0}
          max={360}
          step={1}
         />
        </div>
       )}
       {css.transform.includes("skewY") && (
        <div>
         <h5>Skew Y Deg</h5>
         <Slider
          value={parseInt(css["transformProp"]["skewY"])}
          onChange={(e) => onChangeCell(i, e, "skewY", "transformProp")}
          orientation='horizontal'
          name='skewY'
          min={0}
          max={360}
          step={1}
         />
        </div>
       )}
       {css.transform.includes("scaleX") && (
        <div>
         <h5>Scale X Percent</h5>
         <Slider
          value={parseInt(css["transformProp"]["scaleX"]) * 10}
          onChange={(e) => onChangeCell(i, e / 10, "scaleX", "transformProp")}
          orientation='horizontal'
          name='scaleX'
          min={-100}
          max={200}
          step={1}
         />
        </div>
       )}{" "}
       {css.transform.includes("scaleY") && (
        <div>
         <h5>Scale Y Percent</h5>
         <Slider
          value={parseInt(css["transformProp"]["scaleY"]) * 10}
          onChange={(e) => onChangeCell(i, e / 10, "scaleY", "transformProp")}
          orientation='horizontal'
          name='scaleY'
          min={-100}
          max={200}
          step={1}
         />
        </div>
       )}
      </label>
     );
    } else if (key === "fontSize") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='5px'>XX Small</option>
        <option value='7px'>X Small</option>
        <option value='11px'>Small</option>
        <option value='16px'>Medium</option>
        <option value='24px'>Large</option>
        <option value='36px'>X Large</option>
        <option value='54px'>XX Large</option>
       </select>
      </label>
     );
    } else if (key.includes("Inset")) {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option>Outer</option>
        <option value='inset'>Inset</option>
       </select>
      </label>
     );
    } else if (key === "fontWeight") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option value='100'>100</option>
        <option value='200'>200</option>
        <option value='300'>300</option>
        <option value='400'>400</option>
        <option value='500'>500</option>
        <option value='600'>600</option>
        <option value='700'>700</option>
        <option value='800'>800</option>
        <option value='900'>900</option>
       </select>
      </label>
     );
    } else if (key === "opacity") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}
       <Slider
        axis='x'
        x={css.opacity}
        value={parseInt(css[key])}
        onChange={(e) => onChangeCell(i, e, "opacity", "slider")}
        orientation='horizontal'
        min={0}
        max={100}
        step={1}
       />
      </label>
     );
    } else if (key.includes("Radius")) {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}
       <Slider
        value={parseInt(css[key])}
        onChange={(e) => onChangeCell(i, e, key, "slider")}
        orientation='horizontal'
        min={0}
        max={50}
        step={0.5}
       />
      </label>
     );
    } else if (key === "textAlign") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>

        <option value='start'>Start</option>
        <option value='end'>End</option>
        <option value='left'>Left</option>
        <option value='right'>Right</option>
        <option value='center'>Center</option>
        <option value='justify'>Justify</option>
        <option value='matchParent'>Match Parent</option>
        <option value='justifyAll'>Justify All</option>
       </select>
      </label>
     );
    } else if (key.includes("border") && key.includes("Style")) {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='solid'>Solid</option>
        <option value='double'>Double</option>
        <option value='dotted'>Dotted</option>
        <option value='dashed'>Dashed</option>
        <option value='groove'>Groove</option>
        <option value='none'>None</option>
        <option value='hidden'>Hidden</option>
        <option value='ridge'>Ridge</option>
        <option value='inset'>Inset</option>
        <option value='outset'>Outset</option>
       </select>
      </label>
     );
    } else if (key === "textShadowSize") {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='small'>2px</option>
       </select>
      </label>
     );
    } else if (key.includes("overflow")) {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}

       <select
        name={key}
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}>
        <option></option>
        <option value='visible'>Visible</option>
        <option value='hidden'>Hidden</option>
        <option value='clip'>Clip</option>
        <option value='scroll'>Scroll</option>
        <option value='auto'>Auto</option>
       </select>
      </label>
     );
    } else {
     return (
      <label key={key}>
       {key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
       })}
       <input
        type='text'
        placeholder='Enter A Value In Pixels'
        value={css[key]}
        onChange={(e) => onChangeCell(i, e, "css")}
        name={key}
       />
      </label>
     );
    }
   })}
  </div>
 );
};

export default CSSBar;
