import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from "@mui/material";

type PokemonCardProps = {
  name: string;
  detailsUrl: string;
  clicked: boolean;
  handleCardClick: (name: string, clicked: boolean) => void;
};

export default function PokemonCard({
  name,
  detailsUrl,
  clicked,
  handleCardClick,
}: PokemonCardProps) {
  const pokemonId = sliceString(detailsUrl, "/");
  const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  function sliceString(input: string, delimiter: string) {
    var parts = input.split(delimiter);
    return parts[parts.length - 2];
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Fade in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 2000 }}>
      <Card variant="outlined" sx={{ maxWidth: 345, maxHeight: 400 }}>
        <CardActionArea onClick={() => handleCardClick(name, clicked)}>
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
    </Fade>
  );
}
