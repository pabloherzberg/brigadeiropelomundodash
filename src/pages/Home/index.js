import React, { useState, useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import firebase from "../../services/firebase";
import { useHistory } from "react-router-dom";

import Loading from "../../components/Loading";

import logo from "../../assets/img/logo196.png";
import folderSVG from "../../assets/img/folder.svg";
import airplaneSVG from "../../assets/svg/airplane.svg";
import lineSVG from "../../assets/svg/line.svg";

import { Main } from "./styles.js";
import { path } from "animejs";

function Home() {
  const [loading, setLoading] = useState(true);
  const [listOfCandys, setListOfCandys] = useState([]);

  const history = useHistory();

  const animation = useRef(null);

  /* if (animation.current !== null) {
    let path = anime.path("#line path");

    anime({
      targets: "#airplane",
      translateX: path("x"),
      translateY: path("y"),
      easiling: "linear",
      duration: 20000,
      loop: true,
    });
  } */

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
        <span>Brigadeiro Pelo Mundo</span>
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
      <aside>
        <div ref={animation} id="animation">
          <img id="logo" src={logo} />
          {/* <svg
            id="line"
            viewBox="0 0 121 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Union"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M50.084 3.72266L50 3.84862L50 4L50 6V6.06155L50.0149 6.12127L50.5149 8.12127L50.5359 8.20529L50.584 8.27736L51.584 9.77735L51.6114 9.81854L51.6464 9.85355L52.6465 10.8536L55.1465 13.3536L60.1067 18.3138L47.0178 23.4558C19.7239 29.1063 0 50.7796 0 81C0 100.645 9.72455 94.2831 24.2901 84.7548C35.932 77.1389 50.6665 67.5 66 67.5C81.6644 67.5 94.4383 76.5297 103.719 83.0903C114.89 90.9865 121 95.3059 121 76C121 45.2406 102.081 27.1225 74.4225 22.9381L61.9449 18.3168L66.8284 13.8772L69.8201 11.3841L69.8375 11.3696L69.8536 11.3536L71.3536 9.85355L71.3886 9.81854L71.416 9.77735L72.416 8.27736L72.4641 8.2053L72.4851 8.12127L72.9851 6.12126L73 6.06155V6V4V3.84861L72.916 3.72265L71.916 2.22265L71.8886 2.18145L71.8536 2.14644L70.8536 1.14645L70.7962 1.08908L70.7236 1.0528L68.7236 0.0527875L68.618 0H68.5H66.5H66.4385L66.3787 0.0149273L64.3787 0.514928L64.2444 0.548517L64.1464 0.646445L62.6464 2.14645L62.6114 2.18146L62.584 2.22265L61.584 3.72265L61.5667 3.74855L61.5528 3.77639L61 4.88197L60.4472 3.77639L60.4333 3.74855L60.416 3.72265L59.416 2.22265L59.3886 2.18146L59.3536 2.14645L57.8536 0.646446L57.7701 0.562984L57.6581 0.525658L56.1581 0.025667L56.0811 1.0147e-05L56 9.42704e-06L54 0H53.8486L53.7226 0.0839764L52.2227 1.08398L52.1815 1.11144L52.1465 1.14645L51.1465 2.14644L51.1114 2.18145L51.084 2.22265L50.084 3.72266ZM74.171 23.9113L74.3263 23.9689L74.3383 23.9366C85.9254 25.6997 95.9051 29.9356 103.542 36.5034C113.854 45.3717 120 58.5803 120 76C120 80.3906 119.68 83.4594 119.091 85.5069C118.5 87.5635 117.709 88.3673 116.93 88.6396C116.089 88.9339 114.877 88.7566 113.122 87.9374C111.401 87.134 109.374 85.8196 107.014 84.1831C106.147 83.5821 105.24 82.9403 104.293 82.2704L104.293 82.2699C95.0395 75.7234 82.0029 66.5 66 66.5C57.1419 66.5 48.5363 69.6312 40.6668 73.6913C34.5521 76.846 28.812 80.6012 23.7168 83.9345L23.7166 83.9346C22.2621 84.8862 20.8601 85.8034 19.517 86.6624C16.4747 88.6082 13.7465 90.2486 11.3609 91.3542C8.94947 92.4719 7.03241 92.9725 5.56981 92.8085C4.22683 92.658 3.13676 91.9323 2.33091 90.1552C1.49181 88.3047 1 85.3744 1 81C1 51.3261 20.3223 30.0192 47.1742 24.4435L47.1828 24.4654L47.3098 24.4155C47.6141 24.353 47.9194 24.2925 48.2257 24.234L51.1159 22.9203L61.0053 19.0351L72.7953 23.4018L73.9804 23.883C74.044 23.8924 74.1075 23.9018 74.171 23.9113ZM55.8536 12.6465L61.0164 17.8093L66.1637 13.13L66.1716 13.1228L66.1799 13.1159L69.1625 10.6304L70.6114 9.18145L71.5359 7.79472L72 5.93845V4.15139L71.1114 2.81854L70.2038 1.91093L68.382 0.999999L66.5616 0.999999L64.7556 1.45148L63.3886 2.81855L62.4333 4.25145L61.4472 6.22361L61 7.11805L60.5528 6.22362L59.5667 4.25145L58.6114 2.81855L57.2299 1.43702L55.9189 1.00001L54.1514 1L52.8186 1.88857L51.8886 2.81854L51 4.15139L51 5.93845L51.4641 7.79472L52.3886 9.18146L53.3536 10.1465L55.8536 12.6465Z"
              fill="black"
            />
          </svg>
          <img id="airplane" src={airplaneSVG} /> */}
        </div>
      </aside>
    </Main>
  );
}

export default Home;
