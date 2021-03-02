import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useRouter } from "next/router";
//import Image from "next/image";
import { useAppContext } from "../state/appState";
//import Link from "next/link";

const StickyNavbar = ({ pages }) => {
  //const router = useRouter();

  const router = [];
  const { addClick } = useAppContext();
  const [style, setStyle] = useState({});
  let position;
  if (process.browser) {
    position = window.pageYOffset;
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", onScroll);
      setStyle({
        backgroundColor: "#333",
        overflowY: "hidden",
        width: "95vw",
        marginLeft: "100px",
        overflowX: "hidden",
      });
    }
  }, []);

  useEffect(() => {
    if (position === 0) {
      setStyle({
        backgroundColor: "#333",
        zIndex: "999999999999999",
      });
    }
  }, [position, setStyle]);

  const onScroll = () => {
    setStyle({
      overflowY: "hidden",
      overflowX: "hidden",
      position: "sticky",
      top: "0",
      background: "black",
      color: "white",
      height: "100%",
      zIndex: "999999999999999",
    });
  };

  return (
    <div className='navbar' onScroll={onScroll} style={style}>
      <div className='grid-2c'>
        <div>
          <h2>
            {" "}
            <Link href='/'>
              <a>Section</a>
            </Link>{" "}
          </h2>
        </div>
        <div className='py-2 p-1'>
          <ul>
            {pages.map((page) => (
              <li
                key={page._id}
                onClick={() => {
                  router.push({
                    pathname: `/page/${page.title}`,
                    query: { data: page._id },
                  });
                  addClick({
                    loc: `${page.navbar}`,
                    time: `${new Date().getTime()}`,
                    btn: "clicked navbar link",
                  });
                }}>
                <button className='btn btn-primary'>{page.navtext}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
