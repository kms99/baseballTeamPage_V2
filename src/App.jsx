import styled, { ThemeProvider } from "styled-components";
import Router from "./shared/Router";
import theme from "./style/theme";
import GlobalStyle from "./GlobalStyle";
import GlobalFont from "./style/fonts";
import background from "./style/image/background.jpg";

function App() {
  return (
    <StWrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GlobalFont />
        <Router />
      </ThemeProvider>
    </StWrapper>
  );
}

// styled components
const StWrapper = styled.div`
  position: relative;
  max-width: 120rem;
  min-width: 80rem;
  margin: auto;
  background: rgba(0, 0, 0, 0.9);
  height: auto;
  min-height: 100vh;
  padding-bottom: 1rem;
  font-family: "NotoSansKR";
  &::before {
    content: "";
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    background: url(${background});
    background-position: center;
    background-size: cover;
  }
`;

export default App;
