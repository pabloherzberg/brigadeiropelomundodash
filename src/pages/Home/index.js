import React, { useState, useEffect } from "react";
import firebase from "../../services/firebase";
import { useHistory } from "react-router-dom";

import Loading from "../../components/Loading";

import logo from "../../assets/img/logo196.png";
import folderSVG from "../../assets/img/folder.svg";

import { Main } from "./styles.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [listOfCandys, setListOfCandys] = useState([]);

  const history = useHistory();

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
        <div id="animation">
          <img id="logo" src={logo} />
        </div>
      </aside>
    </Main>
  );
}

export default Home;
