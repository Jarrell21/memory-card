import * as React from "react";
import {
  Button,
  CircularProgress,
  Fade,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import GameResultModal from "./GameResultModal";
import PokemonCardsList from "./PokemonCardsList";

type GameProps = {
  difficulty: number;
  setGameStart: (arg: boolean) => void;
};

type ExpectedData = {
  name: string;
  url: string;
};

export default function Game({ difficulty, setGameStart }: GameProps) {
  const [data, setData] = React.useState<ExpectedData[]>([]);
  const [dataOffSet, setDataOffSet] = React.useState(getRandomNumber(1001));
  const [loading, setLoading] = React.useState(true);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [openResultModal, setOpenResultModal] = React.useState({
    open: false,
    loading: loading,
    playerWon: false,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${dataOffSet}&limit=${difficulty}`
        );
        let tempData = await response.json();
        tempData = getEveryThirdItem(tempData.results);

        tempData = tempData.map((obj: ExpectedData) => ({
          ...obj,
          clicked: false,
        }));

        setData(tempData);
        loadCards();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dataOffSet, difficulty]);

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

  function loadCards() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function getEveryThirdItem(array: ExpectedData[]) {
    var result = [];
    for (var i = 0; i < array.length; i += 3) {
      result.push(array[i]);
    }
    return result;
  }

  function getRandomNumber(limit: number) {
    return Math.floor(Math.random() * limit);
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
      <GameResultModal
        openResultModal={openResultModal}
        setOpenResultModal={setOpenResultModal}
        restartGame={handleGetNewDataSet}
      />
    </>
  );
}
