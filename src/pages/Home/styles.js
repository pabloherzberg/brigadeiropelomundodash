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
  }
  main {
    grid-column: 1/4;
    grid-row: 2/8;
    #folder {
      background: ${colors.white};
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        margin-left: 2em;
        justify-content: flex-start;
        gap: 0.5em;
        li:first-child {
          margin-left: 0em;
        }
        li {
          cursor: pointer;
          height: 1.5em;
          border: 1px solid ${colors.white};
          transition: 0.5s;
          span {
            color: ${colors.darkGray};
            font-size: 0.9em;
          }

          &:hover {
            height: 1.5em;
            border: 1px solid ${colors.darkGray};
            span {
              font-size: 1em;
              color: ${colors.black};
            }
          }
        }
      }
    }
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
          border: 1px solid ${colors.black};
          background: ${colors.darkPink};
          display: block;
          width: 4em;
          height: 4em;
          perspective: 200px;
          cursor: pointer;
          &::before {
            position: absolute;
            content: "";
            border: 1px solid ${colors.black};
            background: ${colors.mediumPink};
            display: block;
            width: 3.8em;
            height: 3.8em;
            transform-style: preserve-3d;
            transform: rotate3d(-10, 1, 5, 10deg);
            top: 5%;
          }
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
    grid-column: 5/6;
    grid-row: 2/8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    #info {
      background: green;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      input {
        width: 85%;
        background: transparent;
        border: none;
        border-bottom: 1px solid ${colors.darkGray};
      }
      #imageWrap {
        width: 100%;
        height: 50%;
        background: white;
      }
    }
  }
`;
