import * as React from "react";
import { Container, Fab } from "@mui/material";
import LandingPage from "./LandingPage";
import Game from "./Game";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpModal from "./HelpModal";

function Main() {
  const [gameStart, setGameStart] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState(60);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
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
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <HelpOutlineIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpen}
        />
        <HelpModal open={openModal} setOpen={setOpenModal} />
      </Fab>
    </Container>
  );
}

export default Main;
