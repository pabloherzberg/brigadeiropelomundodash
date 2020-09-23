import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
export const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-size:22px;
  font-family: 'Roboto', sans-serif;
}
body {
        background: linear-gradient(to bottom right, #ee3a81, #f7acb0);
        height:100vh;
        width:100vw;
      }
`;
