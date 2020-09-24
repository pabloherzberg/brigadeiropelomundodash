import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes rotation {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
  #card {
    height: 50%;
    width: 50%;
    #card_container {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateY(0.5turn);
      animation-name: rotation;
      animation-duration: 2s;
      animation-delay: 0s;
      animation-timing-function: ease-out;
      animation-iteration-count: infinite;
      animation-direction: forwards;
      animation-play-state: running;
      #front {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.01);
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transform: rotateY(120deg);
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }
      #middle {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.01);
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transform: rotateY(360deg);
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }
      #back {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.01);
        display: flex;
        justify-content: center;
        align-items: center;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transform: rotateY(240deg);
        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;
