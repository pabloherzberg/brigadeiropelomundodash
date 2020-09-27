import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../services/firebase";

import { Container } from "./styles";

import airplaneSVG from "../../assets/svg/airplaneColor.svg";
import logo from "../../assets/img/logo196.png";

function Auth() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(login, pass)
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        const data = JSON.stringify({ email: login, uid: uid });
        sessionStorage.setItem("user", data);
        window.location.href = "/home";
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <div id="airplane">
        <img src={airplaneSVG} />
        <div id="rope" />
        <img id="logo" src={logo} />
      </div>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            name="login"
            placeholder="E-mail"
          />
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="pass"
            placeholder="Senha"
          />
          <button type="submit">Entrar</button>
        </form>
      </main>
    </Container>
  );
}

export default Auth;
