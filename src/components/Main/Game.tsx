import * as React from "react";
import {
  Button,
  CircularProgress,
  Fade,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import PokemonCard from "./PokemonCard";
import GameResultModal from "./GameResultModal";

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

  function handleCardClick(name: string, clicked: boolean) {
    const totalScore = difficulty / 3;
    if (score > totalScore - 1) return;

    if (clicked) {
      setOpenResultModal((prev) => ({ ...prev, open: true, playerWon: false }));
      resetClickedProp();
      setScore(0);

      return;
    }

    if (score === totalScore - 1) {
      setOpenResultModal((prev) => ({ ...prev, open: true, playerWon: true }));
    } else {
      shuffleCards();
      loadCards();
    }

    const newData = data.map((obj: ExpectedData) =>
      obj.name === name ? { ...obj, clicked: true } : obj
    );

    setData(newData);
    setScore((prev) => prev + 1);
  }

  function resetClickedProp() {
    const newData = data.map((obj: ExpectedData) => ({
      ...obj,
      clicked: false,
    }));
    setData(newData);
  }

  function loadCards() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function shuffleCards() {
    let currentIndex = data.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = data[currentIndex];
      data[currentIndex] = data[randomIndex];
      data[randomIndex] = temporaryValue;
    }
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
      <Grid
        container
        justifyContent={"center"}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {(loading ? Array.from(new Array(difficulty / 3)) : data).map(
          (item, index) => (
            <Grid item key={index} xs={2.4}>
              {item ? (
                <PokemonCard
                  name={item.name}
                  detailsUrl={item.url}
                  clicked={item.clicked}
                  handleCardClick={handleCardClick}
                />
              ) : (
                <Fade
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 1000 }}
                >
                  <Skeleton variant="rectangular" height={300} />
                </Fade>
              )}
            </Grid>
          )
        )}
      </Grid>
      <GameResultModal
        openResultModal={openResultModal}
        setOpenResultModal={setOpenResultModal}
        restartGame={handleGetNewDataSet}
      />
    </>
  );
}
