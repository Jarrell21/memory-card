import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Fade } from "@mui/material";
import PropTypes from "prop-types";

function PokemonCard({ name, detailsUrl, clicked, handleCardClick }) {
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
    <Fade in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 2000 }}>
      <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
        <CardActionArea onClick={() => handleCardClick(name, clicked)}>
          <CardMedia component="img" image={pokemonImg} alt={name} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign={"center"}
            >
              {capitalize(name) + " " + clicked}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string,
  detailsUrl: PropTypes.string,
  clicked: PropTypes.bool,
  handleCardClick: PropTypes.func,
};

export default PokemonCard;
