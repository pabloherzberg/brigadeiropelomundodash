import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background: linear-gradient(
    to bottom right,
    ${colors.darkGreen},
    ${colors.lightGreen}
  );
  main {
    position: relative;
    width: 400px;
    height: 500px;
    border-radius: 4px;
    background: white;
    overflow: hidden;
  }
  main::before {
    position: absolute;
    display: block;
    content: "";
    width: 650px;
    height: 650px;
    top: -15%;
    left: -30%;
    background-image: linear-gradient(
      45deg,
      ${colors.darkPink},
      ${colors.lightPink}
    );
    animation: animate infinite linear 6s;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  form {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    input {
      font-size: 0.8em;
      width: 70%;
      height: 2em;
    }
    button {
      background-color: ${colors.lightBlue};
      color: ${colors.white};
      font-weight: bold;
      border: none;
      border-radius: 4px;
      width: 70%;
      height: 2em;
      cursor: pointer;
    }
  }
  #airplane {
    position: absolute;
    top: 0;
    left: 20%;
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    img {
      object-fit: contain;
      transform: rotate(-45deg);
    }
    #logo {
      position: absolute;
      left: -300%;
      object-fit: contain;
      transform: rotate(0deg);
      max-width: 100px;
    }
    #rope {
      position: absolute;
      display: block;
      content: "";
      background: white;
      transform: rotate(0deg);
      width: 100px;
      height: 1px;
      left: -170%;
    }
    animation: animate1 infinite linear 15s;
  }
  @keyframes animate1 {
    0% {
      top: 0;
      left: 20%;
      transform: rotate(0deg);
    }
    25% {
      top: 0;
      left: 80%;
      transform: rotate(0deg);
    }
    26% {
      transform: rotate(90deg);
    }
    50% {
      top: 95%;
      left: 80%;
      transform: rotate(90deg);
    }
    51% {
      transform: rotate(180deg);
    }
    75% {
      top: 90%;
      left: 10%;
      transform: rotate(180deg);
    }
    76% {
      transform: rotate(270deg);
    }
    99% {
      top: 0;
      left: 20%;
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
