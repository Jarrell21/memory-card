import * as React from "react";
import {
  Button,
  Container,
  Fade,
  Grid,
  Skeleton,
  Typography,
  CircularProgress,
} from "@mui/material";
import PokemonCard from "./PokemonCard";
import GameResultModal from "./GameResultModal";

function Main() {
  const [data, setData] = React.useState([]);
  const [dataOffSet, setDataOffSet] = React.useState(getRandomNumber(1001));
  const [loading, setLoading] = React.useState(true);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [openResultModal, setOpenResultModal] = React.useState({
    open: false,
    playerWon: false,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${dataOffSet}&limit=28`
        );
        let data = await response.json();
        data = getEveryThirdItem(data.results);

        data = data.map((obj) => ({ ...obj, clicked: false }));

        setData(data);
        loadCards();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      clearTimeout();
    };
  }, [dataOffSet]);

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

  function handleCardClick(name, clicked) {
    if (score > 9) return;

    if (score === 1) {
      if (clicked) {
        setOpenResultModal({
          open: true,
          playerWon: false,
        });
      } else {
        setOpenResultModal({
          open: true,
          playerWon: true,
        });
      }
    } else {
      shuffleCards();
      loadCards();
    }

    if (clicked) {
      resetClickedProp();
      setScore(0);

      return;
    }

    const newData = data.map((obj) =>
      obj.name === name ? { ...obj, clicked: true } : obj
    );

    setData(newData);
    setScore((prev) => prev + 1);
  }

  function resetClickedProp() {
    const newData = data.map((obj) => ({ ...obj, clicked: false }));
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

  function getEveryThirdItem(array) {
    var result = [];
    for (var i = 0; i < array.length; i += 3) {
      result.push(array[i]);
    }
    return result;
  }

  function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ margin: 1 }} justifyContent="center">
        <Grid item xs={8}>
          <Typography>Score: {score}/10</Typography>
          <Typography>Best Score: {bestScore}</Typography>
        </Grid>
        <Grid item s={4}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button variant="outlined" onClick={handleGetNewDataSet}>
              Get new set of cards
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {(loading ? Array.from(new Array(10)) : data).map((item, index) => (
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
        ))}
      </Grid>
      <GameResultModal
        open={openResultModal}
        setOpen={setOpenResultModal}
        restartGame={handleGetNewDataSet}
      />
    </Container>
  );
}

export default Main;
