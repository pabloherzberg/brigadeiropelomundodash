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

    span {
      color: ${colors.white};
      font-size: 1.5em;
      margin-left: auto;
      margin-right: auto;
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
      width: 100%;
      height: 100%;
      grid-column: 2/3;
      grid-row: 2/3;
      #logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        height: 350px;
        object-fit: contain;
      }
      #line {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
        height: 150px;
        object-fit: contain;
      }
      #airplane {
        position: absolute;

        top: 0%;
        left: 0%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
  }
`;
