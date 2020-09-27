import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  height: 100vh;
  width: 100vw;
  header {
    grid-column: 1/6;
    grid-row: 1/2;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-left: 0.5em;
    position: relative;
    #airplaneHeader {
      position: absolute;
      top: 15%;
      left: 25%;
      width: 30px;
      height: 30px;
      object-fit: contain;

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        object-fit: contain;
        max-width: 65%;
        max-height: 65%;
        transform: rotate(-45deg);
      }
    }
    span {
      position: absolute;
      color: ${colors.white};
      font-size: 1.5em;
      margin-left: auto;
      margin-right: auto;
      font-family: "Graduate", cursive;
    }
  }
  main {
    grid-column: 1/4;
    grid-row: 2/8;

    ul {
      display: flex;
      list-style: none;
      gap: 2em;
      margin-top: 2em;
      li:first-child {
        margin-left: 2em;
      }
      li {
        div {
          position: relative;
          display: block;
          width: 4em;
          height: 4em;
          perspective: 200px;
          cursor: pointer;

          &:hover {
            transform: rotate3d(-5, 2, 6, 11deg);
          }
        }
        span {
          color: ${colors.white};
        }
      }
    }
  }
  aside {
    grid-column: 4/6;
    grid-row: 2/8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: ${colors.mediumPurple};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    #animation {
      position: relative;
      width: 300px;
      height: 300px;
      grid-column: 2/3;
      grid-row: 2/3;

      #logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        object-fit: contain;
      }
      #line {
        position: relative;
        opacity: 0;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 110px;
        height: 110px;
        object-fit: contain;
      }
      #airplane {
        position: absolute;
        top: 15%;
        left: 25%;
        width: 30px;
        height: 30px;
        object-fit: contain;

        display: flex;
        justify-content: center;
        align-items: center;
        img {
          object-fit: contain;
          max-width: 65%;
          max-height: 65%;
          transform: rotate(-45deg);
        }
      }
    }
  }
`;
