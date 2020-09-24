import React from "react";
import { Container } from "./styles";

import brigadeiroSVG from "../../assets/img/brigadeiro.svg";
import brownieSVG from "../../assets/img/brownie.svg";
import giftSVG from "../../assets/img/gift.svg";

function Loading() {
  return (
    <Container>
      <div id="card">
        <div id="card_container">
          <div id="front">
            <img src={brigadeiroSVG} />
          </div>
          <div id="middle">
            <img src={giftSVG} />
          </div>
          <div id="back">
            <img src={brownieSVG} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Loading;
