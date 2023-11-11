import "./App.css";
import Header from "./components/Header";
import MainPage from "./components/Main/MainPage";
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
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
