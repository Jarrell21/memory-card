import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PropTypes from "prop-types";

export default function PokemonCard({ name, detailsUrl }) {
  const pokemonId = sliceString(detailsUrl, "/");
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  function sliceString(input, delimiter) {
    var parts = input.split(delimiter);
    return parts[parts.length - 2];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="300" image={pokemonImg} alt={name} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"center"}
          >
            {capitalize(name)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string,
  detailsUrl: PropTypes.string,
};
