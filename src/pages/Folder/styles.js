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
    button {
      background: ${colors.lightBlue};
      color: ${colors.darkPink};
      width: 4em;
      height: 2em;
      font-size: 1em;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
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
          margin-top: 2em;
        }
        li:last-child {
          background: ${colors.lightGreen};
          border-radius: 2px;
          color: ${colors.white};
          &:hover {
            background: ${colors.darkGreen};
          }
        }
        li {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          height: 1.5em;
          border: 1px solid ${colors.white};
          transition: 0.5s;
          span {
            color: ${colors.darkGray};
            font-size: 0.9em;
          }
          button {
            position: relative;
            width: 6em;
            border: none;
            border-radius: 8px;
            font-size: 1em;
            cursor: pointer;
            display: grid;
            place-items: center;
            &:hover::before {
              animation: cardio infinite forwards 950ms;
            }
            &::before {
              border-radius: 8px;
              background: ${colors.darkPink};
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
            &::after {
              border-radius: 8px;
              color: ${colors.white};
              content: "Deletar";
              display: block;
              background: ${colors.mediumPink};
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
            @keyframes cardio {
              from {
                transform: scale(1);

                opacity: 1;
              }
              to {
                transform: scale(1.5);

                opacity: 0;
              }
            }
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
  }
  aside {
    grid-column: 4/6;
    grid-row: 2/8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: ${colors.mediumPurple};
    form {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      #info {
        width: 375px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;

        input {
          width: 85%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${colors.darkGray};
          color: ${colors.white};
        }
        #imageWrap {
          width: 100%;
          height: 50%;
          background: white;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            object-fit: contain;
            max-width: 50%;
          }
        }
        #buttonLoadImg {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          @keyframes kickself {
            from {
              transform: rotateZ(0deg);
            }
            to {
              transform: rotateZ(360deg);
            }
          }
          img {
            position: absolute;
            max-width: 20%;
            top: 0;
            left: 0;
            animation: kickself forwards infinite 2s ease-in-out;
          }

          input[type="file"] {
            display: block;
            opacity: 0;
            padding: 20px 10px;
            width: 200px;
            background-color: ${colors.lightBlue};
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            z-index: 500;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
          }
          #labelforfile {
            padding: 20px 10px;
            width: 200px;
            background-color: ${colors.lightBlue};
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
          }
        }
        button {
          background: ${colors.lightBlue};
          border: none;
          height: 3em;
          width: 6em;
          border-radius: 8px;
          color: ${colors.darkPink};
          cursor: pointer;
        }
      }
    }
    #animation {
      position: relative;
      width: 100%;
      height: 100%;
      #logo {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        position: absolute;
      }
    }
  }
`;
