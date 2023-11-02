import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Fade, Grow, Slide, Zoom } from "@mui/material";
import PropTypes from "prop-types";

function PokemonCard({ name, detailsUrl, growTransition }) {
  const pokemonId = sliceString(detailsUrl, "/");
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  function handleCardClick(event) {
    console.log(event.target.parentNode);
  }

  function sliceString(input, delimiter) {
    var parts = input.split(delimiter);
    return parts[parts.length - 2];
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Grow
      in={growTransition}
      style={{ transformOrigin: "0 0 0" }}
      {...(growTransition ? { timeout: 1000 } : {})}
      onClick={handleCardClick}
    >
      <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
        <CardActionArea>
          <CardMedia component="img" image={pokemonImg} alt={name} />
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
    </Grow>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string,
  detailsUrl: PropTypes.string,
  growTransition: PropTypes.bool,
};

export default PokemonCard;
