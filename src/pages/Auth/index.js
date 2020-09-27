import React from "react";
import { Container } from "./styles";

import airplaneSVG from "../../assets/svg/airplaneColor.svg";
import logo from "../../assets/img/logo196.png";

function Auth() {
  return (
    <Container>
      <div id="airplane">
        <img src={airplaneSVG} />
        <div id="rope" />
        <img id="logo" src={logo} />
      </div>
      <main>
        <form>
          <input type="text" name="login" placeholder="E-mail" />
          <input type="password" name="pass" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>
      </main>
    </Container>
  );
}

export default Auth;
