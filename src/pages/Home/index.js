import React, { useState, useEffect } from "react";
import firebase from "../../services/firebase";

import { Main } from "./styles.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [isOpenFolder, setIsOpenFolder] = useState(false);
  const [selectedFolder, setFolder] = useState();
  const [listOfCandys, setListOfCandys] = useState([]);
  const [candy, setCandy] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref()
      .once("value")
      .then(async (snapshot) => {
        const candys = snapshot.val();
        setListOfCandys(candys);
      });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [listOfCandys]);

  console.log(listOfCandys);

  async function getCandyInfo(item, index) {
    setCandy(item);

    await firebase
      .storage()
      .ref(selectedFolder)
      .child(`/${index}.png`)
      .getDownloadURL()
      .then((url) => setImage(url))
      .catch(() => "nenhuma imagem =(");
  }
  return (
    <Main>
      <header></header>
      <main>
        {isOpenFolder ? (
          <div id="folder">
            <ul>
              {listOfCandys[selectedFolder].map((item, index) => (
                <li key={index} onClick={() => getCandyInfo(item, index)}>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : loading ? (
          <div>Carregando pastas</div>
        ) : (
          <ul>
            {Object.keys(listOfCandys).map((key, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    setIsOpenFolder(true);
                    setFolder(key);
                  }}
                ></div>
                <span>{key}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <aside>
        <div id="info">
          <input type="text" name="name" value={candy.name} />
          <input type="number" name="value" value={candy.value} />
          <div id="imageWrap">
            <img src={image} alt="selfie do doce" />
          </div>
        </div>
      </aside>
    </Main>
  );
}

export default Home;
