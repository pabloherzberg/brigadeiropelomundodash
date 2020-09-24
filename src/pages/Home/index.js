import React, { useState, useEffect } from "react";

import firebase from "../../services/firebase";
import Loading from "../../components/Loading";

import brigadeiroSVG from "../../assets/img/brigadeiro.svg";
import brownieSVG from "../../assets/img/brownie.svg";
import gifSVG from "../../assets/img/gift.svg";
import logo from "../../assets/img/logo196.png";
import folderSVG from "../../assets/img/folder.svg";

import { Main } from "./styles.js";

function Home() {
  const [loading, setLoading] = useState(true);
  const [isOpenFolder, setIsOpenFolder] = useState(false);
  const [selectedFolder, setFolder] = useState("");
  const [listOfCandys, setListOfCandys] = useState([]);
  const [candy, setCandy] = useState({});
  const [candyIndex, setCandyIndex] = useState(0);
  const [image, setImage] = useState("");
  const [imageFullData, setImageFullData] = useState("");
  const [newCandyName, setNewCandyName] = useState("");
  const [newCandyPrice, setNewCandyPrice] = useState(0);
  const [posImg1, setPosImg1] = useState(Math.floor(Math.random() * 100));
  const [posImg2, setPosImg2] = useState(Math.floor(Math.random() * 100));
  const [posImg3, setPosImg3] = useState(Math.floor(Math.random() * 100));

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

  async function getCandyInfo(item, index) {
    setLoading(true);

    setCandy(item);
    setCandyIndex(index);

    setPosImg1(Math.floor(Math.random() * 100));
    setPosImg2(Math.floor(Math.random() * 100));
    setPosImg3(Math.floor(Math.random() * 100));

    await firebase
      .storage()
      .ref(selectedFolder)
      .child(`/${index}`)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        setLoading(false);
      })
      .catch(() => {
        setImage(false);
        setLoading(false);
      });
  }

  async function fileHandler(event) {
    setLoading(true);
    const fileObj = event.target.files[0];

    if (fileObj) {
      const image = URL.createObjectURL(fileObj);
      setImage(image);
      setImageFullData(fileObj);
    } else {
      console.log("Imagem não carregada");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    firebase
      .database()
      .ref(`${selectedFolder}/${candyIndex}`)
      .set({
        name: newCandyName || candy.name,
        value: newCandyPrice || candy.value,
      });

    firebase
      .storage()
      .ref(`${selectedFolder}/${candyIndex}`)
      .put(imageFullData)
      .then((snapshot) => console.log("upload"))
      .catch((e) => console.error(e));
  }

  async function handleDelete(index) {
    await firebase.database().ref(selectedFolder).child(`/${index}`).remove();
  }

  return (
    <Main>
      <header>
        {isOpenFolder ? (
          <>
            <button onClick={() => (window.location.href = "/")}>voltar</button>
            <span>Pasta {selectedFolder}</span>
          </>
        ) : (
          <span>Brigadeiro Pelo Mundo</span>
        )}
      </header>
      <main>
        {isOpenFolder ? (
          <div id="folder">
            <ul>
              {listOfCandys[selectedFolder].map((item, index) => (
                <li key={index} onClick={() => getCandyInfo(item, index)}>
                  <span>{item.name}</span>
                  <button onClick={() => handleDelete(item, index)}>
                    Deletar
                  </button>
                </li>
              ))}
              <li
                onClick={() => {
                  setCandyIndex(listOfCandys[selectedFolder].length);
                  setCandy({ name: "Novo", value: 0 });
                  setImage(false);
                }}
              >
                {" "}
                + Adicionar doce
              </li>
            </ul>
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          <ul>
            {Object.keys(listOfCandys).map((key, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    setIsOpenFolder(true);
                    setFolder(key);
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
        {isOpenFolder ? (
          <form onSubmit={handleSubmit}>
            <div id="info">
              <input
                type="text"
                name="name"
                defaultValue={candy.name}
                onChange={(e) => setNewCandyName(e.target.value)}
              />
              <input
                type="number"
                name="value"
                defaultValue={candy.value}
                step={0.01}
                onChange={(e) => setNewCandyPrice(e.target.value)}
              />
              <div id="imageWrap">
                {image ? (
                  loading ? (
                    <Loading />
                  ) : (
                    <img src={image} alt="selfie do doce" />
                  )
                ) : (
                  <div id="buttonLoadImg">
                    <img
                      style={{ top: `${posImg1}%`, left: `${posImg3}%` }}
                      src={brigadeiroSVG}
                    />
                    <img
                      style={{ top: `${posImg2}%`, left: `${posImg2}%` }}
                      src={gifSVG}
                    />
                    <img
                      style={{ top: `${posImg3}%`, left: `${posImg1}%` }}
                      src={brownieSVG}
                    />
                    <input
                      name="loadImg"
                      type="file"
                      name="img"
                      onChange={fileHandler}
                    />
                    <label id="labelforfile" htmlFor="loadImg">
                      Escolher imagem
                    </label>
                  </div>
                )}
              </div>
              <button type="submit">Atualizar</button>
            </div>
          </form>
        ) : (
          <div id="animation">
            <img id="logo" src={logo} />
          </div>
        )}
      </aside>
    </Main>
  );
}

export default Home;
