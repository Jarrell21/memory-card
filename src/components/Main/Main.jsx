import * as React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import PokemonCard from "./PokemonCard";

function Main() {
  const [data, setData] = React.useState([]);
  const [dataOffSet, setDataOffSet] = React.useState(0);
  const [growTransition, setGrowTransition] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${dataOffSet}&limit=28`
      );
      let data = await response.json();

      function getEveryThirdItem(array) {
        var result = [];
        for (var i = 0; i < array.length; i += 3) {
          result.push(array[i]);
        }
        return result;
      }

      data = getEveryThirdItem(data.results);

      setData(data);
    };
    fetchData();
  }, [dataOffSet]);

  function handleGetNewDataSet() {
    const randomNumber = Math.floor(Math.random() * 1201);
    handleGrowTransition();
    setDataOffSet(randomNumber);
  }

  function handleGrowTransition() {
    setGrowTransition((prev) => !prev);

    setTimeout(() => {
      setGrowTransition((prev) => !prev);
    }, 1000);
  }

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ margin: 1 }} justifyContent="center">
        <Grid item xs={8}>
          <Typography>Score: 0/8</Typography>
          <Typography>Best Score: 0</Typography>
        </Grid>
        <Grid item s={4}>
          <Button variant="outlined" onClick={handleGetNewDataSet}>
            Get new set of cards
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data.map((item, index) => (
          <Grid item key={index} xs={2.4}>
            <PokemonCard
              name={item.name}
              detailsUrl={item.url}
              growTransition={growTransition}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Main;
