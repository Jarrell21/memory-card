import * as React from "react";
import { Container } from "@mui/material";
import LandingPage from "./LandingPage";
import Game from "./Game";

function Main() {
  const [gameStart, setGameStart] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState(60);
  return (
    <Container maxWidth="xl">
      {gameStart ? (
        <Game difficulty={difficulty} setGameStart={setGameStart} />
      ) : (
        <LandingPage
          setDifficulty={setDifficulty}
          setGameStart={setGameStart}
        />
      )}
    </Container>
  );
}

export default Main;
