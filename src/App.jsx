import styled, { ThemeProvider } from "styled-components";
import Router from "./shared/Router";
import theme from "./style/theme";
import GlobalFont from "./style/fonts";
import background from "./style/image/background.jpg";
import GlobalStyle from "./style/GlobalStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getCurrentUser } from "./redux/modules/authSlice";
import { __getComments } from "./redux/modules/commentsSlice";
import { SyncLoader } from "react-spinners";

function App() {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.teamSlice.currentTeamIndex);
  const authLoading = useSelector((state) => state.authSlice.isLoading);
  const commentsLoading = useSelector((state) => state.commentsSlice.isLoading);

  // 사용자 정보 확인
  useEffect(() => {
    dispatch(__getCurrentUser());
  }, []);

  return (
    <StWrapper>
      <StLoadingSpinnerContainer>
        <SyncLoader
          color="#000000"
          size={20}
          loading={authLoading || commentsLoading}
        />
      </StLoadingSpinnerContainer>
      <ThemeProvider theme={theme[currentTeam]}>
        <GlobalStyle />
        <GlobalFont />
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
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

const StLoadingSpinnerContainer = styled.div`
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export default App;
