{
  h.filter((h) => h.text != "")
    .filter((h) => h.sectionArea === "topCenter")
    .map(
      ({
        text,
        fontStyle,
        color,
        background,
        url,
        type,
        code,
        faIcon,
        faIconPosition,
        headingSize,
      }) => (
        <span>
          {type === "h" && headingSize === "h1" ? (
            <h1
              style={{
                color: `${color}`,
                fontFamily: `${camelCase(font)}`,
                background: `${background}`,
              }}>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>
              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </h1>
          ) : (
            ""
          )}
          {type === "h" && headingSize === "h2" ? (
            <h2
              style={{
                color: `${color}`,
                fontFamily: `${camelCase(font)}`,
                background: `${background}`,
              }}>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>
              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </h2>
          ) : (
            ""
          )}
          {type === "h" && headingSize === "h3" ? (
            <h3
              style={{
                color: `${color}`,
                fontFamily: `${camelCase(font)}`,
                background: `${background}`,
              }}>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>
              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </h3>
          ) : (
            ""
          )}
          {type === "h" && headingSize === "h4" ? (
            <h4
              style={{
                color: `${color}`,
                fontFamily: `${camelCase(font)}`,
                background: `${background}`,
              }}>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>
              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </h4>
          ) : (
            ""
          )}
          {type === "h" && headingSize === "h5" ? (
            <h5
              style={{
                color: `${color}`,
                fontFamily: `${camelCase(font)}`,
                background: `${background}`,
              }}>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>
              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </h5>
          ) : (
            ""
          )}
          {type === "p" ? (
            <p
              style={{
                color: `${color}`,
                background: `${background}`,
                fontFamily: `${camelCase(font)}`,
              }}>
              {fontStyle ? parse(`<${fontStyle}>${text}</${fontStyle}>`) : text}
            </p>
          ) : (
            ""
          )}
          {type === "li" ? (
            <li>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>

              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </li>
          ) : (
            ""
          )}
          {type === "i" ? (
            <i style={{ color: `${color}` }} className={faIcon} />
          ) : (
            ""
          )}
          {type === "a" ? (
            <a href={url} target='_blank' rel='noopener noreferrer'>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>

              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </a>
          ) : (
            ""
          )}
          {type === "button" ? (
            <button style={{ background: `${background}` }} onClick={action}>
              {faIconPosition === "top" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i> <br />
                </span>
              ) : (
                ""
              )}
              <span>
                {faIconPosition === "front" ? <i className={faIcon}></i> : ""}{" "}
                {fontStyle
                  ? parse(`<${fontStyle}>${text}</${fontStyle}>`)
                  : text}
                {faIconPosition === "back" ? <i className={faIcon}></i> : ""}
              </span>

              {faIconPosition === "bottom" ? (
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                  }}>
                  <i className={faIcon}></i>
                </span>
              ) : (
                ""
              )}
            </button>
          ) : (
            ""
          )}
          {type === "img" ? <img src={code} /> : ""}
          {type === "vid" ? (
            <YouTube
              videoId={url}
              opts={{
                height: height,
                width: width,
                playerVars: {
                  autoplay: autoplay,
                },
              }}
            />
          ) : (
            ""
          )}
        </span>
      )
    );
}
