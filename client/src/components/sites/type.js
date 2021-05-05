  if (type === "text") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='text'
              name={keyName}
              value={
               lead && parentObj === "lead"
                ? lead[keyName]
                : userState && userState[keyName]
              }
              onChange={(e) => {
               parentObj === "lead"
                ? writeLeadState(onChange, e)
                : writeUserState(
                   onChange,
                   e,
                   parentObj,
                   n,
                   parentState,
                   parentKey,
                   i
                  );
              }}
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='text'
             name={keyName}
             value={
              lead && parentObj === "lead"
               ? lead[keyName]
               : userState && userState[keyName]
             }
             onChange={(e) => {
              parentObj === "lead"
               ? writeLeadState(onChange, e)
               : writeUserState(
                  onChange,
                  e,
                  parentObj,
                  n,
                  parentState,
                  parentKey
                 );
             }}
            />
           </label>
          );
         }
        } else if (type === "textarea") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <textarea
              type='text'
              name={keyName}
              value={lead && lead[keyName]}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <textarea
             type='text'
             name={keyName}
             value={lead && lead[keyName]}
             onChange={(e) =>
              writeUserState(
               onChange,
               e,
               parentObj,
               n,
               parentState,
               parentKey,
               Array.from(userState[parentState][parentKey]).findIndex((x) =>
                Object.values(x).includes(e.target.value)
               )
              )
             }
            />
           </label>
          );
         }
        } else if (type === "radio") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='radio'
              name={keyName}
              value={
               isBool === "true" || isBool === "false"
                ? stringToBoolean(isBool)
                : checkedValue
              }
              onClick={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='radio'
             name={keyName}
             value={
              isBool === "true" || isBool === "false"
               ? stringToBoolean(isBool)
               : checkedValue
             }
             onClick={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "checkbox") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='checkbox'
              name={keyName}
              checked={
               isBool === true || isBool === false
                ? keyName === isBool
                : checkedValue
              }
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });

          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='checkbox'
             name={keyName}
             checked={
              isBool === true || isBool === false
               ? keyName === isBool
               : checkedValue
             }
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "select") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <select
              name={keyName}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }>
              {options.map(({ value, display }) => (
               <option value={value}>{display}</option>
              ))}
             </select>
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <select
             name={keyName}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }>
             {options.map(({ value, display }) => (
              <option value={value}>{display}</option>
             ))}
            </select>
           </label>
          );
         }
        } else if (type === "number") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='number'
              name={keyName}
              checked={keyName === checkedValue}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='number'
             name={keyName}
             checked={keyName === checkedValue}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "date") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <input
              type='date'
              name={keyName}
              value={displayDate && displayDate}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <input
             type='date'
             name={keyName}
             value={displayDate && displayDate}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
            />
           </label>
          );
         }
        } else if (type === "range") {
         if (Array.isArray(userState[parentState][parentKey])) {
          const arr = userState[parentState][parentKey].map((k, i) => {
           return (
            <label>
             {label}
             <Slider
              axis='x'
              x={parseFloat(userState[`${keyName}`])}
              value={parseFloat(userState[`${keyName}`])}
              onChange={(e) =>
               writeUserState(
                onChange,
                e,
                parentObj,
                n,
                parentState,
                parentKey,
                i
               )
              }
              orientation='horizontal'
              name={keyName}
              min={rangeMax}
              max={rangeMin}
              step={step}
             />
            </label>
           );
          });
          return arr;
         } else {
          return (
           <label>
            {label}
            <Slider
             axis='x'
             x={parseFloat(userState[`${keyName}`])}
             value={parseFloat(userState[`${keyName}`])}
             onChange={(e) =>
              writeUserState(onChange, e, parentObj, n, parentState, parentKey)
             }
             orientation='horizontal'
             name={keyName}
             min={rangeMax}
             max={rangeMin}
             step={step}
            />
           </label>
          );
         }
        } else if (type === "submit") {
         return (
          <input type='submit' onClick={() => readUserState(userState, lead)} />
         );
        }
       }