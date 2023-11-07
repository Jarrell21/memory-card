import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "PocketMonk",
    fontSize: 20,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

export default App;
