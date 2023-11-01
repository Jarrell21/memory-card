import { Container, Grid } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=23"
      );
      const data = await response.json();

      function getEveryThirdItem(array) {
        var result = [];
        for (var i = 0; i < array.length; i += 3) {
          result.push(array[i]);
        }
        return result;
      }

      setData(getEveryThirdItem(data.results));
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item key={index} xs={3}>
              <PokemonCard name={item.name} detailsUrl={item.url} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;
