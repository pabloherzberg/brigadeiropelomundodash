import React, { useState, useEffect, useRef } from "react";
import firebase from "../../services/firebase";
import { useHistory } from "react-router-dom";

import Loading from "../../components/Loading";

import logo from "../../assets/img/logo196.png";
import folderSVG from "../../assets/img/folder.svg";
import airplaneSVG from "../../assets/svg/airplane.svg";
import lineSVG from "../../assets/svg/line2.svg";

import { Main } from "./styles.js";
import anime from "animejs/lib/anime.es.js";
import { path } from "animejs";

function Home() {
  const [loading, setLoading] = useState(true);
  const [listOfCandys, setListOfCandys] = useState([]);

  const history = useHistory();

  const animation = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const path = anime.path("#line path");
    animationRef.current = anime({
      targets: "#animation #airplane",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      easiling: "linear",
      duration: 20000,
      loop: true,
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref()
      .on("value", async (snapshot) => {
        const candys = snapshot.val();
        setListOfCandys(candys);
        setLoading(false);
      });
  }, []);

  return (
    <Main>
      <header>
        <span>Brigadeiro Pelo Mundo Dashboard</span>
      </header>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <ul>
            {Object.keys(listOfCandys).map((key, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    history.push({
                      pathname: "/pasta",
                      state: {
                        candys: listOfCandys,
                        folder: key,
                      },
                    });
                  }}
                >
                  <img src={folderSVG} />
                </div>
                <span>{key}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <aside onClick={() => animationRef.current.restart()}>
        <div ref={animation} id="animation">
          <img id="logo" src={logo} />
          <svg
            id="line"
            viewBox="0 0 411 245"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M410.5 207.45C408.151 218.995 401.181 226.896 390.232 232.27C379.241 237.664 364.255 240.503 345.961 241.876C322.88 243.609 294.649 243.007 262.7 242.326C243.98 241.926 223.984 241.5 203 241.5C179.058 241.5 156.183 242.234 134.998 242.914C131.068 243.04 127.196 243.164 123.385 243.281C99.0314 244.032 77.2254 244.499 58.9703 243.376C40.7023 242.252 26.0624 239.537 16.0007 233.969C10.9792 231.19 7.11112 227.707 4.49587 223.367C1.88113 219.027 0.5 213.8 0.5 207.5C0.5 93.1725 92.2862 0.5 205.5 0.5C318.697 0.5 410.473 93.1454 410.5 207.45Z"
              stroke="black"
            />
          </svg>

          <div id="airplane">
            <img src={airplaneSVG} />
          </div>
        </div>
      </aside>
    </Main>
  );
}

export default Home;
