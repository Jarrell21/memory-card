import * as React from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import GameResultModal from "./GameResultModal";
import PokemonCardsList from "./PokemonCardsList";
import { getRandomNumber } from "../../helpers/HelperFunctions";
import useData from "./useData";

type GameProps = {
  difficulty: number;
  setGameStart: (arg: boolean) => void;
};

export default function Game({ difficulty, setGameStart }: GameProps) {
  const [dataOffSet, setDataOffSet] = React.useState(getRandomNumber(1001));
  const { data, setData, error, loading } = useData({ dataOffSet, difficulty });
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [openResultModal, setOpenResultModal] = React.useState({
    open: false,
    loading: loading,
    playerWon: false,
  });

  React.useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  function handleGetNewDataSet() {
    const randomNumber = getRandomNumber(1001);
    setDataOffSet(randomNumber);
    setScore(0);
  }

  return (
    <>
      <Grid container margin={1} spacing={1} justifyContent="space-around">
        <Grid item>
          <Typography>
            Score: {score} / {difficulty / 3}
          </Typography>
          <Typography>Best Score: {bestScore}</Typography>
        </Grid>
        <Grid item>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={1} justifyContent={"center"}>
              <Grid item>
                <Button variant="outlined" onClick={handleGetNewDataSet}>
                  Get new set of cards
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => setGameStart(false)}>
                  Change difficulty
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <PokemonCardsList
        loading={loading}
        difficulty={difficulty}
        data={data}
        score={score}
        setData={setData}
        setScore={setScore}
        setOpenResultModal={setOpenResultModal}
      />
      {error && (
        <Box
          textAlign={"center"}
        >{`There is a problem fetching the post data - ${error}`}</Box>
      )}
      <GameResultModal
        loading={loading}
        openResultModal={openResultModal}
        setOpenResultModal={setOpenResultModal}
        restartGame={handleGetNewDataSet}
      />
    </>
  );
}
