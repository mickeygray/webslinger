const updatePageCss = (e, n, n1, n2, n3, n4, n5, n6, n7) => {
 let value;
 let name;

 if (e.currentTarget) {
  value = e.currentTarget.value;
  name = e.currentTarget.name;
 }

 if (n === "transform") {
  const pushColumns = produce(page, (draft) => {
   draft["css"]["transform"].push(value);
   draft["css"]["transform"] = filterByCount(draft["css"]["transform"], 1);
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "transition") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["transition"][n1][name] = value;
  });
  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "cubicNs") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["transition"][n1]["cubicNs"][n] = e;
  });
  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "css") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"][name] = value;
  });
  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "animation") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1][name] = value;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "animationkey") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1]["keyframes"][n2][name] = value;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "animationkeyprop" && !n4 && !n5) {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1]["keyframes"][n2]["properties"][n3][
    name
   ] = value;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (
  n === "animationkeyprop" &&
  n4 &&
  n4 != "font" &&
  n4 != "boxshadow" &&
  !n5
 ) {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1]["keyframes"][n2]["properties"][n3][
    "transValues"
   ][n4] = value;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "animationkeyprop" && n6 && n6 === "font" && n7) {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1]["keyframes"][n4]["properties"][n5][name] = n7;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n === "animationkeyprop" && n4 && n4 === "boxshadow") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1]["keyframes"][n2]["properties"][n3][
    "shadowValues"
   ][name] = value;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (
  n === "animationkeyprop" &&
  n4 &&
  n4 != "font" &&
  n4 != "boxshadow" &&
  n5
 ) {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["animation"][n1]["keyframes"][n2]["properties"][n3][
    "transValues"
   ][n4] = e;
  });

  dispatch({ type: SET_PAGE, payload: pushColumns });
 } else if (n1 === "slider") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"][n] = e;
  });

  dispatch({ type: UPDATE_CELL, payload: pushColumns });
 } else if (slider === "transformProp") {
  const pushColumns = produce(cells, (draft) => {
   draft["css"]["transformProp"][n] = e;
  });

  dispatch({ type: UPDATE_CELL, payload: pushColumns });
 }
};
